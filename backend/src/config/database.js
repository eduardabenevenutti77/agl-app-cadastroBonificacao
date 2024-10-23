const { Sequelize } = require("sequelize");

class Database {
    constructor() {
        this.init();
    }
    init() {
        this.db = new Sequelize({
            database: "cadastroBonificacao",
            host: "localhost",
            port: 3306,
            username: "root",
            dialect: "mysql",
            password: ""
        });
    }
}

module.exports = new Database();