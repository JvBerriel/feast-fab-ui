import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MenuItem } from "@/components/MenuItem";
import { useCart } from "@/contexts/CartContext";
import { dishesAPI } from "@/services/api";

const categories = ["Todos", "Entradas", "Pratos Principais", "Bebidas", "Sobremesas"];

const MenuScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [dishes, setDishes] = useState<any[]>([]);
  const { totalItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    loadDishes();
  }, [selectedCategory]);

  const loadDishes = async () => {
    const response = selectedCategory === "Todos"
      ? await dishesAPI.getAll()
      : await dishesAPI.getByCategory(selectedCategory);
    setDishes(response.data);
  };

  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dish.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (itemName: string) => {
    // O MenuItem já adiciona ao carrinho, isso é só pro toast
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground">Sabor & Cia</h1>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar prato ou ingrediente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 rounded-xl"
            />
          </div>
        </div>
      </header>

      {/* Categories */}
      <section className="container mx-auto px-4 py-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Dishes Grid */}
      <section className="container mx-auto px-4 py-4">
        <h2 className="text-xl font-bold mb-4 text-foreground">
          {selectedCategory === "Todos" ? "Todo o Cardápio" : selectedCategory}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDishes.map((dish) => (
            <MenuItem
              key={dish.id}
              id={dish.id}
              name={dish.name}
              description={dish.description}
              price={`R$ ${dish.price.toFixed(2)}`}
              image={dish.image}
              onAdd={() => handleAddToCart(dish.name)}
            />
          ))}
        </div>
        
        {filteredDishes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Nenhum prato encontrado
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default MenuScreen;
