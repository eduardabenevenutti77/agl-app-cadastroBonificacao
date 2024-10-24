import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './auth/Context';

// Cria uma rota protegida que verifica se o usuário é admin
export function PrivateRoute({ children }) {
  const { token, role } = useContext(AuthContext);

  // Verifica se o usuário está logado e se é admin
  if (!token || role !== 'admin') {
    return <Navigate to="/permissao" />;
  }

  // Se for admin, renderiza o componente filho (rota protegida)
  return children ? children : <Outlet />;
}