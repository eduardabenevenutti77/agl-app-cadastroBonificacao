import "./style-cadastro.css"
import logoZopu from "../../assets/logoZopu.png"
import logoAgl from "../../assets/logo.png"
export default function CardCadastro() {
    return(
        <>
            <div id="position">
                <div id="logo-zopu">
                    <img src={logoZopu} alt="" style={{width:"400px"}}/>
                </div>
                <div id="cadastro">
                    <p id="cadastro-title">Gestão de bonificação</p>
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
                        <div>
                            <p className="campo">Repita a senha informada</p>
                            <input type="text" className="senha" placeholder="digite a sua senha novamente"/>
                            {/* <input type="text" name="" id="" /> */}
                        </div>
                    </div>
                    <div id="button">
                        <button id="acesso">Acesse a sua conta</button>
                    </div>
                    <img src={logoAgl} style={{width: "140px", marginLeft:"280px", marginTop: "0px"}} />
                </div>
            </div>
        </>
    )
}