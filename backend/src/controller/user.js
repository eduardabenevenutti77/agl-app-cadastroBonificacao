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
    
    async createUser( email, senha ) {
        if (!email || !senha) {
            throw new Error("Os campos são obrigatório!");
        }
        if (!validando(email)) {
            throw new Error("O e-mail deve ser da AGL Telecom.");
        } else {
            if (email === "fernanda.lopes@agltelecom.com" || email === "diego@agltelecom.com" || email === "Rose@agltelecom.com" || email === "Shayenne@agltelecom.com" || email === "barbara@agltelecom.com") {
                const cypherSenha = await bcrypt.hash(String(senha), SALT_VALUE); 
                const userValue = await user.create({
                    email,
                    senha: cypherSenha,
                    permissao: "admin"
                });
                return userValue;
            } else {
                const cypherSenha = await bcrypt.hash(String(senha), SALT_VALUE); 
                const userValue = await user.create({
                    email,
                    senha: cypherSenha,
                    permissao: "user"
                });
                return userValue;
            }
        }
    }

    async login(email, senha) {
        if (email === undefined || senha === undefined) {
            throw new Error("Os campos são obrigatórios");
        }
        const userValue = await user.findOne({ where: {email} });
        if (!userValue) {
            throw new Error("[1] Usuário e senha inválidos.");
        }
        const senhaValida = bcrypt.compare(String(senha), userValue.senha);
        if (!senhaValida) {
            throw new Error("[2] Usuário e senha inválidos.");
        }
        return jwt.sign({ id: userValue.id }, SECRET_KEY, {expiresIn: 60 * 60});
    }
}

module.exports = new UserController();