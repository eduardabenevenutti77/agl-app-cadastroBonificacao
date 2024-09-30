const user = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const SECRET_KEY = "bonificacao"
const SALT_VALUE = 10;

const validando = (email) => {
    return email.endsWith('@agltelecom.com');
};

class UserController {
    
    /*
        como desmembrar um webhook 
        const axios = require('axios');
        const mysql = require('mysql2');

        // Configurações do banco de dados
        const db = mysql.createConnection({
        host: 'localhost',
        user: 'usuario',
        password: 'senha',
        database: 'seubanco'
        });

        // Função para buscar leads no Bitrix
        async function fetchLeads() {
        const webhookUrl = 'https://seusite.bitrix24.com/rest/1/SEU_WEBHOOK_ID/crm.lead.list';

        try {
            const response = await axios.get(webhookUrl, {
            params: {
                select: ['ID', 'TITLE', 'STATUS']
            }
            });

            const leads = response.data.result;

            // Desmembrar e armazenar no banco de dados
            leads.forEach(lead => {
            const id = lead.ID;
            const title = lead.TITLE;
            const status = lead.STATUS;

            saveToDatabase(id, title, status);
            });
        } catch (error) {
            console.error('Erro ao buscar leads:', error);
        }
        }

        // Função para salvar no banco de dados
        function saveToDatabase(id, title, status) {
        const query = 'INSERT INTO leads (id, title, status) VALUES (?, ?, ?)';
        db.execute(query, [id, title, status], (error, results) => {
            if (error) {
            console.error('Erro ao inserir no banco de dados:', error);
            } else {
            console.log('Lead inserido:', results.insertId);
            }
        });
        }

        // Conectar ao banco de dados e buscar leads
        db.connect(err => {
        if (err) {
            console.error('Erro ao conectar ao banco de dados:', err);
            return;
        }
        console.log('Conectado ao banco de dados.');
        fetchLeads();
        });

    */

    async createUser( email, senha ) {
        if (!email || !senha) {
            throw new Error("Os campos são obrigatório!");
        }
        if (!validando(email)) {
            throw new Error("O e-mail deve ser da AGL Telecom.");
        } else {
            if (email === "fernanda.lopes@agltelecom.com" || email === "diego@agltelecom.com" || email === "Rose@agltelecom.com" || email === "Shayenne@agltelecom.com" || email === "barbara@agltelecom.com") {
                const cypherSenha = await bcrypt.hash(String(senha), SALT_VALUE); 
                const userValue = await user.create({
                    email,
                    senha: cypherSenha,
                    permissao: "admin"
                });
                return userValue;
            } else {
                const cypherSenha = await bcrypt.hash(String(senha), SALT_VALUE); 
                const userValue = await user.create({
                    email,
                    senha: cypherSenha,
                    permissao: "user"
                });
                return userValue;
            }
        }
    }

    async login(email, senha) {
        if (email === undefined || senha === undefined) {
            throw new Error("Os campos são obrigatórios");
        }
        const userValue = await user.findOne({ where: {email} });
        if (!userValue) {
            throw new Error("[1] Usuário e senha inválidos.");
        }
        const senhaValida = bcrypt.compare(String(senha), userValue.senha);
        if (!senhaValida) {
            throw new Error("[2] Usuário e senha inválidos.");
        }
        return jwt.sign({ id: userValue.id }, SECRET_KEY, {expiresIn: 60 * 60});
    }
}

module.exports = new UserController();