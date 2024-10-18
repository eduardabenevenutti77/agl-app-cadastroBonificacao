import "./style-login.css"
import { useContext, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/Context';
import { loginUser } from "../../api/user";
import { toast } from 'react-toastify';
import logoZopu from "../../assets/logoZopu.png"
// import logoAgl from "../../assets/logo.png"
import eye from "../../assets/svg/olho.svg"
import eyes from "../../assets/svg/olhos.svg"


export default function CardLogin() {

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setsenha] = useState('');
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!email || !senha) {
            return toast('Informe o e-mail e a senha para continuar!');
        }
    
        try {
            // Fazer a requisição de login
            const response = await loginUser(email, senha);
    
            // Verificar se o token foi retornado corretamente
            if (response.token) {
                // Adicionar o token no AuthContext
                login(response.token);
                return navigate('/sobre'); // Redirecionar ao login bem-sucedido
            } else {
                setError('Erro ao fazer login, tente novamente.');
                toast.error('Erro ao fazer login, tente novamente.');
            }
        } catch (error) {
            if (error.response && error.response.status === 403) {
                toast.error("Sem permissão.");
            } else if (error.response && (error.response.status === 401 || error.response.status === 404)) {
                toast.error('Email ou senha inválido, tente novamente!');
            } else {
                toast.error('Erro inesperado, tente novamente mais tarde!');
            }
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
                    <form>
                        <div id="campos">
                            <div>
                                <p className="campo">Informe o e-mail</p>
                                <input type="email" value = {email} onChange={(e) => setEmail(e.target.value)} className="email" placeholder="digite o seu e-mail"/>
                            </div>
                            <div>
                                <p className="campo">Informe a senha</p>
                                <div className="input-container">
                                    <input
                                        type={show? 'text' : 'senha'}
                                        value={senha}
                                        onChange={(e) => setsenha(e.target.value)}
                                        className="senha"
                                        placeholder="digite a sua senha"
                                    />
                                    <img src={show? eye : eyes} onClick={toggleVisibility} style={{cursor: 'pointer'}} alt="" />
                                </div>
                            </div>
                        </div>
                        <div id="button">
                            <button type="submit" id="acesso" onClick={handleSubmit}>Acesse a sua conta</button>
                            {error && <p id="error-text">{error}</p>} 
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