import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { SuccessPage } from './pages/SuccessPage';
import { SplashScreen } from './pages/SplashScreen';
import { RegisterPage } from './pages/RegisterPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { OnboardingPage } from './pages/OnboardingPage';
import { CookieConsent } from './components/CookieConsent';
import { InstallPWA } from './components/InstallPWA';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/splash" element={<SplashScreen />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/*"
          element={
            <div className="min-h-screen bg-gray-900">
              <Header />
              <main className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/success" element={<SuccessPage />} />
                  <Route path="/profile" element={<UserProfilePage />} />
                </Routes>
              </main>
              
              <footer className="bg-gray-800 text-gray-200 py-8 mt-16">
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                      <h3 className="text-xl font-bold mb-4">Contato</h3>
                      <p className="text-gray-400">WhatsApp: (11) 97060-3441</p>
                      <p className="text-gray-400">Email: radiotatuapefm@gmail.com</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-4">Endereço</h3>
                      <p className="text-gray-400">Vila Regente Feijó</p>
                      <p className="text-gray-400">São Paulo - SP</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-4">Horário de Funcionamento</h3>
                      <p className="text-gray-400">24 horas - Todos os dias</p>
                    </div>
                  </div>
                </div>
              </footer>
              <CookieConsent />
              <InstallPWA />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
