const jwt = require("jsonwebtoken");
const user = require('../controller/user');

function authMiddleware(roles = []) {
    return (req, res, next) => {
        const token = req.headers["authorization"];

        if (!token) {
            return res.status(400).json({ message: "Token não foi fornecido!" });
        }

        jwt.verify(token, "bonificacao", async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Token inválido! "});
            }

            const userLogged = await user.findUser(decoded.id)

            if (!userLogged) {
                return res.status(404).json({ message: "Usuário não foi encontrado!" });
            }
            if (roles.length && !roles.includes(userLogged.permissao))  {
                return res.status(403).json({ message: "Sem permissão" });
            }

            req.session = decoded;
            next();
        });
    }
}

module.exports = authMiddleware;