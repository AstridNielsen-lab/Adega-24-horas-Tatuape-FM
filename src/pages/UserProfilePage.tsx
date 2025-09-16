import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Address } from '../types/User';

export const UserProfilePage: React.FC = () => {
  const navigate = useNavigate();
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
    const userData = localStorage.getItem('user');
    if (userData) {
      setFormData(JSON.parse(userData));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify(formData));
    window.location.href = '/'; // Force page reload after profile update
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

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-100 mb-8">Meu Perfil</h1>
      
      <div className="bg-gray-800 rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-200">
              Nome Completo
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-200">
              WhatsApp
            </label>
            <input
              type="tel"
              id="whatsapp"
              required
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-100">Endereço</h3>
            
            <div>
              <label htmlFor="street" className="block text-sm font-medium text-gray-200">
                Rua
              </label>
              <input
                type="text"
                id="street"
                required
                value={formData.address.street}
                onChange={(e) => updateAddress('street', e.target.value)}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="number" className="block text-sm font-medium text-gray-200">
                Número
              </label>
              <input
                type="text"
                id="number"
                required
                value={formData.address.number}
                onChange={(e) => updateAddress('number', e.target.value)}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-200">
                Bairro
              </label>
              <input
                type="text"
                id="neighborhood"
                required
                value={formData.address.neighborhood}
                onChange={(e) => updateAddress('neighborhood', e.target.value)}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-200">
                CEP
              </label>
              <input
                type="text"
                id="zipCode"
                required
                placeholder="00000-000"
                value={formData.address.zipCode}
                onChange={(e) => updateAddress('zipCode', e.target.value)}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-red-900 text-white py-2 px-4 rounded-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
};