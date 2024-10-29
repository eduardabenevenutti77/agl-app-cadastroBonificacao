const UserController = require('../controller/user');
const RegraController = require('../controller/regra');

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
            res.status(200).send({token})
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
            return res.status(400).send({ error: `Problema na hora de listar usuários -> ${e.message}`})
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
}

module.exports = new UserApi()