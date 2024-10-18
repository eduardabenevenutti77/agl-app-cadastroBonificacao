import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Cadastro from './pages/Cadastro';
import { Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Cadastrogestor from './pages/Cadastro-gestor';
import Login from './pages/Login';
import DashboardGestor from './pages/Dashboard-gestor';
import { AuthProvider } from '../src/auth/Context'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from '../src/routes/PrivateRoute';
import Sobre from './pages/Sobre';

function App() {
  const location = useLocation();
  const ocultarElementos = location.pathname === '/login' || location.pathname === '/';
  const isLoginOrCadastro = location.pathname === '/login' || location.pathname === '/';

  return (
    <>
    <AuthProvider>
      <div className={isLoginOrCadastro ? 'login-background' : 'default-background'}>
        {!ocultarElementos && <Header />}
        <div className="content">
          <Routes>
            <Route path="/" element={<Cadastro />} />
            <Route element={<PrivateRoute />}>
              <Route path="/cadastrogestor" element={<Cadastrogestor />} />
              <Route path="/dashboardgestor" element={<DashboardGestor />} />
              <Route path="/sobre" element={<Sobre />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <ToastContainer
          position="bottom-center"
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ width: '50%' }}
        />
        {!ocultarElementos && <Footer />}
      </div>
    </AuthProvider>
    </>
  );
}

export default App;
