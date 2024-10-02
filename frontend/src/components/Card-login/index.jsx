import "./style-login.css"
import { useState } from "react";
import axios from 'axios';
import logoZopu from "../../assets/logoZopu.png"
import logoAgl from "../../assets/logo.png"
import eye from "../../assets/svg/olho.svg"
import eyes from "../../assets/svg/olhos.svg"


export default function CardLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/login", {
                email,
                password
            });
            if (response.data.sucess) {
                alert('Logado - teste');
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError('Login falhou');
        }
    };

    const toggleVisibility = () => {
        setShow(!show);
    };

    return(
        <>
            <div id="position">
                <div id="logo-zopu">
                    <img className="logoZopu" src={logoZopu} alt="" style={{width:"400px"}}/>
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
                                    <img src={show? eye : eyes} onClick={toggleVisibility} style={{cursor: 'pointer'}} alt="" />{/* Ícone (usando Font Awesome como exemplo) */}
                                </div>
                            </div>
                        </div>
                        <div id="button">
                            <button type="submit" id="acesso">Acesse a sua conta</button>
                            {error && <p>{error}</p>} {/* caso ocorra erro será notificado aqui */}
                        </div>
                    </form>
                    <p id="cadastro-link">Ainda não tem uma conta? <span style={{ textDecoration: 'underline' }}>Cadastre-se agora.</span></p>
                    <img className="logoAGL" src={logoAgl} />
                </div>
            </div>
        </>
    )
}