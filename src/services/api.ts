import axios from "axios";

// Configuração base da API - apontar para API Java Spring Boot futuramente
const api = axios.create({
  baseURL: "http://localhost:8080/api", // Trocar para URL real depois
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar token/mesa nas requisições
api.interceptors.request.use((config) => {
  const tableNumber = localStorage.getItem("tableNumber");
  if (tableNumber) {
    config.headers["X-Table-Number"] = tableNumber;
  }
  return config;
});

// Mock data - remover quando integrar com backend real
export const mockDishes = [
  {
    id: 1,
    name: "Burger Especial",
    description: "Hambúrguer artesanal com queijo cheddar, alface, tomate e molho especial",
    price: 32.9,
    category: "Pratos Principais",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Caesar Salad",
    description: "Salada caesar com frango grelhado, croutons e parmesão",
    price: 28.9,
    category: "Entradas",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Pasta Carbonara",
    description: "Massa fresca com molho carbonara cremoso, bacon e parmesão",
    price: 38.9,
    category: "Pratos Principais",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Picanha Premium",
    description: "Picanha grelhada no ponto com legumes assados e batatas",
    price: 54.9,
    category: "Pratos Principais",
    image: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Coca-Cola 350ml",
    description: "Refrigerante gelado",
    price: 6.0,
    category: "Bebidas",
    image: "/placeholder.svg",
  },
  {
    id: 6,
    name: "Pudim de Leite",
    description: "Pudim caseiro com calda de caramelo",
    price: 12.9,
    category: "Sobremesas",
    image: "/placeholder.svg",
  },
];

export const mockOrders = [
  {
    id: 101,
    tableNumber: "5",
    items: [
      { id: 1, name: "Burger Especial", quantity: 2, price: 32.9 },
      { id: 5, name: "Coca-Cola 350ml", quantity: 2, price: 6.0 },
    ],
    status: "em_preparo",
    total: 77.8,
    createdAt: new Date().toISOString(),
  },
  {
    id: 100,
    tableNumber: "5",
    items: [
      { id: 3, name: "Pasta Carbonara", quantity: 1, price: 38.9 },
    ],
    status: "entregue",
    total: 38.9,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

// Funções de API - implementar quando backend estiver pronto
export const dishesAPI = {
  getAll: async () => {
    // return api.get("/cardapio");
    return { data: mockDishes };
  },
  getByCategory: async (category: string) => {
    // return api.get(`/cardapio?categoria=${category}`);
    return { data: mockDishes.filter((d) => d.category === category) };
  },
  getById: async (id: number) => {
    // return api.get(`/cardapio/${id}`);
    return { data: mockDishes.find((d) => d.id === id) };
  },
};

export const ordersAPI = {
  create: async (orderData: any) => {
    // return api.post("/pedidos", orderData);
    console.log("Creating order:", orderData);
    return {
      data: {
        id: Math.floor(Math.random() * 1000),
        ...orderData,
        status: "pendente",
        createdAt: new Date().toISOString(),
      },
    };
  },
  getById: async (id: number) => {
    // return api.get(`/pedidos/${id}`);
    return { data: mockOrders.find((o) => o.id === id) };
  },
  getHistory: async (tableNumber: string) => {
    // return api.get(`/pedidos?mesa=${tableNumber}&historico=true`);
    return { data: mockOrders.filter((o) => o.tableNumber === tableNumber) };
  },
};

export const adminAPI = {
  getAllOrders: async () => {
    // return api.get("/admin/pedidos");
    return { data: mockOrders };
  },
  updateOrderStatus: async (id: number, status: string) => {
    // return api.patch(`/admin/pedidos/${id}/status`, { status });
    console.log(`Updating order ${id} to status: ${status}`);
    return { data: { success: true } };
  },
  createDish: async (dishData: any) => {
    // return api.post("/admin/pratos", dishData);
    console.log("Creating dish:", dishData);
    return { data: { id: Math.floor(Math.random() * 1000), ...dishData } };
  },
  updateDish: async (id: number, dishData: any) => {
    // return api.put(`/admin/pratos/${id}`, dishData);
    console.log(`Updating dish ${id}:`, dishData);
    return { data: { success: true } };
  },
  deleteDish: async (id: number) => {
    // return api.delete(`/admin/pratos/${id}`);
    console.log(`Deleting dish ${id}`);
    return { data: { success: true } };
  },
};

export default api;
