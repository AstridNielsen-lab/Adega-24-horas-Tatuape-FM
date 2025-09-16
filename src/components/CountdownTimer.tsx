import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useOrderStore } from '../store/orderStore';

interface CountdownTimerProps {
  orderId: string;
  orderDate: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ orderId, orderDate }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [lastVoiceAlert, setLastVoiceAlert] = useState<number>(0);
  const [isGracePeriod, setIsGracePeriod] = useState(false);
  const [graceTimeLeft, setGraceTimeLeft] = useState(180); // 3 minutes in seconds
  const [interactionPhase, setInteractionPhase] = useState(0);
  const { markAsReceived } = useOrderStore();
  const [lastMessage, setLastMessage] = useState<string>('');

  const announceMessage = (message: string) => {
    if (message !== lastMessage) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      window.speechSynthesis.speak(utterance);
      setLastMessage(message);
    }
  };

  useEffect(() => {
    // Determine wait time based on hour
    const getWaitTime = () => {
      const hour = new Date().getHours();
      // Night hours (12:30 AM - 5:00 AM)
      if (hour >= 0 && hour < 5) {
        return 60; // 60 minutes
      }
      // Day hours (6:00 AM - 11:59 PM)
      return 30; // 30 minutes
    };

    const initialWaitTime = getWaitTime();
    const orderTime = new Date(orderDate).getTime();
    const endTime = orderTime + (initialWaitTime * 60 * 1000);

    let intervalId: NodeJS.Timeout;

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = endTime - now;
      
      if (difference > 0) {
        const seconds = Math.floor(difference / 1000);
        setTimeLeft(seconds);
        
        // Voice alerts every 5 minutes
        const minutes = Math.floor(seconds / 60);
        if (minutes !== lastVoiceAlert && minutes % 5 === 0) {
          const message = getMessage(seconds);
          announceMessage(message.replace(/[📝👨‍🍳🎁🚀🛵⏳🎯]/g, '')); // Remove emojis for voice
          setLastVoiceAlert(minutes);
        }
      } else {
        setTimeLeft(0);
        setIsGracePeriod(true);
        clearInterval(intervalId);
        
        // Announce transition to grace period
        announceMessage('O tempo estimado de entrega foi atingido. Por favor, confirme quando receber seu pedido.');
      }
    };

    if (!isGracePeriod) {
      updateTimer();
      intervalId = setInterval(updateTimer, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [orderDate, lastVoiceAlert, isGracePeriod, lastMessage]);

  // Grace period timer
  useEffect(() => {
    if (!isGracePeriod) return;

    const graceIntervalId = setInterval(() => {
      setGraceTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(graceIntervalId);
          markAsReceived(orderId);
          announceMessage('Tempo de confirmação encerrado. O pedido foi marcado como recebido automaticamente.');
          return 0;
        }

        // Announce grace period messages
        if (prev % 60 === 0 && prev > 0) {
          const phase = Math.floor((180 - prev) / 60);
          const message = getGraceMessage(phase);
          announceMessage(message.replace(/[🤔📦✨]/g, '')); // Remove emojis for voice
        }

        return prev - 1;
      });

      // Update interaction phase every minute
      if (graceTimeLeft % 60 === 0 && graceTimeLeft > 0) {
        setInteractionPhase((prev) => Math.min(prev + 1, 2));
      }
    }, 1000);

    return () => clearInterval(graceIntervalId);
  }, [isGracePeriod, graceTimeLeft, orderId, markAsReceived]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTimerColor = (seconds: number): string => {
    if (!isGracePeriod) {
      const percentage = (seconds / (60 * 60)) * 100;
      if (percentage > 80) return 'text-green-500';
      if (percentage > 60) return 'text-yellow-500';
      if (percentage > 40) return 'text-blue-500';
      if (percentage > 20) return 'text-orange-500';
      return 'text-red-500';
    }
    return 'text-orange-500';
  };

  const getGraceMessage = (phase: number = interactionPhase): string => {
    switch (phase) {
      case 0:
        return 'O tempo estimado foi atingido! Seu pedido já chegou? 🤔';
      case 1:
        return 'Por favor, confirme se você recebeu seu pedido! 📦';
      case 2:
        return 'Não esqueça de clicar em "Recebido" quando seu pedido chegar! ✨';
      default:
        return 'Aguardando confirmação de recebimento...';
    }
  };

  const getMessage = (seconds: number): string => {
    if (isGracePeriod) return getGraceMessage();
    
    const minutes = Math.floor(seconds / 60);
    // Messages change every 5 minutes
    if (minutes > 30) return 'Recebemos seu pedido e já estamos preparando! 📝';
    if (minutes > 25) return 'Seu pedido está sendo preparado com todo cuidado! 👨‍🍳';
    if (minutes > 20) return 'Estamos empacotando seu pedido com carinho! 🎁';
    if (minutes > 15) return 'Seu pedido está pronto e será enviado em breve! 🚀';
    if (minutes > 10) return 'Nosso entregador está a caminho! 🛵';
    if (minutes > 5) return 'Seu pedido está muito próximo! ⏳';
    return 'Entrega iminente! Fique atento! 🎯';
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 mt-4">
      <div className="flex items-center gap-2 mb-2">
        <Clock className={`${getTimerColor(isGracePeriod ? graceTimeLeft : timeLeft)}`} />
        <h4 className="text-lg font-semibold text-white">
          {isGracePeriod ? 'Tempo Adicional' : 'Tempo Estimado de Entrega'}
        </h4>
      </div>
      
      <div className={`text-3xl font-bold ${getTimerColor(isGracePeriod ? graceTimeLeft : timeLeft)} text-center mb-2`}>
        {formatTime(isGracePeriod ? graceTimeLeft : timeLeft)}
      </div>
      
      <p className="text-gray-300 text-center text-sm">
        {getMessage(isGracePeriod ? graceTimeLeft : timeLeft)}
      </p>
      
      <div className="mt-3 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ${getTimerColor(isGracePeriod ? graceTimeLeft : timeLeft)}`}
          style={{
            width: `${isGracePeriod ? (graceTimeLeft / 180) * 100 : (timeLeft / (60 * 60)) * 100}%`,
            backgroundColor: 'currentColor'
          }}
        />
      </div>

      {isGracePeriod && graceTimeLeft > 0 && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => {
              markAsReceived(orderId);
              announceMessage('Pedido confirmado como recebido. Obrigado pela preferência!');
            }}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors animate-pulse"
          >
            Confirmar Recebimento
          </button>
        </div>
      )}
    </div>
  );
};