import { useState } from "react";
import { Search, UtensilsCrossed, Coffee, Wine, Soup, Salad } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoryCard } from "@/components/CategoryCard";
import { MenuItem } from "@/components/MenuItem";
import { toast } from "sonner";

import heroImage from "@/assets/hero-food.jpg";
import burgerImage from "@/assets/burger.jpg";
import saladImage from "@/assets/salad.jpg";
import pastaImage from "@/assets/pasta.jpg";
import steakImage from "@/assets/steak.jpg";

const categories = [
  { icon: Soup, title: "Entradas" },
  { icon: UtensilsCrossed, title: "Principais" },
  { icon: Coffee, title: "Bebidas" },
  { icon: Salad, title: "Sobremesas" },
];

const menuItems = [
  {
    id: 1,
    name: "Burger Especial",
    description: "Hambúrguer artesanal com queijo cheddar, alface, tomate e molho especial",
    price: "R$ 32,90",
    image: burgerImage,
  },
  {
    id: 2,
    name: "Caesar Salad",
    description: "Salada caesar com frango grelhado, croutons e parmesão",
    price: "R$ 28,90",
    image: saladImage,
  },
  {
    id: 3,
    name: "Pasta Carbonara",
    description: "Massa fresca com molho carbonara cremoso, bacon e parmesão",
    price: "R$ 38,90",
    image: pastaImage,
  },
  {
    id: 4,
    name: "Picanha Premium",
    description: "Picanha grelhada no ponto com legumes assados e batatas",
    price: "R$ 54,90",
    image: steakImage,
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddToCart = (itemName: string) => {
    toast.success(`${itemName} adicionado ao carrinho!`);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground">Sabor & Cia</h1>
            <Button variant="ghost" size="icon">
              <Wine className="w-5 h-5" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar pratos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 rounded-xl border-2"
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-64 overflow-hidden">
        <img
          src={heroImage}
          alt="Comida deliciosa"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero flex items-center justify-center">
          <div className="text-center text-primary-foreground px-4">
            <h2 className="text-4xl font-bold mb-3">Sabores Autênticos</h2>
            <p className="text-lg opacity-95">Os melhores pratos da cidade</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Categorias</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              icon={category.icon}
              title={category.title}
              onClick={() => toast.info(`Categoria ${category.title} selecionada`)}
            />
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="container mx-auto px-4 py-6">
        <div className="bg-gradient-hero rounded-2xl p-6 text-center text-primary-foreground">
          <h3 className="text-xl font-bold mb-2">🎉 Promoção de Terça!</h3>
          <p className="text-sm opacity-95">20% de desconto em todos os pratos principais</p>
        </div>
      </section>

      {/* Popular Items */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Mais Pedidos</h2>
          <Button variant="ghost" className="text-primary">
            Ver todos
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              onAdd={() => handleAddToCart(item.name)}
            />
          ))}
        </div>
      </section>

      {/* Bottom Navigation Placeholder */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="container mx-auto flex justify-around items-center">
          <Button variant="ghost" size="sm" className="flex-col h-auto gap-1">
            <UtensilsCrossed className="w-5 h-5" />
            <span className="text-xs">Menu</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-auto gap-1">
            <Search className="w-5 h-5" />
            <span className="text-xs">Buscar</span>
          </Button>
          <Button
            size="sm"
            className="rounded-full w-14 h-14 bg-gradient-hero shadow-card-hover"
          >
            <Wine className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-auto gap-1">
            <Coffee className="w-5 h-5" />
            <span className="text-xs">Pedidos</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-auto gap-1">
            <Salad className="w-5 h-5" />
            <span className="text-xs">Perfil</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
