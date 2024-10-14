const user = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const SECRET_KEY = "bonificacao"
const SALT_VALUE = 10;
const validando = (email) => {
    return email.endsWith('@agltelecom.com');
};

class UserController {

    async createUser(email, senha) {
        try {
            if (!email || !senha) {
                throw new Error("Os campos email e senha são obrigatórios!");
            }
            if (!validando(email)) {
                throw new Error("O e-mail deve ser da AGL Telecom.");
            }
            const response = await axios.get(`https://agltelecom.bitrix24.com.br/rest/8/m4fwz47k43hly413/user.search?filter[EMAIL]=${email}`, {
                timeout: 5000
            });
            let permissao = "user";
            if (response.data.result && response.data.result.length > 0) {
                const webhookUser = response.data.result[0];
                const webhookEmail = webhookUser.EMAIL[0]?.VALUE?.toLowerCase();
                if (email.toLowerCase() === webhookEmail) {
                    const position = webhookUser.POSITION?.toLowerCase() || "";
                    const isSupervisor = position.includes("supervisora de vendas") ||
                        position.includes("supervisora suporte/bko") ||
                        position.includes("supervisor de vendas");
                    if (isSupervisor) {
                        permissao = "admin";
                    }
                }
            }
            const cypherSenha = await bcrypt.hash(String(senha), SALT_VALUE);
            const userValue = await user.create({
                email,
                senha: cypherSenha,
                permissao
            });
            return userValue;
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                const validationErrors = error.errors.map(err => err.message);
                console.error('Erro de validação ao criar o usuário:', validationErrors);
                throw new Error(`Erro de validação: ${validationErrors.join(', ')}`);
            } else {
                console.error('Erro ao criar o usuário -> ', error);
                throw new Error(`Erro ao processar a criação do usuário: ${error.message}`);
            }
        }
    }


    async login(email, senha) {
        if (email === undefined || senha === undefined) {
            throw new Error("Email e senha são obrigatórios.");
        }
        const userValue = await user.findOne({ where: { email } });
        if (!userValue) {
            throw new Error("[1] Usuário e senha inválidos.");
        }
        const senhaValida = bcrypt.compare(String(senha), userValue.senha);
        if (!senhaValida) {
            throw new Error("[2] Usuário e senha inválidos.");
        }
        return jwt.sign({ id: userValue.id }, SECRET_KEY, { expiresIn: 120 * 120 });
    }

    async findUsers() {
        return user.findAll();
    }
}

module.exports = new UserController();