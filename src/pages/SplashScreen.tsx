import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UtensilsCrossed } from "lucide-react";

const SplashScreen = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigate("/menu");
      } else {
        navigate("/login");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary/80 flex flex-col items-center justify-center p-8">
      <div className="animate-pulse">
        <UtensilsCrossed className="w-24 h-24 text-primary-foreground mb-6" />
      </div>
      <h1 className="text-4xl font-bold text-primary-foreground mb-2">
        Sabor & Cia
      </h1>
      <p className="text-primary-foreground/90 text-lg">
        Cardápio & Pedidos
      </p>
    </div>
  );
};

export default SplashScreen;
