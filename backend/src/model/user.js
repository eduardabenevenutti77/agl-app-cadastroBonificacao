const database = require("../config/database")
const metaID = require('../model/meta')

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
            },
            metaID: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'metas',
                    key: 'id'
                }
            }
        });
    }
}

module.exports = new User().model;