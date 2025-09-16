import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

export const InstallPWA: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowInstallButton(false);
    }
  };

  if (!showInstallButton) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 bg-red-900 text-white p-4 rounded-lg shadow-lg z-50 md:w-auto md:left-4 md:right-auto">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-semibold">Instalar App</h3>
          <p className="text-sm text-gray-100">Adicione à tela inicial para acesso rápido</p>
        </div>
        <button
          onClick={handleInstallClick}
          className="bg-white text-red-900 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-colors"
        >
          <Download size={20} />
          <span>Instalar</span>
        </button>
      </div>
    </div>
  );
};