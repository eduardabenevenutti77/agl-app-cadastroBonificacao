import "./style-cadastro.css"
import { useState } from "react";
import logoZopu from "../../assets/logoZopu.png"
import logoAgl from "../../assets/logo.png"
import eye from "../../assets/svg/olho.svg"
import eyes from "../../assets/svg/olhos.svg"

export default function CardCadastro() {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

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
                    <img src={logoZopu} alt="" style={{width:"400px"}}/>
                </div>
                <div id="cadastro">
                    <p id="cadastro-title">Gestão de bonificação</p>
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
                            <div>
                                <p className="campo">Repita a senha informada</p><div className="input-container">
                                    <input
                                        type={show? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="senha"
                                        placeholder="digite a sua senha novamente"
                                    />
                                    <img src={show? eye : eyes} onClick={toggleVisibility} style={{cursor: 'pointer'}} alt="" />
                                </div>
                            </div>
                        </div>
                        <div id="button">
                            <button id="acesso">Acesse a sua conta</button>
                            {error && <p>{error}</p>} 
                        </div>
                    </form>
                    <div id="position-logo">
                        <img id="logoAGL" src={logoAgl} />
                    </div>
                </div>
            </div>
        </>
    )
}