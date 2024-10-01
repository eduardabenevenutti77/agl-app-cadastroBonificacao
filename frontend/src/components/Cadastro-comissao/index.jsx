import "./style-gestor.css"

export default function Cadastrocomissao() {
    return(
        <>
        <form action="">
            <div id="card-regra">
                <p id="title-regra">Cadastro de regra de comissionamento</p>
                <div id="display-campos">
                    <div>
                        <p className="campos-title">Remuneração fixa <strong className="importante">*</strong></p>
                        <input className="input" type="text" />
                    </div>
                    <div>
                        <p className="campos-title">Remuneração variável <strong className="importante">*</strong></p>
                        <input className="input" type="text" />
                    </div>
                    <div>
                        <p className="campos-title">% por critério <strong className="importante">*</strong></p>
                        <input className="input" type="text" />
                    </div>
                    <div>
                        <p className="campos-title">Critério 01 (valor) <strong className="importante">*</strong></p>
                        <input className="input" type="text" />
                    </div>
                    <div>
                        <p className="campos-title">Critério 02 (valor)</p>
                        <input className="input" type="text" />
                    </div>
                    <div>
                        <p className="campos-title">Multiplicadores <strong className="importante">*</strong></p>
                        <input className="input" type="text" />
                    </div>
                    <div>
                        <p className="campos-title">Selecione o time <strong className="importante">*</strong></p>
                        <select>
                            <option value="someOption">Some option</option>
                            <option value="otherOption">Other option</option>
                        </select>
                    </div>
                    <div>
                        <p className="campos-title">Selecione o funcionário</p>
                        <select>
                            <option value="someOption">Some option</option>
                            <option value="otherOption">Other option</option>
                        </select>
                    </div>
                    <div>
                        <p className="campos-title">Selecione o produto <strong className="importante">*</strong></p>
                        <select>
                            <option value="someOption">Some option</option>
                            <option value="otherOption">Other option</option>
                        </select>
                    </div>
                </div>
                {/* <div id="display-button">
                    <button id="cancelar">Cancelar o cadastro</button>
                    <button id="cadastrar" type="submit">Efetuar o cadastro</button>
                </div> */}
            </div>
        </form>
        </>
    )
}