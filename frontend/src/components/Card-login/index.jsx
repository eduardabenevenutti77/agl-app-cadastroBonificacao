import "./style-login.css"
import logoZopu from "../../assets/logoZopu.png"
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
                            {/* <input type="text" name="" id="" /> */}
                        </div>
                        <div>
                            <p className="campo">Informe a senha</p>
                            {/* <input type="text" name="" id="" /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}