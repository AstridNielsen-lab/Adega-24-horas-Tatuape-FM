import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1 pr-4">
          <p className="text-sm">
            Utilizamos cookies e armazenamento local para melhorar sua experiência. 
            Ao continuar navegando, você concorda com nossa política de privacidade 
            e o uso de tecnologias de armazenamento local.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleAccept}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
          >
            Aceitar
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};