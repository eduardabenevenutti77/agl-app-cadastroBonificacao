const database = require("../config/database")
const criterioID = require("../model/criterio");
const grupoID = require('../model/grupo')

class Regra {
    constructor() {
        this.model = database.db.define("regras", {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            remuneracaoFixa: {
                type: database.db.Sequelize.DECIMAL,
            },
            remuneracaoVariavel: {
                type: database.db.Sequelize.DECIMAL,
            },
            porcentagem: {
                type: database.db.Sequelize.DECIMAL,
            },
            criterioID: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: "criterios",
                    key: 'id'
                }
            },
            grupoID: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: "grupos",
                    key: 'id'
                }
            }
        });
    }
}
module.exports = new Regra().model;