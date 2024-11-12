const database = require("../config/database")

class User {
    constructor() {
        this.model = database.db.define("users", {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            email: {
                type: database.db.Sequelize.STRING,
                unique: true,
            },
            senha: {
                type: database.db.Sequelize.STRING
            },
            bloqueado: {
                type: database.db.Sequelize.INTEGER,
            },
            permissao: {
                type: database.db.Sequelize.STRING,
                validate: {
                    isIn: [["admin", "user"]],
                },
            },
            remuneracaoFixa: {
                type: database.db.Sequelize.DECIMAL,
            }
        });
    }
}

module.exports = new User().model;