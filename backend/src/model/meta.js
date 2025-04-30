const database = require('../config/database')

class Meta {
    constructor() {
        this.model = database.db.define('metas', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            meta: {
                type: database.db.Sequelize.DECIMAL,
            }
        })
    }
}

module.exports = new Meta().model;