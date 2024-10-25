const user = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const SECRET_KEY = "bonificacao"
const SALT_VALUE = 10;
const validando = (email) => {
    return email.endsWith('@agltelecom.com');
};
const validando_senha = (senha) => {
    const teste = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return teste.test(senha);
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
            if (!validando_senha(senha)) {
                throw new Error("A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, símbolos e um número.");
            }
            if (email === 'fernanda.lopes@agltelecom.com' || email === 'diego@agltelecom.com' || email === 'sara@agltelecom.com' || email === 'Rose@agltelecom.com' || email === 'alexandre@agltelecom.com' || email === 'shayenne@agltelecom.com') {
                console.log('O usuário é chefe de algum departamento. Será cadastrado com usuário adm');
                const cypherSenha = await bcrypt.hash(String(senha), SALT_VALUE);
                const userValue = await user.create({
                    email,
                    senha: cypherSenha,
                    permissao: "admin" 
                });
                return userValue;
            } else {
                console.log("O usuário não está no departamento. Será cadastrado como usuário normal");
                const cypherSenha = await bcrypt.hash(String(senha), SALT_VALUE);
                const userValue = await user.create({
                    email,
                    senha: cypherSenha,
                    permissao: "user" 
                });
                return userValue;
            }
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
    
    async loginUser(email, senha) {
        if (email === undefined || senha === undefined) {
            throw new Error("Email e senha são obrigatórios.");
        }
        try {
            const userValue = await user.findOne({ where: { email } });
            if (!userValue) {
                throw new Error("[1] Usuário e senha inválidos.");
            }
            const senhaValida = await bcrypt.compare(String(senha), userValue.senha);
            if (!senhaValida) {
                throw new Error("[2] Usuário e senha inválidos.");
            }
            return jwt.sign({ id: userValue.id, role: userValue.permissao }, SECRET_KEY, { expiresIn: 120 * 120 });
        } catch (e) {
            console.error(`Erro -> `, e);
        }
    }

    async findUsers() {
        return user.findAll();
    }
    
}

module.exports = new UserController();