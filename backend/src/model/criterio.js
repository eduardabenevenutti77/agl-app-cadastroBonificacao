const database = require("../config/database")

class Criterio {
    constructor() {
        this.model = database.db.define("criterios", {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            criterioUm: {
                type: database.db.Sequelize.STRING
            },
            criterioDois: {
                type: database.db.Sequelize.STRING
            },
            multiplicadores: {
                type: database.db.Sequelize.FLOAT
            }
        });
    }
}

module.exports = new Criterio().model;