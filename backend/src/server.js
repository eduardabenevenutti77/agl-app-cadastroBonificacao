const express = require("express");
const cors = require("cors");
const database = require("./config/database");

const authMiddleware = require("./middleware/authMiddleware");
const UserApi = require("./api/user");
const UserRouter = require("./routes/user");

const app = express();
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
    res.status(200).json({ message: "Ok, a requesição está funcionado" });
});

// rotas sem validação
app.post("/api/v1/login", UserApi.login);
app.post("/api/v1/cadastro", UserApi.createUser);

// rota com autenticação
app.use("/api/v1/user", authMiddleware(), UserRouter)

database.db
    .sync({ force: false})
    .then((_) => {
        if (!process.env.TEST) {
            app.listen(3000, (_) => {
                console.log("O servidor está rodando na porta 3000")
            });
        }
    })
    .catch((e) => {
        console.error(`Erro ao inicializar o banco de dados ${e}`);
    });

module.exports = app;