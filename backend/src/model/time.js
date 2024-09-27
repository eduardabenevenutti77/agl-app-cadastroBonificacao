const database = require("../config/database")

class Time {
    constructor() {
        this.model = database.db.define("times", {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            time: {
                type: database.db.Sequelize.STRING
            }
        });
    }
}

module.exports = new Time().model;