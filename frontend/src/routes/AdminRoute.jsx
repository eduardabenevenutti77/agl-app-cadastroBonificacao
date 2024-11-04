import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './auth/Context';
import Cadastrocomissao from "../../components/Cadastro-comissao"

export function PrivateRoute({ children }) {
  const { token, role } = useContext(AuthContext);
  if (!token || role !== 'admin') {
    return <Navigate to="/permissao" />;
  }
  return children ? children : <Cadastrocomissao />;
}