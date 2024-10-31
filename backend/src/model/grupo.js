const database = require("../config/database")
const timeID = require('../model/time')
const produtoID = require('../model/produto')
const funcionarioId = require('../model/funcionario')

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
            funcionarioId: {
                type: database.db.Sequelize.INTEGER,
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