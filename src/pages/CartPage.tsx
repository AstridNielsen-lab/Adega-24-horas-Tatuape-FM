import React from 'react';
import { Trash2 } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useOrderStore } from '../store/orderStore';
import { useNavigate } from 'react-router-dom';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();
  const addOrder = useOrderStore(state => state.addOrder);

  const handleCheckout = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    // Create new order
    const newOrder = {
      id: Date.now().toString(),
      items: items.map(item => ({
        product: {
          id: item.product.id,
          name: item.product.name,
          price: item.product.price
        },
        quantity: item.quantity
      })),
      total: total(),
      date: new Date().toISOString(),
      status: 'pending'
    };
    
    // Save order and clear cart
    addOrder(newOrder);
    clearCart();
    
    // Redirect to orders page
    navigate('/orders');
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Seu carrinho está vazio</h2>
        <p className="text-gray-300">Adicione alguns produtos para continuar.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-100">Seu Carrinho</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        {items.map(item => (
          <div key={item.product.id} className="flex items-center py-4 border-b border-gray-200">
            <img
              src={item.product.imageUrl}
              alt={item.product.name}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1 ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{item.product.name}</h3>
              <p className="text-gray-600">{item.product.description}</p>
              <div className="flex items-center mt-2">
                <select
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.product.id, Number(e.target.value))}
                  className="border rounded p-1 mr-4 text-gray-700 bg-white"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
                <span className="text-xl font-bold text-red-900">
                  R$ {(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
            <button
              onClick={() => removeItem(item.product.id)}
              className="ml-4 text-red-500 hover:text-red-700"
            >
              <Trash2 size={24} />
            </button>
          </div>
        ))}
        
        <div className="mt-8">
          <div className="text-2xl font-bold mb-4 text-gray-900">
            Total: R$ {total().toFixed(2)}
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-red-900 text-white py-3 px-6 rounded-lg hover:bg-red-800 transition-colors"
          >
            Finalizar Pedido
          </button>
        </div>
      </div>
    </div>
  );
};