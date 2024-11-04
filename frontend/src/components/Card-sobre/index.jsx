import './sobre.css';
import logoAgl from '../../assets/logo.png';
import logoZopu from '../../assets/logoZopu.png';

export default function Cardsobre() {
    return (
        <>
            <div id="color">
                <div>
                    <p id="company">Agl telecom - Parceiro Vivo</p>
                    <div id="line"></div>
                </div>
                <div id='display-descricao'>
                    <p className="descricao">O sistema de cadastro de bonificação da AGL tem como objetivo <strong className='strong'>facilitar</strong> e <strong className='strong'>otimizar</strong> a <strong className='strong'>gestão das bonificações oferecidas aos colaboradores da empresa</strong>. Este sistema foi desenvolvido para garantir que o processo de registro, acompanhamento e controle de bonificações seja realizado de forma prática, transparente e eficiente. Pontos priorizados durante a criação do projeto:</p>
                    <div id="topicos">
                        <p className="descricao"><strong className='strong'>-</strong> Interface amigável, caracterizada por um design intuitivo e responsivo. Essa abordagem proporciona uma experiência de usuário agradável tanto para gestores quanto para colaboradores, facilitando o acesso às informações necessárias de maneira simples e eficiente.</p>
                        <p className="descricao"><strong className='strong'>-</strong> Além disso, o sistema prioriza a segurança dos dados, implementando medidas rigorosas para proteger as informações sensíveis dos colaboradores. Dessa forma, apenas usuários autorizados têm acesso às funcionalidades administrativas, garantindo a integridade e a confidencialidade das informações.</p>
                        <p className="descricao"><strong className='strong'>-</strong> Outra funcionalidade essencial do sistema é a geração de relatórios detalhados sobre as bonificações cadastradas. Esses relatórios permitem a análise das bonificações mais utilizadas, bem como sua eficácia no desempenho dos colaboradores. Com essas ferramentas, a AGL poderá não apenas gerenciar as bonificações de forma eficaz, como também analisar insghts valiosos sobre suas vendas, produtos e funcionários.</p>
                    </div>
                    <p className="descricao">O sistema de cadastro de bonificação da AGL representa um passo significativo na modernização da gestão de recursos humanos da empresa. Com suas funcionalidades práticas e eficientes, ele contribuirá para a valorização dos colaboradores e o fortalecimento da cultura organizacional da AGL.</p>
                </div>
                <div id='logo'>
                    <img src={logoAgl} alt="" />
                </div>
            </div>
        </>
    );
}