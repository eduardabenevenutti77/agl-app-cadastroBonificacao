const regra = require("../model/regra")

class RegraController {
    async cadastroRegra( remuneracaoFixa, remuneracaoVariavel ) {
        if ( !remuneracaoFixa || !remuneracaoVariavel ) {
            throw new Error("Os campos são obrigatório!");
        }
        const regraValue = await regra.create({
            remuneracaoFixa,
            remuneracaoVariavel
        });
        return regraValue;
    }
}

module.exports = new RegraController();