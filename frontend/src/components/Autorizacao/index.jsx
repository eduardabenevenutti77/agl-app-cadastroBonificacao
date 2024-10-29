import './style-autorizacao.css'
import permissao from "../../assets/svg/permissao.svg"

export default function SemAutorizacao() {
    return (
        <>
            <div className="container">
            <img src={permissao} style={{width: '300px'}} />
                <div>
                    <p className='title-permissao'>Parece que você encontrou um beco sem saída. Permissão negada!</p>
                    <div>
                        <p className='subtitle-permissao'>Se você acha que isso é um erro, tente acessar sua conta com privilégios apropriados ou entre em contato com a equipe de suporte.</p>
                    </div>
                </div>
            </div>
        </>
    )
}