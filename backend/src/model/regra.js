const database = require("../config/database")
const grupoID = require('../model/grupo')

class Regra {
    constructor() {
        this.model = database.db.define("regras", {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            criterio: {
                type: database.db.Sequelize.DECIMAL,
            },
            porcentagem: {
                type: database.db.Sequelize.DECIMAL,
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