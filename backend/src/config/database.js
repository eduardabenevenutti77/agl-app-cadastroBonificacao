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
            password: "",
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
        });
    }
}

module.exports = new Database();