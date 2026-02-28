import { Order } from "@/lib/store-context";

export const mockOrder: Order = {
  date: "2026-02-27T23:11:41.586Z",
  id: "ORD-1772233901586",
  status: "processing",
  total: 84.4,
  items: [
    {
      id: 1,
      title: "A Sombra do Vento",
      author: "Carlos Ruiz Zafón",
      category: "Ficção",
      description: "Um romance literário ambientado na Barcelona pós-guerra.",
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
      price: 45.9,
      quantity: 1,
      rating: 4.7,
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      category: "Distopia",
      description: "Uma distopia clássica sobre totalitarismo e vigilância.",
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
      price: 38.5,
      quantity: 1,
      rating: 4.9,
    },
  ],
};
