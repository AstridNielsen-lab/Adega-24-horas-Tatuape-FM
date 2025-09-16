import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wine } from 'lucide-react';
import type { User, Address } from '../types/User';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [cookieAccepted, setCookieAccepted] = useState(false);
  const [formData, setFormData] = useState<User>({
    name: '',
    whatsapp: '',
    email: '',
    address: {
      street: '',
      number: '',
      neighborhood: '',
      zipCode: ''
    }
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (consent === 'accepted') {
      setCookieAccepted(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify(formData));
    window.location.href = '/'; // Force page reload after registration
  };

  const updateAddress = (field: keyof Address, value: string) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };

  if (!cookieAccepted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center space-y-6 p-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              Política de Privacidade e Cookies
            </h2>
            <div className="prose prose-sm sm:prose max-w-none text-gray-600">
              <p className="text-sm sm:text-base leading-relaxed break-words">
                Para prosseguir com o cadastro, é necessário aceitar nossa política de privacidade
                e o uso de cookies e armazenamento local. Utilizamos essas tecnologias para melhorar
                sua experiência e garantir o funcionamento adequado do aplicativo.
              </p>
              <p className="text-xs sm:text-sm mt-2 text-gray-500">
                Ao aceitar, você concorda com o armazenamento de informações no seu dispositivo
                e o processamento de dados conforme nossa política de privacidade.
              </p>
            </div>
            <button
              onClick={() => setCookieAccepted(true)}
              className="w-full sm:w-auto px-6 py-3 bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors text-sm sm:text-base font-medium"
            >
              Aceitar e Continuar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Wine className="h-16 w-16 text-red-900" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Bem-vindo à Adega Rádio Tatuapé
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Por favor, preencha seus dados para continuar
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nome Completo
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm text-black"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm text-black"
                />
              </div>
            </div>

            <div>
              <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">
                WhatsApp
              </label>
              <div className="mt-1">
                <input
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  required
                  placeholder="(11) 99999-9999"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm text-black"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Endereço</h3>
              
              <div>
                <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                  Rua
                </label>
                <div className="mt-1">
                  <input
                    id="street"
                    name="street"
                    type="text"
                    required
                    value={formData.address.street}
                    onChange={(e) => updateAddress('street', e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm text-black"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                  Número
                </label>
                <div className="mt-1">
                  <input
                    id="number"
                    name="number"
                    type="text"
                    required
                    value={formData.address.number}
                    onChange={(e) => updateAddress('number', e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm text-black"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">
                  Bairro
                </label>
                <div className="mt-1">
                  <input
                    id="neighborhood"
                    name="neighborhood"
                    type="text"
                    required
                    value={formData.address.neighborhood}
                    onChange={(e) => updateAddress('neighborhood', e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm text-black"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                  CEP
                </label>
                <div className="mt-1">
                  <input
                    id="zipCode"
                    name="zipCode"
                    type="text"
                    required
                    placeholder="00000-000"
                    value={formData.address.zipCode}
                    onChange={(e) => updateAddress('zipCode', e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm text-black"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-900 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Continuar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};