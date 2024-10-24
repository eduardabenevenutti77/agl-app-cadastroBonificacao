import "./style-header.css";
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../auth/Context';
import logout from "../../assets/svg/logout.svg";

export default function Header() {
  const { token, role } = useContext(AuthContext);
  const location = useLocation();

  const isLoginRoute = location.pathname === '/login';

  // Adicione logs de depuração para verificar o token e o role
  console.log("Token:", token); 
  console.log("Role:", role); 

  return (
    <>
      <div className="menu">
        {
          !isLoginRoute && !token
            ? <Link to="/login" className="menu-link" style={{textDecoration: 'none'}}><p>Gestão de Bonificação</p></Link>
            : null
        }
        <div>
          <p>Gestão de Bonificação</p>
        </div>
        <div className="icon-container">
          <div>
            <Link to="/dashboardgestor" className="menu-link" style={{textDecoration: 'none'}}>
              <p id="dashboardGestor">Dashboard</p>
            </Link>
          </div>
          <div>
            {
              token && role === 'admin' 
              ? <Link to="/cadastrogestor" className="menu-link" style={{textDecoration: 'none'}}> <p id="cadastrar-regra">Cadastrar regra</p> </Link> 
              : null
            }
          </div>
          <div>
            {
              token && <Link to="/sobre" className="menu-link" style={{textDecoration: 'none'}}> <p id="cadastrar-regra">Sobre o projeto</p> </Link>
            }
          </div>
          {
            token && <Link><img src={logout} alt="Logout" className="logout-icon" /></Link>
          }
        </div>
      </div>
    </>
  );
}