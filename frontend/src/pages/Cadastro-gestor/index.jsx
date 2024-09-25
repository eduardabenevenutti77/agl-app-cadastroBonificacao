import "./style-gestor.css"

export default function Cadastrogestor() {
    return(
        <>
        <div id="card-regra">
            <p id="title-regra">Cadastro de regra de comissionamento</p>
            <div id="display-campos">
                <div>
                    <p className="campos-title">Remuneração fixa <strong className="importante">*</strong></p>
                    <input type="text" />
                </div>
                <div>
                    <p className="campos-title">Remuneração variável <strong className="importante">*</strong></p>
                </div>
                <div>
                    <p className="campos-title">% por critério <strong className="importante">*</strong></p>
                </div>
                <div>
                    <p className="campos-title">Critério 01 (valor) <strong className="importante">*</strong></p>
                </div>
                <div>
                    <p className="campos-title">Critério 02 (valor)</p>
                </div>
                <div>
                    <p className="campos-title">Multiplicadores <strong className="importante">*</strong></p>
                </div>
                <div>
                    <p className="campos-title">Selecione o time <strong className="importante">*</strong></p>
                </div>
                <div>
                    <p className="campos-title">Selecione o funcionário</p>
                </div>
                <div>
                    <p className="campos-title">Selecione o produto <strong className="importante">*</strong></p>
                </div>
            </div>
        </div>
        </>
    )
}