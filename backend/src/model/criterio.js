const database = require("../config/database")
const funilId = require('../model/funil')

class Criterio {
    constructor() {
        this.model = database.db.define("criterios", {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            criterioUm: {
                type: database.db.Sequelize.DECIMAL
            },
            criterioDois: {
                type: database.db.Sequelize.DECIMAL
            },
            multiplicadores: {
                type: database.db.Sequelize.FLOAT
            },
            funilID: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: "funis",
                    key: 'id'
                }
            },
        });
    }
}

module.exports = new Criterio().model;