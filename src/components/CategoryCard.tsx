import { LucideIcon } from "lucide-react";
import { Button } from "./ui/button";

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  onClick?: () => void;
}

export const CategoryCard = ({ icon: Icon, title, onClick }: CategoryCardProps) => {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="h-auto flex-col gap-3 py-6 px-4 border-2 hover:border-primary hover:shadow-card-hover transition-all duration-300"
    >
      <div className="w-14 h-14 rounded-full bg-gradient-hero flex items-center justify-center">
        <Icon className="w-7 h-7 text-primary-foreground" />
      </div>
      <span className="font-semibold text-sm">{title}</span>
    </Button>
  );
};
