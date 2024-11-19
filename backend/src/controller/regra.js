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
    async cadastroRegra(campoPorcento, criterioUm, selectFunil, selectedProduto, quantidade, selectedTime, selectFuncionario) {
        // primeiro realizar o cadastro do grupo => id do time, id do funcionário e id do produto 
        // cadastrar o 1º criterio, 2º criterio e o id do funil daquela criterio
        // em regra, cadastrar a remuneração fixa, a remuneração variável, a porcentagem, o id do critério e o id do grupo
        // cadastrar a informação normal e quando for puxar do banco realizar o cálculo
        // Validação de campos obrigatórios
        if (!campoPorcento || !criterioUm || !selectedTime || !selectedProduto || !selectFunil) {
            throw new Error("Todos os campos são obrigatórios!");
        }
        try {
            const createGrupo = await grupo.create({
                timeID: selectedTime,
                funcionarioID: selectFuncionario,
                produtoID: selectedProduto,
                funilID: selectFunil
            });
            if (createGrupo) {
                const createRegra = await regra.create({
                    criterio: criterioUm,
                    porcentagem: campoPorcento,
                    grupoID: createGrupo.id,
                });
                return createRegra;
            } else {
                console.log("Problema ao cadastrar grupo, revise os dados e tente novamente!");
            }
            throw new Error("Erro ao criar o grupo ou critério, tente novamente.");
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                const validationErrors = error.errors.map(err => err.message);
                console.error('Erro de validação ao criar a regra:', validationErrors);
                throw new Error(`Erro de validação: ${validationErrors.join(', ')}`);
            } else {
                console.error('Erro ao processar a criação da regra:', error);
                throw new Error(`Erro ao processar a criação da regra: ${error.message}`);
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
            const criterioUm = await criterio.findAll({ attributes: ['id', 'criterioUm'] });
            const criterioDois = await criterio.findAll({ attributes: ['id', 'criterioDois'] });

            const criteriosIniciais = criterioUm.map(item => item.criterioUm);
            const criteriosSecundarios = criterioDois.map(item => item.criterioDois);

            const timeID = await regra.findAll({
                attributes: ['id', 'grupoID'],
                include: [{
                    model: grupo,
                    required: false,
                    attributes: ['id', 'timeID'],
                }]
            });

            const identificadoresTimes = timeID.map(item => {
                return item.grupo ? item.grupo.timeID : null;
            }).filter(timeID => timeID !== null);

            criteriosIniciais.forEach(criterioInicial => {
                criteriosSecundarios.forEach(criterioSecundario => {
                    identificadoresTimes.forEach(identificadorTime => {
                        if (criterioInicial < 1000 && criterioSecundario === 1000 && identificadorTime === 5) {
                            console.log('Aplicar a validação aqui [0]');
                        } else if (criterioInicial < 1001 && criterioSecundario === 1500 && identificadorTime === 5) {
                            console.log('Aplicar a validação aqui [0,3]');
                        } else if (criterioInicial < 1501 && criterioSecundario === 1999 && identificadorTime === 5) {
                            console.log('Aplicar a validação aqui [0,5]');
                        } else if (criterioInicial < 2000 && criterioSecundario === 2499 && identificadorTime === 5) {
                            console.log('Aplicar a validação aqui [0,6]');
                        } else if (criterioInicial < 2500 && criterioSecundario === 2999 && identificadorTime === 5) {
                            console.log('Aplicar a validação aqui [1,0]');
                        } else if (criterioInicial < 3000 && criterioSecundario === 3999 && identificadorTime === 5) {
                            console.log('Aplicar a validação aqui [1,5]');
                        } else if (criterioInicial > 4000 && identificadorTime === 5) {
                            console.log('Aplicar a validação aqui [1,7]');
                        } else if (criterioInicial < 500 && criterioSecundario === 1000 && identificadorTime === 9 || identificadorTime === 10) {
                            console.log('Aplicar a validação aqui [0,2]');
                        } else if (criterioInicial < 1001 && criterioSecundario === 1500 && identificadorTime === 9 || identificadorTime === 10) {
                            console.log('Aplicar a validação aqui [0,35]');
                        } else if (criterioInicial < 1501 && criterioSecundario === 2000 && identificadorTime === 9 || identificadorTime === 10) {
                            console.log('Aplicar a validação aqui [0,50]');
                        } else if (criterioInicial < 2001 && criterioSecundario === 2500 && identificadorTime === 9 || identificadorTime === 10) {
                            console.log('Aplicar a validação aqui [0,80]');
                        } else if (criterioInicial < 2501 && criterioSecundario === 3000 && identificadorTime === 9 || identificadorTime === 10) {
                            console.log('Aplicar a validação aqui [1,0]');
                        } else if (criterioInicial > 3001 && identificadorTime === 9 || identificadorTime === 10) {
                            console.log('Aplicar a validação aqui [1,1]');
                        } else if (criterioInicial < 500 && criterioSecundario === 700 && identificadorTime === 0) {
                            console.log('Aplicar a validação aqui [0,1]');
                        } else if (criterioInicial < 701 && criterioSecundario === 900 && identificadorTime === 0) {
                            console.log('Aplicar a validação aqui [0,2]');
                        } else if (criterioInicial < 901 && criterioSecundario === 1200 && identificadorTime === 0) {
                            console.log('Aplicar a validação aqui [0,4]');
                        } else if (criterioInicial < 1201 && criterioSecundario === 1500 && identificadorTime === 0) {
                            console.log('Aplicar a validação aqui [0,6]');
                        } else if (criterioInicial < 1501 && criterioSecundario === 2000 && identificadorTime === 0) {
                            console.log('Aplicar a validação aqui [0,7]');
                        } else if (criterioInicial > 2001 && identificadorTime === 0) {
                            console.log('Aplicar a validação aqui [0,8]');
                        } else {
                            console.log('caiu fora da validação')
                        }
                    });
                });
            });
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