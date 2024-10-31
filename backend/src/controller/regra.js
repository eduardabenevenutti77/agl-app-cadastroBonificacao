const regra = require("../model/regra");
const funil = require('../model/funil');
const fase = require("../model/fase");
const produto = require('../model/produto');

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

    async findFunil() {
        const findAll = await funil.findAll();
        return findAll;
    }

    async createFunil() {
        try {
            let findFunil = await funil.findAll();
            const response = await fetch('https://agltelecom.bitrix24.com.br/rest/8/m4fwz47k43hly413/crm.category.list?entityTypeId=2');
            const data = await response.json();
    
            // Confirma que o array de categorias existe
            const funilsArray = data?.result?.categories || [];
    
            if (!Array.isArray(funilsArray)) {
                throw new Error("A resposta não contém uma lista válida de categorias.");
            }
    
            const funilData = await Promise.all(
                funilsArray.map(async (funils) => {
                    const createFunil = await funil.create({
                        id: funils.id,
                        funil: funils.name || 'Unknow',
                    });
                    return createFunil;
                })
            );
    
            findFunil = funilData;
        } catch (error) {
            console.log(error)
            console.error("Erro ao cadastrar informações do webhook ->", error.message);
        }
    }   

    async findFase() {
        const findAll = await fase.findAll();
        return findAll;
    }

    async createFase() {
        try {
            // let findFase = await fase.findAll();

            // 1 - vendas | 2 - bko | 10 - qualidade | 14 - controle | 22 - acompanhamento
            const idFunil = 22
            const response = await fetch(`https://agltelecom.bitrix24.com.br/rest/8/m4fwz47k43hly413/crm.dealcategory.stage.list?id=${idFunil}`);
            const data = await response.json();
    
            console.log("Dados recebidos:", JSON.stringify(data, null, 2));
            // Confirma que o array de categorias existe
            const faseArray = data?.result || [];
    
            if (!Array.isArray(faseArray)) {
                throw new Error("A resposta não contém uma lista válida de categorias.");
            }
    
            const faseData = await Promise.all(
                faseArray.map(async (fases) => {
                    const createFunil = await fase.create({
                        id: fases.id,
                        fase: fases.NAME || 'Unknow',
                        funilId: idFunil
                    });
                    return createFunil;
                })
            );
    
            console.log(faseData)
        } catch (error) {
            console.log(error)
            console.error("Erro ao cadastrar informações do webhook ->", error.message);
        }
    }   

    async findProduto() {
        const findAll = await produto.findAll();
        return findAll;
    }

    async createProduto() {
        try {
            const response = await fetch(`https://agltelecom.bitrix24.com.br/rest/8/m4fwz47k43hly413/crm.product.list`);
            const data = await response.json();
    
            console.log("Dados recebidos:", JSON.stringify(data, null, 2));
            // Confirma que o array de categorias existe
            const produtoArray = data?.result?.categories || [];
    
            if (!Array.isArray(produtoArray)) {
                throw new Error("A resposta não contém uma lista válida de categorias.");
            }
    
            const produtoData = await Promise.all(
                produtoArray.map(async (Produtos) => {
                    const createProduto = await produto.create({
                        id: Produtos.id,
                        produtos: Produtos.name || 'Unknow'
                    });
                    return createProduto;
                })
            );
    
            console.log(produtoData)
        } catch (error) {
            console.log(error)
            console.error("Erro ao cadastrar informações do webhook ->", error.message);
        }
    }
}

module.exports = new RegraController();