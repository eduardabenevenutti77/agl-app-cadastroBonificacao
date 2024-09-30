import "./style-login.css"
import logoZopu from "../../assets/logoZopu.png"
import logoAgl from "../../assets/logo.png"
export default function CardLogin() {
    return(
        <>
            <div id="position">
                <div id="logo-zopu">
                    <img src={logoZopu} alt="" style={{width:"400px"}}/>
                </div>
                <div id="login">
                    <p id="login-title">Gestão de bonificação</p>
                    <div id="campos">
                        <div>
                            <p className="campo">Informe o e-mail</p>
                            <input type="text" className="email" placeholder="digite o seu e-mail"/>
                            {/* <input type="text" name="" id="" /> */}
                        </div>
                        <div>
                            <p className="campo">Informe a senha</p>
                            <input type="text" className="senha" placeholder="digite a sua senha"/>
                            {/* <input type="text" name="" id="" /> */}
                        </div>
                    </div>
                    <div id="button">
                        <button id="acesso">Acesse a sua conta</button>
                    </div>
                    <p id="cadastro-link">Ainda não tem uma conta? <span style={{ textDecoration: 'underline' }}>Cadastre-se agora.</span></p>
                    <img src={logoAgl} style={{width: "150px", marginLeft:"276px"}} />
                </div>
            </div>
        </>
    )
}