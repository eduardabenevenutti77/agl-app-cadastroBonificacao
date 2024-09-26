const UserController = require('../controller/user');
const RegraController = require('../controller/regra');

class UserApi {
    async createUser(req, res) {
        const { email, senha } = req.body
        try {
            const user = await UserController.createUser(email, senha)
            return res.status(201).send(user)
        } catch (e) {
            res.status(400).send({ error: e.message })
            // return res.status(400).send({ error: `Erro ao criar usuário` })error: e.message
        }
    }
    
    async login(req, res) {
        const { email, senha } = req.body
        // console.log(req.body)
        try {
            const token = await UserController.login(email, senha)
            res.status(200).send({token})
        } catch (e) {
            res.status(400).send({ error: e.message })
        }
    }

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