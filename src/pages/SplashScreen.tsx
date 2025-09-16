import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wine } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const user = localStorage.getItem('user');
      navigate(user ? '/' : '/onboarding');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-red-900 flex flex-col items-center justify-center px-4">
      <div className="animate-pulse flex flex-col items-center">
        <Wine size={80} className="text-white mb-8" />
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl font-bold text-white">Adega</h1>
          <h2 className="text-3xl font-bold text-white">Rádio Tatuapé FM</h2>
          <p className="text-white text-xl mt-4">24 Horas</p>
        </div>
      </div>
    </div>
  );
};