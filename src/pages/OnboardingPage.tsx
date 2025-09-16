import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, MessageCircle, CreditCard, Clock, Package, CheckCircle } from 'lucide-react';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: <ShoppingCart className="w-12 h-12 text-red-900" />,
      title: "1. Escolha seus Produtos",
      description: "Navegue pelo nosso catálogo e adicione os produtos desejados ao carrinho"
    },
    {
      icon: <MessageCircle className="w-12 h-12 text-green-600" />,
      title: "2. Envie o Pedido via WhatsApp",
      description: "Após finalizar sua seleção, envie o pedido pelo WhatsApp para confirmarmos seu endereço e disponibilidade"
    },
    {
      icon: <CreditCard className="w-12 h-12 text-blue-600" />,
      title: "3. Realize o Pagamento",
      description: "Escolha entre PIX ou Mercado Pago para efetuar o pagamento do seu pedido"
    },
    {
      icon: <Clock className="w-12 h-12 text-yellow-600" />,
      title: "4. Acompanhe o Tempo de Entrega",
      description: "Monitore o status do seu pedido e o tempo estimado de entrega em tempo real"
    },
    {
      icon: <Package className="w-12 h-12 text-purple-600" />,
      title: "5. Receba seu Pedido",
      description: "Nosso entregador levará seu pedido até você no tempo estimado"
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-green-600" />,
      title: "6. Confirme o Recebimento",
      description: "Após receber seu pedido, confirme o recebimento no sistema"
    }
  ];

  const timeInfo = [
    {
      title: "Horário de Entrega",
      items: [
        "Durante o dia (6h às 00h): Entrega em até 30 minutos",
        "Durante a madrugada (00h às 6h): Entrega em até 60 minutos"
      ]
    },
    {
      title: "Sistema de Acompanhamento",
      items: [
        "Alertas sonoros a cada 10 minutos",
        "Mensagens atualizadas a cada 5 minutos",
        "Período de cortesia de 3 minutos após tempo estimado"
      ]
    },
    {
      title: "Status do Pedido",
      items: [
        "Recebido → Em Preparação → Em Entrega → Finalizado",
        "Acompanhamento em tempo real do status",
        "Notificações de proximidade da entrega"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Bem-vindo à Adega Rádio Tatuapé FM
          </h1>
          <p className="text-xl text-gray-300">
            Aprenda como fazer seu pedido e receber suas bebidas em casa
          </p>
        </div>

        <div className="grid gap-8 mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg p-6 shadow-lg transform hover:scale-102 transition-transform"
            >
              <div className="flex items-start gap-6">
                <div className="bg-gray-700 rounded-full p-3">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-300">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-800 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-8">
            Informações Importantes sobre Entregas
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {timeInfo.map((info, index) => (
              <div key={index}>
                <h3 className="text-xl font-bold text-red-500 mb-4">
                  {info.title}
                </h3>
                <ul className="space-y-3">
                  {info.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-300 flex items-start gap-2">
                      <span className="text-red-500">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/register')}
            className="bg-red-900 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-red-800 transition-colors"
          >
            Começar a Comprar
          </button>
        </div>
      </div>
    </div>
  );
};