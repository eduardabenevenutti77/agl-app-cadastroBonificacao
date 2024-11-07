const database = require("../config/database")
const produtoID = require('../model/produto')
const funcionarioId = require('../model/funcionario')
const timeID = require('../model/time')
const funilId = require('../model/funil')

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
            funcionarioID: {
                type: database.db.Sequelize.INTEGER,
            },
            produtoID: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: "produtos",
                    key: 'id'
                }
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

module.exports = new Grupo().model;