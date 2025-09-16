import React, { useState, useMemo, useEffect } from 'react';
import { useOrderStore } from '../store/orderStore';
import { ClipboardList, Package2, CheckCircle2, Clock, HelpCircle, Info, CreditCard } from 'lucide-react';
import { Tooltip } from '../components/ui/tooltip';
import { CountdownTimer } from '../components/CountdownTimer';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

export const OrdersPage: React.FC = () => {
  const { orders, markAsReceived } = useOrderStore();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<{ [key: string]: 'pix' | 'mercadopago' }>({});
  const [preferenceId, setPreferenceId] = useState<string>('');

  useEffect(() => {
    initMercadoPago('APP_USR-bcf7f307-4ed3-4025-a1dd-722c853a17bf');
  }, []);

  const sortedOrders = useMemo(() => {
    return [...orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [orders]);

  const formatDateTime = (date: string) => {
    return new Date(date).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEstimatedDeliveryTime = () => {
    const now = new Date();
    const deliveryTime = new Date(now.getTime() + 30 * 60000); // 30 minutes from now
    return deliveryTime.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const createPreference = async (order: any) => {
    try {
      const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer APP_USR-3694281686286941-032920-9d58382ffb277465c75b72c47f7a1dd8-29008060',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          items: order.items.map((item: any) => ({
            title: item.product.name,
            unit_price: item.product.price,
            quantity: item.quantity,
            currency_id: 'BRL'
          })),
          back_urls: {
            success: `${window.location.origin}/success`,
            failure: `${window.location.origin}/failure`,
            pending: `${window.location.origin}/pending`
          },
          notification_url: `${window.location.origin}/api/webhook`,
          external_reference: order.id
        })
      });

      const data = await response.json();
      setPreferenceId(data.id);
    } catch (error) {
      console.error('Error creating preference:', error);
    }
  };

  const handleSendToWhatsApp = (order: any) => {
  const orderDetails = order.items.map((item: any) =>
    `🛍️ ${item.quantity}x ${item.product.name}\n   💰 R$ ${(item.product.price * item.quantity).toFixed(2)}`
  ).join('\n');

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const orderDateTime = formatDateTime(order.date);
  const estimatedDelivery = getEstimatedDeliveryTime();
  const paymentMethod = selectedPaymentMethod[order.id] || 'pix';

  const message =
    `🎯 *Consulta de Pedido - Adega Rádio Tatuapé*\n\n` +
    `📅 *Data e Hora do Pedido:* ${orderDateTime}\n` +
    `🆔 *Número do Pedido:* ${order.id}\n` + // <-- AQUI ADICIONAMOS O NÚMERO COMPLETO DO PEDIDO
    `⏰ *Previsão de Entrega:* ${estimatedDelivery}\n\n` +
    `👤 *Cliente:* ${user.name}\n` +
    `📱 *WhatsApp:* ${user.whatsapp}\n` +
    `📍 *Endereço de Entrega:*\n` +
    `   ${user.address.street}, ${user.address.number}\n` +
    `   ${user.address.neighborhood}\n` +
    `   📮 CEP: ${user.address.zipCode}\n\n` +
    `📦 *Detalhes do Pedido:*\n${orderDetails}\n\n` +
    `💵 *Total do Pedido:* R$ ${order.total.toFixed(2)}\n\n` +
    `💳 *Forma de Pagamento Selecionada:* ${paymentMethod === 'pix' ? 'PIX' : 'Mercado Pago'}\n` +
    (paymentMethod === 'pix' ? `📱 *Chave PIX:* radiotatuapefm@gmail.com\n` : '') +
    `\n📋 *Status do Pedido:* ${order.status === 'received' ? '✅ Recebido' : '⏳ Em andamento'}`;

  const whatsappUrl = `https://wa.me/5511970603441?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};

  const getOrderStatusInfo = (status: string) => {
    switch (status) {
      case 'received':
        return {
          icon: <CheckCircle2 className="w-6 h-6 text-green-500" />,
          text: 'Recebido',
          className: 'bg-green-50 text-green-700'
        };
      case 'completed':
        return {
          icon: <CheckCircle2 className="w-6 h-6 text-blue-500" />,
          text: 'Concluído',
          className: 'bg-blue-50 text-blue-700'
        };
      case 'pending':
        return {
          icon: <Clock className="w-6 h-6 text-yellow-500" />,
          text: 'Pendente',
          className: 'bg-yellow-50 text-yellow-700'
        };
      default:
        return {
          icon: <Package2 className="w-6 h-6 text-gray-500" />,
          text: 'Processando',
          className: 'bg-gray-50 text-gray-700'
        };
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex items-center gap-3 mb-8">
        <ClipboardList className="w-8 h-8 text-red-900" />
        <h1 className="text-3xl font-bold text-gray-100">Meus Pedidos</h1>
        <Tooltip text="Aqui você encontra todo o histórico dos seus pedidos">
          <HelpCircle className="w-5 h-5 text-gray-400" />
        </Tooltip>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <Package2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Nenhum pedido encontrado</h2>
          <p className="text-gray-600">Você ainda não realizou nenhum pedido.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedOrders.map((order) => {
            const statusInfo = getOrderStatusInfo(order.status);
            return (
              <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Pedido #{order.id.slice(-8)}
                      </h3>
                      <Tooltip text="Número único do seu pedido">
                        <Info className="w-4 h-4 text-gray-400" />
                      </Tooltip>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusInfo.className}`}>
                      {statusInfo.icon}
                      <span className="text-sm font-medium">{statusInfo.text}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <p className="text-sm text-gray-500">
                      {formatDateTime(order.date)}
                    </p>
                    {order.receivedAt && (
                      <Tooltip text="Data em que você confirmou o recebimento">
                        <p className="text-sm text-green-600">
                          Recebido em: {formatDateTime(order.receivedAt)}
                        </p>
                      </Tooltip>
                    )}
                  </div>

                  {order.status !== 'received' && (
                    <CountdownTimer orderId={order.id} orderDate={order.date} />
                  )}

                  <div className="border-t border-b py-4 my-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-900">
                            {item.quantity}x
                          </span>
                          <span className="text-gray-800">{item.product.name}</span>
                        </div>
                        <span className="text-gray-900">
                          R$ {(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="text-xl font-bold text-red-900">
                        R$ {order.total.toFixed(2)}
                      </span>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Selecione a forma de pagamento:</h4>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`payment-${order.id}`}
                            value="pix"
                            checked={selectedPaymentMethod[order.id] === 'pix'}
                            onChange={() => setSelectedPaymentMethod({
                              ...selectedPaymentMethod,
                              [order.id]: 'pix'
                            })}
                            className="text-red-900 focus:ring-red-900"
                          />
                          <span className="text-sm text-gray-700">PIX</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`payment-${order.id}`}
                            value="mercadopago"
                            checked={selectedPaymentMethod[order.id] === 'mercadopago'}
                            onChange={() => {
                              setSelectedPaymentMethod({
                                ...selectedPaymentMethod,
                                [order.id]: 'mercadopago'
                              });
                              createPreference(order);
                            }}
                            className="text-red-900 focus:ring-red-900"
                          />
                          <span className="text-sm text-gray-700">Mercado Pago</span>
                        </label>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => handleSendToWhatsApp(order)}
                        className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                      >
                        Consultar Pedido via WhatsApp
                      </button>
                      
                      {selectedPaymentMethod[order.id] === 'mercadopago' && preferenceId && (
                        <div className="flex-1">
                          <Wallet initialization={{ preferenceId }} />
                        </div>
                      )}
                      
                      {order.status !== 'received' && (
                        <Tooltip text="Clique aqui para confirmar que recebeu seu pedido">
                          <button
                            onClick={() => markAsReceived(order.id)}
                            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Recebido
                          </button>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
