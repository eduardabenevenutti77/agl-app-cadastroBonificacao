import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Cadastro from './pages/Cadastro';
import { Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Cadastrogestor from './pages/Cadastro-gestor';
import Login from './pages/Login';
import DashboardGestor from './pages/Dashboard-gestor';

function App() {
  const location = useLocation();
  const ocultarElementos = location.pathname === '/login' || location.pathname === '/';
  const isLoginOrCadastro = location.pathname === '/login' || location.pathname === '/';

  return (
    <>
      <div className={isLoginOrCadastro ? 'login-background' : 'default-background'}>
        {!ocultarElementos && <Header />}
        <div className="content">
          <Routes>
            <Route path="/" element={<Cadastro />} />
            <Route path="/cadastrogestor" element={<Cadastrogestor />} />
            <Route path="/dashboardgestor" element={<DashboardGestor />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        {!ocultarElementos && <Footer />}
      </div>
    </>
  );
}

export default App;
