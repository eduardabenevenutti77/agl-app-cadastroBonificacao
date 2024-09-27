const database = require("../config/database")

class Produto {
    constructor() {
        this.model = database.db.define("produtos", {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            produtos: {
                type: database.db.Sequelize.STRING
            }
        });
    }
}

module.exports = new Produto().model;