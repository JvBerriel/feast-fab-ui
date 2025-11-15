import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, ChefHat, CheckCircle2, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ordersAPI } from "@/services/api";

const statusSteps = [
  { key: "pendente", label: "Pendente", icon: Clock },
  { key: "em_preparo", label: "Em Preparo", icon: ChefHat },
  { key: "pronto", label: "Pronto", icon: CheckCircle2 },
  { key: "entregue", label: "Entregue", icon: Truck },
];

const OrderStatusScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    loadOrder();
    // Polling para atualizar status a cada 10 segundos
    const interval = setInterval(loadOrder, 10000);
    return () => clearInterval(interval);
  }, [id]);

  const loadOrder = async () => {
    const response = await ordersAPI.getById(Number(id));
    setOrder(response.data);
  };

  const getCurrentStepIndex = () => {
    if (!order) return 0;
    return statusSteps.findIndex((step) => step.key === order.status);
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/menu")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Pedido #{order.id}</h1>
            <p className="text-sm text-muted-foreground">Mesa {order.tableNumber}</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Status Timeline */}
        <div className="bg-card rounded-2xl p-6 shadow-card mb-6">
          <h2 className="text-lg font-bold mb-6">Status do Pedido</h2>
          <div className="space-y-6">
            {statusSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <div key={step.key} className="flex items-start gap-4">
                  <div className="relative">
                    <div
                      className={`rounded-full p-3 ${
                        isActive
                          ? isCurrent
                            ? "bg-primary text-primary-foreground"
                            : "bg-status-ready text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    {index < statusSteps.length - 1 && (
                      <div
                        className={`absolute left-1/2 top-full -translate-x-1/2 w-0.5 h-6 ${
                          index < currentStepIndex ? "bg-status-ready" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3
                      className={`font-semibold ${
                        isActive ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {step.label}
                    </h3>
                    {isCurrent && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Status atual
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-card rounded-2xl p-6 shadow-card mb-6">
          <h2 className="text-lg font-bold mb-4">Itens do Pedido</h2>
          <div className="space-y-3">
            {order.items.map((item: any, index: number) => (
              <div key={index} className="flex justify-between">
                <div>
                  <p className="font-medium text-foreground">
                    {item.quantity}x {item.name}
                  </p>
                </div>
                <p className="font-semibold text-foreground">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-4 pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>R$ {order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>Atualizando automaticamente...</p>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusScreen;
