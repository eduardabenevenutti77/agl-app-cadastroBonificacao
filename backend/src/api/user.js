const UserController = require('../controller/user');
const RegraController = require('../controller/regra');
const criterio = require('../model/criterio');

class UserApi {
    async createUser(req, res) {
        const { email, senha } = req.body
        try {
            const user = await UserController.createUser(email, senha)
            return res.status(201).send(user)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao criar usuário -> ${e.message}` })
        }
    }

    async loginUser(req, res) {
        const { email, senha } = req.body
        console.log('Usuário logado -> ', req.body)
        try {
            const token = await UserController.loginUser(email, senha)
            res.status(200).send({ token })
            console.log(token)
        } catch (e) {
            res.status(400).send({ error: `Problema na hora de logar -> ${e.message}` })
        }
    }

    async find(req, res) {
        try {
            const users = await UserController.find()
            return res.status(200).send(users)
        } catch (e) {
            return res.status(400).send({ error: `Problema na hora de listar usuários -> ${e.message}` })
        }
    }

    async blockUser(req, res) {
        try {
            const { id } = req.params;
            const result = await UserController.blockUser(id);
            return res.status(200).send(result);
        } catch (e) {
            console.log(e)
            res.status(400).send({ error: e.message });
        }
    }

    async unblockUser(req, res) {
        try {
            const { id } = req.params;
            const result = await UserController.unblockUser(id);
            return res.status(200).send(result);
        } catch (e) {
            console.log(e)
            res.status(400).send({ error: e.message });
        }
    }

    async cadastroRegra(req, res) {
        // primeiro realizar o cadastro do grupo => id do time, id do funcionário e id do produto 
        // cadastrar o 1º criterio, 2º criterio e o id do funil daquela criterio
        // em regra, cadastrar a remuneração fixa, a remuneração variável, a porcentagem, o id do critério e o id do grupo
        // cadastrar a informação normal e quando for puxar do banco realizar o cálculo
        const { campoFormatacao, campoVariavel, campoPorcento, criterioUm, criterioDois, multiplicador, selectFunil, selectedProduto, quantidade, selectedTime, selectFuncionario } = req.body
        try {
            const regra = await RegraController.cadastroRegra(campoFormatacao, campoVariavel, campoPorcento, criterioUm, criterioDois, multiplicador, selectFunil, selectedProduto, quantidade, selectedTime, selectFuncionario)
            return res.status(201).send(regra)
        } catch (e) {
            res.status(400).send({ error: e.message })
        }
    }

    logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.log("Erro ao desconectar usuário -> ", err);
                return res.redirect('/sobre');
            }
            res.clearCookie('connect.sid');
            return res.redirect('/api/v1/user/login');
        });
    };

    async findContext(req, res) {
        try {
            console.log("ID da sessão: ", req?.session?.user.id);
            const user = await UserController.findUser(req?.session?.user.id || 0);
            return res.status(200).send(user);
        } catch (e) {
            console.log(e)
            res.status(400).send({ error: e.message })
        }
    }


    async createFunil(req, res) {
        try {
            const funil = await RegraController.createFunil();
            return res.status(201).json(funil)
        } catch (e) {
            console.log('Erro ao cadastrar informações do webhook -> ', e.message);
            res.status(400).json({ e: e.message });
        }
    }

    async findFunil(req, res) {
        try {
            const funil = await RegraController.findFunil();
            console.log(res);
            return res.status(201).json(funil)
        } catch (e) {
            console.log('Erro ao cadastrar informações do webhook -> ', e.message);
            res.status(400).json({ e: e.message });
        }
    }

    async createFase(req, res) {
        try {
            const fase = await RegraController.createFase();
            return res.status(201).json(fase);
        } catch (e) {
            console.log('Erro ao cadastrar webhook de fases -> ', e.message);
            res.status(400).json({ e: e.message });
        }
    }

    async findFase(req, res) {
        try {
            const fase = await RegraController.findFase();
            console.log(res);
            return res.status(201).json(fase);
        } catch (e) {
            console.log('Erro ao buscar fases -> ', e.message);
            res.status(400).json({ e: e.message });
        }
    }

    async createProduto(req, res) {
        try {
            const produto = await RegraController.createProduto();
            return res.status(201).json(produto);
        } catch (e) {
            console.log('Erro ao cadastrar webhook de produtos -> ', e.message);
            res.status(400).json({ e: e.message });
        }
    }

    async findProduto(req, res) {
        try {
            const produto = await RegraController.findProduto();
            console.log(res);
            return res.status(201).json(produto);
        } catch (e) {
            console.log('Erro ao buscar produtos -> ', e.message);
            res.status(400).json({ e: e.message });
        }
    }

    async createTime(req, res) {
        try {
            const time = await RegraController.createTime();
            return res.status(201).send(time)
        } catch (e) {
            console.log('Erro ao cadastrar webhook de times -> ', e.message);
            res.status(400).send({ e: e.message });
        }
    }

    async findTime(req, res) {
        try {
            const time = await RegraController.findTime();
            console.log(res);
            return res.status(201).send(time);
        } catch (e) {
            console.log('Erro ao buscar times -> ', e.message);
            res.status(400).send({ e: e.message });
        }
    }

    async createFuncionario(req, res) {
        try {
            const funcionario = await RegraController.createFuncionario();
            return res.status(201).send(funcionario);
        } catch (e) {
            console.log('Erro ao cadastrar webhook de funcionários -> ', e.message);
            res.status(400).send({ e: e.message });
        }
    }

    async findFuncionario(req, res) {
        try {
            const funcionario = await RegraController.findFuncionario();
            return res.status(200).send(funcionario);
        } catch (e) {
            console.log('Erro ao buscar funcionários -> ', e.message);
            res.status(400).send({ e: e.message });
        }
    }

    async findVendasAnual(req, res) {
        try {
            const vendasAnual = await RegraController.findVendasAnual();
            return res.status(200).send({vendasAnual})
        } catch (e) {
            console.log('Erro ao buscar vendas anuais [1] -> ', e);
            res.status(400).send({ e: e.message });
        }
    }

    async findProdutosVendidos(req, res) {
        try {
            const produtosVendidos = await RegraController.findProdutosVendidos();
            return res.status(200).send({produtosVendidos})
        } catch (e) {
            console.log('Erro ao buscar quantidade de produtos vendidos [1] -> ', e);
            res.status(400).send({ e: e.message });
        }
    }

    async findVendasMensal(req, res) {
        try {
            const vendasMensal = await RegraController.findVendasMensal();
            return res.status(200).send({vendasMensal})
        } catch (e) {
            console.log('Erro ao buscar vendas mensal [1] -> ', e);
            res.status(400).send({ e: e.message });
        }
    }

    async calculoOTE(req, res) {
        try {
            const resultadoOte = await RegraController.calculoOTE();
            return res.status(200).send({resultadoOte}); 
        } catch (e) {
            console.log('Erro ao realizar os cáculos de OTE -> ', e);
            res.status(400).send({ e: e.message });
        }
    }
}

module.exports = new UserApi()