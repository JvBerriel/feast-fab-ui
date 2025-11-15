import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UtensilsCrossed } from "lucide-react";
import { toast } from "sonner";

const LoginScreen = () => {
  const [tableNumber, setTableNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tableNumber.trim()) {
      toast.error("Por favor, informe o número da mesa");
      return;
    }

    login(tableNumber, customerName);
    toast.success("Bem-vindo ao Sabor & Cia!");
    navigate("/menu");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary rounded-full p-6 mb-4">
            <UtensilsCrossed className="w-12 h-12 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Sabor & Cia
          </h1>
          <p className="text-muted-foreground text-center">
            Informe seus dados para acessar o cardápio
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="table">Número da Mesa *</Label>
            <Input
              id="table"
              type="text"
              placeholder="Ex: 5"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              className="h-12 text-lg"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Seu Nome (opcional)</Label>
            <Input
              id="name"
              type="text"
              placeholder="Ex: João Silva"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="h-12 text-lg"
            />
          </div>

          <Button type="submit" className="w-full h-12 text-lg" size="lg">
            Entrar no Cardápio
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
