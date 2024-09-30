import "./style-header.css"
import { Link } from "react-router-dom"
import logout from "../../assets/svg/logout.svg"

export default function Header(){
    return(
        <>
        <div className="menu">
            <Link to='/' style={{textDecoration: 'none'}}>
                <p>Gestão de bonificação</p>
            </Link>
            <div className="icon-container">
                <div>
                    <Link to="/cadastrogestor" style={{textDecoration: 'none'}}>
                        <p id="cadastrar-regra">Cadastrar regra</p>
                    </Link>
                    <Link to="/login" style={{textDecoration: 'none'}}>
                        {/* <p id="cadastrar-regra">Cadastrar regra</p> */}
                    </Link>
                </div>
                <div>
                    <Link>
                        <img src={logout} className="logout-icon" />
                    </Link>
                </div>
            </div>
        </div>
        </>
    )
}