import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { ordersAPI } from "@/services/api";
import { toast } from "sonner";

const CartScreen = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();
  const { tableNumber } = useAuth();
  const [localTableNumber, setLocalTableNumber] = useState(tableNumber || "");

  const serviceFee = totalPrice * 0.1;
  const finalTotal = totalPrice + serviceFee;

  const handleConfirmOrder = async () => {
    if (!localTableNumber.trim()) {
      toast.error("Por favor, confirme o número da mesa");
      return;
    }

    if (items.length === 0) {
      toast.error("Seu carrinho está vazio");
      return;
    }

    try {
      const orderData = {
        tableNumber: localTableNumber,
        items: items.map((item) => ({
          dishId: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          notes: item.notes,
        })),
        subtotal: totalPrice,
        serviceFee,
        total: finalTotal,
      };

      const response = await ordersAPI.create(orderData);
      clearCart();
      toast.success("Pedido confirmado com sucesso!");
      navigate(`/order-status/${response.data.id}`);
    } catch (error) {
      toast.error("Erro ao confirmar pedido. Tente novamente.");
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 bg-card border-b border-border">
          <div className="container mx-auto px-4 py-4 flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold">Carrinho</h1>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground text-lg mb-6">
            Seu carrinho está vazio
          </p>
          <Button onClick={() => navigate("/menu")}>
            Ver Cardápio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Carrinho</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Items List */}
        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <div key={`${item.id}-${item.notes}`} className="bg-card rounded-xl p-4 shadow-card">
              <div className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">
                    {item.name}
                  </h3>
                  {item.notes && (
                    <p className="text-sm text-muted-foreground mb-2">
                      Obs: {item.notes}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="font-semibold w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Table Number */}
        <div className="mb-6">
          <Label htmlFor="table">Número da Mesa</Label>
          <Input
            id="table"
            type="text"
            value={localTableNumber}
            onChange={(e) => setLocalTableNumber(e.target.value)}
            placeholder="Ex: 5"
            className="h-12"
          />
        </div>

        {/* Summary */}
        <div className="bg-card rounded-xl p-6 shadow-card">
          <h3 className="font-bold text-lg mb-4">Resumo do Pedido</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>R$ {totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Taxa de serviço (10%)</span>
              <span>R$ {serviceFee.toFixed(2)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between text-xl font-bold text-foreground">
              <span>Total</span>
              <span>R$ {finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <Button
          className="w-full h-14 text-lg"
          size="lg"
          onClick={handleConfirmOrder}
        >
          Confirmar Pedido • R$ {finalTotal.toFixed(2)}
        </Button>
      </div>
    </div>
  );
};

export default CartScreen;
