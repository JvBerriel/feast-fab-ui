import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { dishesAPI } from "@/services/api";

const DishDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [dish, setDish] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    loadDish();
  }, [id]);

  const loadDish = async () => {
    const response = await dishesAPI.getById(Number(id));
    setDish(response.data);
  };

  const handleAddToCart = () => {
    if (!dish) return;
    
    addItem(
      {
        id: dish.id,
        name: dish.name,
        price: dish.price,
        image: dish.image,
        notes: notes.trim() || undefined,
      },
      quantity
    );
    
    navigate("/menu");
  };

  if (!dish) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Image Header */}
      <div className="relative h-64">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-card/80 backdrop-blur-sm"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6 pb-32">
        <div className="bg-card rounded-2xl shadow-card p-6 -mt-8 relative">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {dish.name}
          </h1>
          <p className="text-muted-foreground mb-4">{dish.description}</p>
          <p className="text-3xl font-bold text-primary mb-6">
            R$ {dish.price.toFixed(2)}
          </p>

          {/* Notes */}
          <div className="space-y-2 mb-6">
            <Label htmlFor="notes">Observações (opcional)</Label>
            <Textarea
              id="notes"
              placeholder="Ex: Sem cebola, pouco sal..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-24"
            />
          </div>

          {/* Quantity Control */}
          <div className="flex items-center justify-between mb-6">
            <Label className="text-lg">Quantidade</Label>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-xl font-semibold w-8 text-center">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <Button
          className="w-full h-14 text-lg"
          size="lg"
          onClick={handleAddToCart}
        >
          Adicionar ao Carrinho • R$ {(dish.price * quantity).toFixed(2)}
        </Button>
      </div>
    </div>
  );
};

export default DishDetailScreen;
