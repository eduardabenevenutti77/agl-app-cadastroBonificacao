const UserController = require('../controller/user');
const RegraController = require('../controller/regra');

class UserApi {
    async createUser(req, res) {
        const { email, senha } = req.body
        try {
            const user = await UserController.createUser(email, senha)
            return res.status(201).send(user)
        } catch (e) {
            // error: `Problema na hora de criar usuários -> ${e.message}`
            return res.status(400).send({ error: `Erro ao criar usuário -> ${e.message}` })
        }
    }
    
    async login(req, res) {
        const { email, senha } = req.body
        console.log('Usuário logado -> ', req.body)
        try {
            const token = await UserController.login(email, senha)
            res.status(200).send({token})
        } catch (e) {
            res.status(400).send({ error: `Problema na hora de logar -> ${e.message}` })
        }
    }

    async findUsers(req, res) {
        try {
            const users = await UserController.findUsers()
            return res.status(200).send(users)
        } catch (e) {
            return res.status(400).send({ error: `Problema na hora de listar usuários -> ${e.message}`})
        }
    }

    // preciso arrumar essa função 
    async cadastroRegra(req, res) {
        const { remuneracaoFixa, remuneracaoVariavel } = req.body
        try {
            const regra = await RegraController.cadastroRegra(remuneracaoFixa, remuneracaoVariavel) 
            return res.status(201).send(regra)
        } catch (e) {
            res.status(400).send({ error: e.message })
        }
    }
}

module.exports = new UserApi()