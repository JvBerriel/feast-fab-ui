import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { ordersAPI } from "@/services/api";

const statusLabels: Record<string, string> = {
  pendente: "Pendente",
  em_preparo: "Em Preparo",
  pronto: "Pronto",
  entregue: "Entregue",
};

const OrderHistoryScreen = () => {
  const navigate = useNavigate();
  const { tableNumber } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (tableNumber) {
      loadHistory();
    }
  }, [tableNumber]);

  const loadHistory = async () => {
    if (!tableNumber) return;
    const response = await ordersAPI.getHistory(tableNumber);
    setOrders(response.data);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Histórico de Pedidos</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-6">
              Nenhum pedido encontrado
            </p>
            <Button onClick={() => navigate("/menu")}>
              Ver Cardápio
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-card rounded-xl p-4 shadow-card cursor-pointer hover:shadow-card-hover transition-shadow"
                onClick={() => navigate(`/order-status/${order.id}`)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-foreground">
                      Pedido #{order.id}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatDate(order.createdAt)}</span>
                    </div>
                  </div>
                  <Badge
                    variant={order.status === "entregue" ? "default" : "secondary"}
                    className={
                      order.status === "em_preparo"
                        ? "bg-status-preparing text-white"
                        : order.status === "pronto"
                        ? "bg-status-ready text-white"
                        : ""
                    }
                  >
                    {statusLabels[order.status]}
                  </Badge>
                </div>

                <div className="space-y-1 mb-3">
                  {order.items.map((item: any, index: number) => (
                    <p key={index} className="text-sm text-muted-foreground">
                      {item.quantity}x {item.name}
                    </p>
                  ))}
                </div>

                <div className="flex justify-between items-center border-t border-border pt-3">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="font-bold text-lg text-foreground">
                    R$ {order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryScreen;
