import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

interface MenuItemProps {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  onAdd?: () => void;
}

export const MenuItem = ({ id, name, description, price, image, onAdd }: MenuItemProps) => {
  const navigate = useNavigate();

  return (
    <div 
      className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group cursor-pointer"
      onClick={() => navigate(`/dish/${id}`)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-card opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-lg text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">{price}</span>
          <Button
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onAdd?.();
            }}
            className="rounded-full bg-gradient-hero hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
