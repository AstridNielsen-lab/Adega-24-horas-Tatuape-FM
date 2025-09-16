export interface Order {
  id: string;
  items: {
    product: {
      id: string;
      name: string;
      price: number;
    };
    quantity: number;
  }[];
  total: number;
  date: string;
  status: 'completed' | 'pending' | 'received';
  receivedAt?: string;
}

export interface OrderStore {
  orders: Order[];
  markAsReceived: (orderId: string) => void;
}