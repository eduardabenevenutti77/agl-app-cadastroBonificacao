const database = require('../config/database')
const funilId = require('../model/funil')

class Fase {
    constructor() {
        this.model = database.db.define('fases', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            fase: {
                type: database.db.Sequelize.STRING
            },
            funilId: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: "funis",
                    key: 'id'
                }
            },
        })
    }
}

module.exports = new Fase().model;