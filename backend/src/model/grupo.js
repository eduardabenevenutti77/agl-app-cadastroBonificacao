const database = require("../config/database")

class Grupo {
    constructor() {
        this.model = database.db.define("grupos", {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            timeID: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: "times",
                    key: 'id'
                }
            },
            funcionario: {
                type: database.db.Sequelize.STRING,
            },
            produtoID: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: "produtos",
                    key: 'id'
                }
            }
        });
    }
}

module.exports = new Grupo().model;