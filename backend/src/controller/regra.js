const regra = require("../model/regra");
const funil = require('../model/funil');
const fase = require("../model/fase");
const produto = require('../model/produto');
const time = require('../model/time');
const funcionario = require('../model/funcionario');
const grupo = require('../model/grupo');
const user = require('../model/user');
const { Op } = require('sequelize');
grupo.belongsTo(funil, { foreignKey: 'funilID' });

class RegraController {
    async cadastroRegra(timeID, funcionarioID, produtoID, funilID, campoPorcento, criterioUm) {
        if (!campoPorcento || !criterioUm || !timeID || !produtoID || !funilID) {
            throw new Error("Todos os campos são obrigatórios!");
        }
        try {
            console.log("Valores recebidos:", {
                campoPorcento,
                criterioUm,
                funilID,
                produtoID,
                timeID,
                funcionarioID,
            });

            console.log("Criando grupo com os dados:", {
                timeID,
                funcionarioID,
                produtoID,
                funilID
            });

            const timeExists = await time.findByPk(timeID);
            if (!timeExists) {
                throw new Error(`O time com ID ${timeID} não existe no banco de dados!`);
            }

            const createGrupo = await grupo.create({
                timeID,
                funcionarioID,
                produtoID,
                funilID,
            });

            if (createGrupo) {
                console.log("Grupo criado com sucesso:", createGrupo);
                const createRegra = await regra.create({
                    criterio: criterioUm,
                    porcentagem: campoPorcento,
                    grupoID: createGrupo.id,
                });
                return createRegra;
            } else {
                throw new Error("Problema ao cadastrar grupo, revise os dados e tente novamente!");
            }
        } catch (error) {
            console.error('Erro ao processar a criação da regra:', error.message);
            if (error.name === 'SequelizeValidationError') {
                const validationErrors = error.errors.map(err => err.message);
                console.error('Erro de validação:', validationErrors);
            }
        }
    }

    async cadastroFixa(remuneracaoFixa, userId) {
        console.log('bateu aqui - controller');
        if (!remuneracaoFixa) {
            console.log('O campo de remuneração fixa não foi informado. Por favor, arrume este campo e continue o cadastro!');
            throw new Error('Remuneração fixa não informada.');
        }
        console.log('Remuneração:', remuneracaoFixa);

        try {
            userId = parseInt(userId, 10);
            console.log(`Buscando usuário com ID: ${userId}`);

            const findUser = await user.findByPk(userId);
            if (!findUser) {
                console.log('Usuário não encontrado para o ID:', userId);
                throw new Error('Usuário não encontrado.');
            } else {
                const updateUser = {
                    remuneracaoFixa
                };

                const [updatedRows] = await user.update(updateUser, {
                    where: { id: userId }
                });

                if (updatedRows === 0) {
                    console.log('Nenhuma linha foi atualizada. Verifique o userId ou os dados.');
                } else {
                    console.log('Remuneração fixa atualizada com sucesso!');
                }

                return 'Remuneração fixa atualizada com sucesso!';
            }
        } catch (e) {
            if (e.name === 'SequelizeValidationError') {
                const validationErrors = e.errors.map(err => err.message);
                console.error('Erro de validação ao atualizar a remuneração fixa:', validationErrors);
                throw new Error(`Erro de validação: ${validationErrors.join(', ')}`);
            } else {
                console.error('Erro ao processar a atualização:', e);
                throw new Error(`Erro ao processar a atualização: ${e.message}`);
            }
        }
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
        try {
            const findAll = await fase.findAll();
            console.log('Caiu no controller')
            return findAll;
        } catch (e) {
            console.log(error)
            console.error("Erro ao buscar fase por funil ->", error.message);
        }
    }

    async createFase() {
        try {
            // 1 - vendas | 2 - bko | 10 - qualidade | 14 - controle | 22 - acompanhamento
            const idFunil = 2
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
                        funilID: idFunil
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

    async findVendasAnual() {
        try {
            const allVendasAnual = await regra.count('id');
            return allVendasAnual;
        } catch (error) {
            console.error("Erro ao buscar dados das vendas anuais ->", error.message);
        }
    }

    async findProdutosVendidos() {
        try {
            const allProdutosVendidos = await grupo.count({
                distinct: true,
                col: 'funcionarioID'
            });
            return allProdutosVendidos;
        } catch (e) {
            console.error("Erro ao buscar dados de produtos vendidos ->", e.message);
        }
    }

    async findVendasMensal() {
        try {
            const currentDate = new Date();
            const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

            const vendasMensal = await regra.count({
                where: {
                    createdAt: {
                        [Op.between]: [startOfMonth, endOfMonth]
                    }
                }
            });
            return vendasMensal;
        } catch (error) {
            console.error("Erro ao buscar dados das vendas mensal ->", error.message);
        }
    }

    async calculoOTE() {
        try {
            // aplicar o cálculo aqui [parte finallllllllllllll]
        } catch (e) {
            console.error("Erro ->", e.message);
            console.error("Detalhes ->", e);
        }
    }

    async chartsFunil() {
        try {
            const grupos = await grupo.findAll();
            const funis = await funil.findAll();

            const funisMap = funis.reduce((acc, funil) => {
                acc[funil.id] = funil.funil;
                return acc;
            }, {});

            const funilContagem = grupos.reduce((acc, grupo) => {
                const funilID = grupo.funilID;
                const nomeFunil = funisMap[funilID] || "Desconhecido";

                if (!acc[funilID]) {
                    acc[funilID] = { nome: nomeFunil, totalGrupos: 0 };
                }
                acc[funilID].totalGrupos += 1;

                return acc;
            }, {});
            const resultado = Object.values(funilContagem);
            return resultado;
        } catch (error) {
            console.error("Erro ao buscar dados de produtos vendidos ->", error.message);
        }
    }

    async findMonthTime() {
        try {
            const grupoMonth = await grupo.findAll();
            const timeMonth = await time.findAll();

            const timeMap = timeMonth.reduce((acc, time) => {
                acc[time.id] = time.time;
                return acc;
            }, {});

            const timeContagem = grupoMonth.reduce((acc, grupo) => {
                const timeID = grupo.timeID;
                const nomeTime = timeMap[timeID] || "Desconhecido";

                if (!acc[timeID]) {
                    acc[timeID] = { nome: nomeTime, totalGrupos: 0 };
                }
                acc[timeID].totalGrupos += 1;

                return acc;
            }, {});
            const findMonth = Object.values(timeContagem);
            return findMonth;
        } catch (e) {
            console.error("Erro ao buscar vendas por times ->", e.message);
        }
    }

    async findMonthFunc() {
        try {
            const grupoMonth = await grupo.findAll();
            const funcMonth = await funcionario.findAll();

            const funcMap = funcMonth.reduce((acc, funcionario) => {
                acc[funcionario.id] = funcionario.funcionario;
                return acc;
            }, {});

            const funcionarioContagem = grupoMonth.reduce((acc, grupo) => {
                const funcionarioID = grupo.funcionarioID;
                const nomeFunc = funcMap[funcionarioID] || "Desconhecido";

                if (!acc[funcionarioID]) {
                    acc[funcionarioID] = { nome: nomeFunc, totalGrupos: 0 };
                }
                acc[funcionarioID].totalGrupos += 1;

                return acc;
            }, {});
            const findMonth = Object.values(funcionarioContagem);
            return findMonth;
        } catch (e) {
            console.error("Erro ao buscar vendas por times ->", e.message);
        }
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = new RegraController();