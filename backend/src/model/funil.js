const database = require('../config/database')

class Funil {
    constructor() {
        this.model = database.db.define('funis', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            funil: {
                type: database.db.Sequelize.STRING,
            }
        })
    }
}

module.exports = new Funil().model;