import './App.css';
import { AuthProvider } from '../src/auth/Context'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import Sobre from './pages/Sobre';
import DashboardGestor from './pages/Dashboard-gestor';
import PrivateRoute from '../src/routes/PrivateRoute';
import Cadastrogestor from './pages/Cadastro-gestor';
import Autorizacao from './pages/Sem-autorizacao';
import Bloquear from './pages/Bloquear/Bloquear';
import CadastroVenda from './pages/Cadastro-venda';

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
              {/* Rota pública */}
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Cadastro />} />
              <Route path="/permissao" element={<Autorizacao />} />
              {/* Rotas protegidas */}
              <Route element={<PrivateRoute />}>
                <Route path="/dashboardgestor" element={<DashboardGestor />} />
                <Route path="/cadastrogestor" element={<Cadastrogestor />} />
                {/* <Route path="/cadastrovenda" element={<CadastroVenda />} /> */}
                <Route path="/gestao" element={<Bloquear />} />
                <Route path="/sobre" element={<Sobre />} />
              </Route>
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
