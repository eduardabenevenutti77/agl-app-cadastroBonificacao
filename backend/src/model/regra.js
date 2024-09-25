const database = require("../config/databese")

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
            }
        })
    }
}
module.exports = new Regra().model;