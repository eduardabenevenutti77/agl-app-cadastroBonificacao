const express = require("express");
const cors = require("cors");
const database = require("./config/database");
const UserApi = require("./api/user");
const UserRouter = require("./routes/user");
const RegraRouter = require('./routes/regra');
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
app.use(express.json());
app.use(cors({credentials: true}));

app.get("/", (req, res) => {
    res.status(200).json({ message: "Ok, a requesição está funcionado" });
});


// delimitando o parâmetro das rotas
app.use('/api/v1/user', UserRouter)
app.use('/api/v1/regra', RegraRouter)

// rotas sem validação
app.post("/api/v1/user/cadastro", UserApi.createUser);
app.post("/api/v1/user/loginUser", UserApi.loginUser);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
  (async () => {
    try {
      await database.db.authenticate(); 
      console.log("Conexão com o banco de dados estabelecida com sucesso.");
      await database.db.sync({ force: false }); 
      console.log("Modelos sincronizados com sucesso.");
    } catch (error) {
      console.error("Erro ao conectar ao banco de dados:", error);
    }
})();

module.exports = app;