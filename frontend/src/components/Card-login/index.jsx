import "./style-login.css"
import { useContext, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/Context';
import { loginUser } from '../../api/user';
import { toast } from 'react-toastify';
import logoZopu from "../../assets/logoZopu.png"
import logoAgl from "../../assets/logo.png"
import eye from "../../assets/svg/olho.svg"
import eyes from "../../assets/svg/olhos.svg"


export default function CardLogin() {

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!email || !senha) {
            return toast('Informe o e-mail e a senha para continuar!');
        }
    
        try {
            // 7 - Usar Axios para fazer a requisição de login
            const response = await loginUser(email, senha);
            if (response.token) {
                // 8 - Adicionar login ao AuthContext
                login(response.token);
                return navigate('/');
            }
        } catch (error) {
            if (error.response.status === 403) {
              return toast("Sem permissão.");
            }
            if (error.response.status === 401 || error.response.status === 404) {
              return toast('Email ou senha inválido, tente novamente!');
            }
            return toast('Erro inesperado, tente novamente mais tarde!');
        }
    };

    const toggleVisibility = () => {
        setShow(!show);
    };

    return(
        <>
            <div id="position">
                <div id="logo-zopu">
                    <img src={logoZopu} alt="" style={{width:"400px"}}/>
                </div>
                <div id="login">
                    <p id="login-title">Gestão de bonificação</p>
                    <form onSubmit={handleSubmit}>
                        <div id="campos">
                            <div>
                                <p className="campo">Informe o e-mail</p>
                                <input type="email" value = {email} onChange={(e) => setEmail(e.target.value)} className="email" placeholder="digite o seu e-mail"/>
                            </div>
                            <div>
                                <p className="campo">Informe a senha</p>
                                <div className="input-container">
                                    <input
                                        type={show? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="senha"
                                        placeholder="digite a sua senha"
                                    />
                                    <img src={show? eye : eyes} onClick={toggleVisibility} style={{cursor: 'pointer'}} alt="" />
                                </div>
                            </div>
                        </div>
                        <div id="button">
                            <button type="submit" id="acesso" onClick={handleSubmit}>Acesse a sua conta</button>
                            {error && <p>{error}</p>} 
                        </div>
                    </form>
                    <p id="cadastro-link">Ainda não tem uma conta? <Link to='/' style={{color: '#0081B8'}}>Cadastre-se agora.</Link></p>
                    {/* <div className="logo-container">
                        <img className="logoAGL-login" src={logoAgl} alt="Logo AGL" />
                        {/* <div className="divider"></div>
                        <img className="logoZopu" src={logoZopu} alt="Logo Zopu" /> 
                    </div> */}
                </div>
            </div>
        </>
    )
}