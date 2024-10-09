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
                type: database.db.Sequelize.INTEGER,
            },
            remuneracaoVariavel: {
                type: database.db.Sequelize.INTEGER,
            },
            porcentagem: {
                type: database.db.Sequelize.INTEGER,
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