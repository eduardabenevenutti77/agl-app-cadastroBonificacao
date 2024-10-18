import "./style-cadastro.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../api/user';
import { toast } from 'react-toastify';
import logoZopu from "../../assets/logoZopu.png";
// import logoAgl from "../../assets/logo.png";
import eye from "../../assets/svg/olho.svg";
import eyes from "../../assets/svg/olhos.svg";

export default function CardCadastro() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const responseApi = await createUser({ email, senha });
            if (responseApi.id) {
                toast.success("Cadastro realizado com sucesso!"); 
                navigate('/login');
            } else {
                setError('Ocorreu um erro inesperado, tente novamente.');
                toast.error('Erro ao realizar o cadastro, tente novamente.'); 
            }
        } catch (error) {
            console.log(error);

            if (error.status === 403) {
                toast.error("Sem permissão.");
            } else if (error.status === 401 || error.status === 404) {
                toast.error('Email ou senha inválidos, tente novamente!');
            } else {
                toast.error('Erro inesperado, tente novamente mais tarde!');
            }
        }
    };

    const toggleVisibility = () => {
        setShow(!show);
    };

    return (
        <>
            <div id="position">
                <div id="logo-zopu">
                    <img src={logoZopu} alt="" style={{ width: "400px" }} />
                </div>
                <div id="cadastro">
                    <p id="cadastro-title">Gestão de bonificação</p>
                    <form className="signup-form" onSubmit={handleSubmit}>
                        <div id="campos">
                            <div>
                                <p className="campo">Informe o e-mail</p>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="email" placeholder="Digite o seu e-mail" />
                            </div>
                            <div>
                                <p className="campo">Informe a senha</p>
                                <div className="input-container">
                                    <input type={show ? 'text' : 'password'} value={senha} onChange={(e) => setSenha(e.target.value)} className="senha" placeholder="Digite a sua senha" />
                                    <img src={show ? eye : eyes} onClick={toggleVisibility} style={{ cursor: 'pointer' }} alt="eye-icon" />
                                </div>
                            </div>
                            <div>
                                <p className="campo">Repita a senha informada</p>
                                <div className="input-container">
                                    <input type={show ? 'text' : 'password'} value={senha} onChange={(e) => setSenha(e.target.value)} className="senha" placeholder="Digite a sua senha novamente" />
                                    <img src={show ? eye : eyes} onClick={toggleVisibility} style={{ cursor: 'pointer' }} alt="eye-icon" />
                                </div>
                            </div>
                        </div>
                        <div id="button">
                            <button id="acesso" type="submit">Acesse a sua conta</button>
                            {error && <p>{error}</p>}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}