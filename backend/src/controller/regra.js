const regra = require("../model/regra");
const funil = require('../model/funil');
const fase = require("../model/fase");
const produto = require('../model/produto');
const time = require('../model/time');
const funcionario = require('../model/funcionario');

class RegraController {
    async cadastroRegra(remuneracaoFixa, remuneracaoVariavel) {
        if (!remuneracaoFixa || !remuneracaoVariavel) {
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
            // 1 - vendas | 2 - bko | 10 - qualidade | 14 - controle | 22 - acompanhamento
            const idFunil = 22
            const response = await fetch(`https://agltelecom.bitrix24.com.br/rest/8/m4fwz47k43hly413/crm.dealcategory.stage.list?id=${idFunil}`);
            const data = await response.json();

            console.log("Dados recebidos:", JSON.stringify(data, null, 2));
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
            const response = await fetch("https://agltelecom.bitrix24.com.br/rest/8/m4fwz47k43hly413/crm.product.list");
            const data = await response.json();

            console.log("Dados recebidos:", JSON.stringify(data, null, 2));

            const produtoArray = data?.result || [];
            console.log('Produtos que existem dentro do array -> ', produtoArray)

            if (!Array.isArray(produtoArray) || produtoArray.length === 0) {
                throw new Error("A resposta não contém uma lista válida de categorias.");
            }

            const batchSize = 10;
            for (let i = 0; i < produtoArray.length; i += batchSize) {
                const batch = produtoArray.slice(i, i + batchSize);

                const results = await Promise.all(
                    batch.map(async (Produtos) => {
                        await produto.create({
                            id: Produtos.id,
                            produtos: Produtos.NAME || 'Unknown'
                        });
                    })
                );
                console.log(`Lote ${i / batchSize + 1} inserido com sucesso:`, results);
                await delay(500);
            }
            console.log("Todos os dados foram processados em lotes.");
        } catch (error) {
            console.log(error)
            console.error("Erro ao cadastrar informações do webhook ->", error.message);
        }
    }

    async findTime() {
        const findAll = await time.findAll();
        return findAll;
    }

    async createTime() {
        try {
            const response = await fetch('https://agltelecom.bitrix24.com.br/rest/8/m4fwz47k43hly413/department.get?select[]=name');
            const data = await response.json();

            const timeArray = data?.result || [];

            if (!Array.isArray(timeArray)) {
                throw new Error("A resposta não contém uma lista válida de categorias.");
            }

            const timeData = await Promise.all(
                timeArray.map(async (times) => {
                    const createTime = await time.create({
                        id: times.id,
                        time: times.NAME || 'Unknow',
                    });
                    return createTime;
                })
            );
            console.log(timeData)
        } catch (error) {
            console.log(error)
            console.error("Erro ao cadastrar informações do webhook ->", error.message);
        }
    }

    async findFuncionario() {
        const findAll = await funcionario.findAll();
        return findAll;
    }

    async createFuncionario() {
        try {
            const response = await fetch('https://agltelecom.bitrix24.com.br/rest/8/m4fwz47k43hly413/user.get');
            const data = await response.json();

            const funcArray = data?.result || [];

            if (!Array.isArray(funcArray)) {
                throw new Error("A resposta não contém uma lista válida de categorias.");
            }

            const funcData = await Promise.all(
                funcArray.map(async (funcs) => {
                    const firstName = funcs.NAME || "Nome desconhecido";
                    const lastName = funcs.LAST_NAME || "Sobrenome desconhecido";

                    const fullName = `${firstName} ${lastName}`;
                    const createTime = await funcionario.create({
                        id: funcs.id,
                        funcionario: fullName || 'Unknow',
                    });
                    return createTime;
                })
            );
            console.log(funcData)
        } catch (error) {
            console.log(error)
            console.error("Erro ao cadastrar informações do webhook ->", error.message);
        }
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = new RegraController();