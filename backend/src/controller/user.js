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


    // validar o motivo pelo qual o sistema não está fazendo a validação de nível
    async createUser(email, senha) {
        try {
            // Validações dos campos
            if (!email || !senha) {
                throw new Error("Os campos email e senha são obrigatórios!");
            }
            if (!validando(email)) {
                throw new Error("O e-mail deve ser da AGL Telecom.");
            }
            if (!validando_senha(senha)) {
                throw new Error("A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, símbolos e um número.");
            }
    
            // Busca pelos departamentos
            const response = await axios.get(`https://agltelecom.bitrix24.com.br/rest/8/m4fwz47k43hly413/department.get`, {
                timeout: 5000
            });
    
            const departments = response.data.result;
            const idDepartments = departments.map(department => department.ID_head); 
            console.log('IDs dos departamentos:', idDepartments);
    
            // Faz a requisição para obter usuários
            const usersResponse = await axios.get(`https://agltelecom.bitrix24.com.br/rest/8/m4fwz47k43hly413/user.get`, {
                timeout: 5000
            });
    
            const users = usersResponse.data.result; // Assume que o resultado está em 'result'
            // console.log('Usuários obtidos:', users);
    
            // Verifica se o usuário está dentro de algum departamento
            const userInDepartment = departments.some(department => {
                // Supondo que você tenha um atributo que liga o usuário ao departamento
                return users.includes(department.UF_HEAD); // Verifica se o ID do departamento do usuário está na lista
            });
    
            if (userInDepartment) {
                const cypherSenha = await bcrypt.hash(String(senha), SALT_VALUE);
                const userValue = await user.create({
                    email,
                    senha: cypherSenha,
                    permissao: 'admin'
                });
                return userValue;
            } else {
                console.log("O usuário não está no departamento.");
                const cypherSenha = await bcrypt.hash(String(senha), SALT_VALUE);
                const userValue = await user.create({
                    email,
                    senha: cypherSenha,
                    permissao: 'admin'
                });
                return userValue;
            }
    
        } catch (error) {
            // Tratamento de erros
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
            const senhaValida = bcrypt.compare(String(senha), userValue.senha);
            if (!senhaValida) {
                throw new Error("[2] Usuário e senha inválidos.");
            }
            return jwt.sign({ id: userValue.id }, SECRET_KEY, { expiresIn: 120 * 120 });
        } catch (e) {
            console.error(`Erro -> `, e);
        }
    }

    async findUsers() {
        return user.findAll();
    }
}

module.exports = new UserController();