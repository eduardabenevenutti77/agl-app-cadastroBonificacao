const express = require('express');
const session = require('express-session')
const authMiddleware = require('../middleware/authMiddleware')
const UserApi = require("../api/user");
const router = express.Router();

// criando session
router.use(session({
    secret: 'exemplo',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

// rotas para ADM
router.post("/cadastroRegra", authMiddleware(['admin']), UserApi.cadastroRegra);
router.get("/dashboardAdm", authMiddleware(['admin'], UserApi.dashboardADM)); // preciso criar essa rota
router.get("/findUsers", authMiddleware(['admin'], UserApi.findUsers));

// rotas para User
router.get('/dashboardUser', authMiddleware(['user', UserApi.dashboardUser])); // preciso criar essa rota

module.exports = router;