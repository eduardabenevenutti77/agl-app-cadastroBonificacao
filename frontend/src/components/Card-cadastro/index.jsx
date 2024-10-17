import "./style-cadastro.css"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../api/user';
import { toast } from 'react-toastify';
import logoZopu from "../../assets/logoZopu.png"
import logoAgl from "../../assets/logo.png"
import eye from "../../assets/svg/olho.svg"
import eyes from "../../assets/svg/olhos.svg"

export default function CardCadastro() {
    const navigate = useNavigate();

    // const handleBackClick = () => {
    //     navigate(-1);
    // };

    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        try {
          e.preventDefault();
    
          const responseApi = await createUser({nome, email, senha})
          console.log(responseApi)
          if(responseApi.id){
            navigate('/login')
          } else {
            console.log(responseApi)
          }
        } catch (error) {
          console.log(error)
          if (error.status === 403) {
            return toast("Sem permissão.");
          }
          if (error.status === 401 || error.status === 404) {
            return toast('Email ou senha inválido, tente novamente!');
          }
          toast('Erro inesperado, tente novamente mais tarde!');
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
                    <form className="signup-form" onSubmit={handleSubmit}>
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
                            <button id="acesso" onClick={handleSubmit}>Acesse a sua conta</button>
                            {error && <p>{error}</p>} 
                        </div>
                    </form>
                    {/* <div id="position-logo">
                        <img id="logoAGL" src={logoAgl} />
                    </div> */}
                </div>
            </div>
        </>
    )
}