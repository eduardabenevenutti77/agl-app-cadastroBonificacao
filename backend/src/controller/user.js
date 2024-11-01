const userModel = require("../model/user");
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
                const userValue = await userModel.create({
                    email,
                    senha: cypherSenha,
                    permissao: "admin" 
                });
                return userValue;
            } else {
                console.log("O usuário não está no departamento. Será cadastrado como usuário normal");
                const cypherSenha = await bcrypt.hash(String(senha), SALT_VALUE);
                const userValue = await userModel.create({
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
            const userValue = await userModel.findOne({ where: { email } });
            if (!userValue) {
                throw new Error("[1] Usuário e senha inválidos.");
            }
            if (userValue.bloqueado === 1) {
                throw new Error("[3] O acesso está bloqueado.");
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

    async find() {
        try {
            const response = await userModel.findAll();
            console.log("Dados recebidos -> ", response);
            return response
        } catch (e) {
            console.log("deu pau aqui -> ", e)
        }
    }

    async blockUser(id) {
    try {
      const userToBlock = await userModel.findByPk(id);
      if (!userToBlock) {
        throw new Error('Usuário não encontrado.');
      }
      // userToBlock.isBlocked = true;
      userToBlock.bloqueado = 1
      await userToBlock.save();
      return { message: 'Usuário bloqueado com sucesso.' };
    } catch (error) {
      throw new Error('Erro ao bloquear o usuário: ' + error.message);
    }
  }

  async unblockUser(id) {
    try {
      const userToUnblock = await userModel.findByPk(id);
      if (!userToUnblock) {
        throw new Error('Usuário não encontrado.');
      }
      userToUnblock.bloqueado = 0;
      await userToUnblock.save();
      return { message: 'Usuário desbloqueado com sucesso.' };
    } catch (error) {
      throw new Error('Erro ao desbloquear o usuário: ' + error.message);
    }
  }

  async findUser(id) {
    // req.session.touch();
    if (id === undefined) {
      throw new Error("Id é obrigatório.");
    }
    const userValue = await userModel.findByPk(id);
    if (!userValue) {
      throw new Error("Usuário não encontrado.");
    }
    return userValue;
  }
    
}

module.exports = new UserController();