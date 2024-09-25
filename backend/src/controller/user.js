const user = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const SECRET_KEY = "bonificacao"
const SALT_VALUE = 10;

class UserController {
    /*async function obterEmails() {
        const url = "https://seu_dominio.bitrix24.com/rest/user.get.json?auth=SEU_TOKEN"; // mudar para a url da AGL
        try {
            const response = await axios.get(url);
            return response.data.result;
        } catch ( error ) {
            console.error("Erro ao obter funcionários: ", error);
            return [];
        }
    }*/
}