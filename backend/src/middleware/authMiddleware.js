const jwt = require("jsonwebtoken");
const user = require('../controller/user');

function authMiddleware(roles = []) {
    return async (req, res, next) => {
        const token = req.headers["authorization"];
        if (!token) {
            return res.status(400).json({ mensagem: "Token não fornecido" });
        }
        try {
            const decoded = jwt.verify(token, "bonificacao");
            const userLoggedArray = await user.findUsers(decoded.id);
            const userLogged = userLoggedArray[0]; 
            console.log("Usuário encontrado: ", userLogged ? userLogged.dataValues : "Nenhum usuário encontrado");
            if (!userLogged) {
                return res.status(404).json({ mensagem: "Usuário não encontrado" });
            }
            if (roles.length && !roles.includes(userLogged.dataValues.permissao)) {
                console.log(`Acesso negado para ${userLogged.dataValues.email}. Permissões: ${userLogged.dataValues.permissao}`);
                return res.status(403).json({ mensagem: "Sem permissão" });
            }
            req.session = userLogged.dataValues; 
            next();
        } catch (err) {
            console.error(err);
            return res.status(401).json({ mensagem: "Token inválido" });
        }
    };
}

module.exports = authMiddleware;