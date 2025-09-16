import { create } from 'zustand';
import { Order, OrderStore } from '../types/Order';

const loadOrders = (): Order[] => {
  const stored = localStorage.getItem('orders');
  return stored ? JSON.parse(stored) : [];
};

export const useOrderStore = create<OrderStore & {
  addOrder: (order: Order) => void;
}>((set) => ({
  orders: loadOrders(),
  addOrder: (order) => set((state) => {
    const newOrders = [...state.orders, order];
    localStorage.setItem('orders', JSON.stringify(newOrders));
    return { orders: newOrders };
  }),
  markAsReceived: (orderId) => set((state) => {
    const newOrders = state.orders.map(order => 
      order.id === orderId 
        ? { ...order, status: 'received', receivedAt: new Date().toISOString() }
        : order
    );
    localStorage.setItem('orders', JSON.stringify(newOrders));
    return { orders: newOrders };
  }),
}));