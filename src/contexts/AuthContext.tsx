import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  tableNumber: string | null;
  customerName: string | null;
  isAuthenticated: boolean;
  login: (table: string, name?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [tableNumber, setTableNumber] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState<string | null>(null);

  useEffect(() => {
    const savedTable = localStorage.getItem("tableNumber");
    const savedName = localStorage.getItem("customerName");
    if (savedTable) {
      setTableNumber(savedTable);
      setCustomerName(savedName);
    }
  }, []);

  const login = (table: string, name?: string) => {
    setTableNumber(table);
    setCustomerName(name || null);
    localStorage.setItem("tableNumber", table);
    if (name) localStorage.setItem("customerName", name);
  };

  const logout = () => {
    setTableNumber(null);
    setCustomerName(null);
    localStorage.removeItem("tableNumber");
    localStorage.removeItem("customerName");
  };

  return (
    <AuthContext.Provider
      value={{
        tableNumber,
        customerName,
        isAuthenticated: !!tableNumber,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
