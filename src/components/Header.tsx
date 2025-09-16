import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Wine, User as UserIcon, Menu, Radio } from 'lucide-react';
import { useSearchStore } from '../store/searchStore';
import { Helmet } from 'react-helmet-async';
import { User } from '../types/User';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { query, setQuery } = useSearchStore();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/');
  };

  const openRadioStream = () => {
    window.open('https://radiotatuapefm.radiostream321.com', '_blank');
  };

  return (
    <>
      <Helmet>
        <title>Adega Rádio Tatuapé FM 24 Horas - Bebidas com Preços Populares</title>
        <meta name="description" content="Sua adega 24 horas na Zona Leste de São Paulo. Cervejas geladas, destilados e bebidas com os melhores preços. Delivery rápido e ambiente acolhedor." />
      </Helmet>
      <header className="bg-gray-800 text-gray-100 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Wine size={32} />
              <span className="text-xl font-bold hidden md:inline">Adega Rádio Tatuapé FM</span>
              <span className="text-xl font-bold md:hidden">Adega RT</span>
            </Link>

            <div className="flex-1 max-w-md mx-8 hidden md:block">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-full bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button type="submit" className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-200">
                  <Search size={20} />
                </button>
              </form>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={openRadioStream}
                className="animate-pulse bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors hidden md:flex items-center gap-2"
              >
                <Radio size={20} />
                <span className="font-medium">Ouça ao Vivo</span>
              </button>

              <a
                href="https://www.ifood.com.br/delivery/sao-paulo-sp/adega-radio-tatuape-fm-24-horas-vila-regente-feijo"
                target="_blank"
                rel="noopener noreferrer"
                className="animate-pulse bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors hidden md:flex items-center gap-2"
              >
                <span className="font-medium">Pedir no iFood</span>
              </a>

              <button 
                className="md:hidden text-gray-100"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu size={24} />
              </button>

              {user && (
                <div className={`${isMenuOpen ? 'absolute top-16 right-4 bg-gray-800 p-4 rounded-lg shadow-lg z-50 w-64' : 'hidden'} md:flex md:items-center md:space-x-6`}>
                  <Link 
                    to="/profile" 
                    className="flex items-center space-x-2 hover:text-red-400 py-2 px-3 rounded-lg hover:bg-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserIcon size={24} />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{user.name.split(' ')[0]}</span>
                      <span className="text-xs text-gray-400 truncate max-w-[150px]">
                        {`${user.address.street}, ${user.address.number}`}
                      </span>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-4 md:hidden">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-full bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button type="submit" className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-200">
                <Search size={20} />
              </button>
            </form>
            <div className="flex gap-2 mt-4">
              <button
                onClick={openRadioStream}
                className="flex-1 animate-pulse bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <Radio size={20} />
                <span className="font-medium">Ouça ao Vivo</span>
              </button>
              <a
                href="https://www.ifood.com.br/delivery/sao-paulo-sp/adega-radio-tatuape-fm-24-horas-vila-regente-feijo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 animate-pulse bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <span className="font-medium">Pedir no iFood</span>
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};