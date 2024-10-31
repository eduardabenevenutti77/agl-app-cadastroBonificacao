const database = require('../config/database')

class Funcionario {
    constructor() {
        this.model = database.db.define('funcionarios', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            funcionario: {
                type: database.db.Sequelize.STRING
            },
        })
    }
}

module.exports = new Funcionario().model;