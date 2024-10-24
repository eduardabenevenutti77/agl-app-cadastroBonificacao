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
            if (!email || !senha) {
                throw new Error("Os campos email e senha são obrigatórios!");
            }
            if (!validando(email)) {
                throw new Error("O e-mail deve ser da AGL Telecom.");
            }
            if (!validando_senha(senha)) {
                throw new Error("A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, símbolos e um número.");
            }
            // realiza a requisição nos departamentos
            const response = await axios.get(`https://agltelecom.bitrix24.com.br/rest/8/m4fwz47k43hly413/department.get`, {
                timeout: 5000
            });
            const departments = response.data.result; // Armazena os departamentos no array
            const idDepartments = departments.map(department => department.UF_HEAD); // Armazena os IDs de UF_HEAD (id dos gestores)
            // const idDepartmentsStr = idDepartments.join(','); // Converte em string
            console.log('IDs dos chefes de departamentos:', idDepartments);
            // realiza a resquisição nos funcionários, passando como parâmetro o IDs dos UF_HEAD
            const usersResponse = await axios.get(`https://agltelecom.bitrix24.com.br/rest/8/m4fwz47k43hly413/user.get`, {
                params: {
                    filter: { ID: idDepartments },
                    timeout: 5000
                }
            });
            const userInDepartment = usersResponse.data.result.length > 0; // armazena num array
        
            // se o usuário não está no departamento
            if (!userInDepartment) {
                console.log("O usuário não está no departamento. Será cadastrado como usuário normal");
                const cypherSenha = await bcrypt.hash(String(senha), SALT_VALUE);
                const userValue = await user.create({
                    email,
                    senha: cypherSenha,
                    permissao: "user" // salva a permissão como usuário normal
                });
                return userValue;
            } else {
                // caso o usuário esteja no departamento
                console.log('O usuário é chefe de algum departamento. Será cadastrado com usuário adm');
                const cypherSenha = await bcrypt.hash(String(senha), SALT_VALUE);
                const userValue = await user.create({
                    email,
                    senha: cypherSenha,
                    permissao: "admin" // salva a permissão como adm
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
            console.log('Usuário foi logado com sucesso!');
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