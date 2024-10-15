import "./style-header.css";
import { Link } from "react-router-dom";
import logout from "../../assets/svg/logout.svg";

export default function Header() {
  return (
    <>
      <div className="menu">
        <Link to="/" className="menu-title" style={{textDecoration: 'none'}}>
          <p>Gestão de Bonificação</p>
        </Link>
        <div className="icon-container">
          <div>
            <Link to="/dashboardgestor" className="menu-link" style={{textDecoration: 'none'}}>
              <p id="dashboardGestor">Dashboard</p>
            </Link>
          </div>
          <div>
            <Link to="/cadastrogestor" className="menu-link" style={{textDecoration: 'none'}}>
              <p id="cadastrar-regra">Cadastrar regra</p>
            </Link>
          </div>
          <div>
            <Link to="/login" className="menu-link" style={{textDecoration: 'none'}}> 
              <img src={logout} alt="Logout" className="logout-icon" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}