import { useNavigate, useLocation } from "react-router-dom";
import { UtensilsCrossed, Clock, History, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/menu", icon: UtensilsCrossed, label: "Cardápio" },
    { path: "/orders", icon: Clock, label: "Pedidos" },
    { path: "/history", icon: History, label: "Histórico" },
    { path: "/admin", icon: Settings, label: "Admin" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="container mx-auto flex justify-around items-center py-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              className={`flex-col h-auto gap-1 ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => navigate(item.path)}
            >
              <Icon className={`w-5 h-5 ${active ? "text-primary" : ""}`} />
              <span className="text-xs">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
