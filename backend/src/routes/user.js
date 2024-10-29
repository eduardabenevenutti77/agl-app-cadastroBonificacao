const express = require('express');
const session = require('express-session')
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const UserApi = require("../api/user");
// const UserController = require("../controller/user")

// criando session
router.use(session({
    secret: 'exemplo',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

// rotas para ADM
router.get("/context", UserApi.findContext);
router.post("/cadastroRegra", authMiddleware(['admin']), UserApi.cadastroRegra);
router.get("/dashboardAdm", authMiddleware(['admin'], UserApi.dashboardADM)); // preciso criar essa rota
router.get("/findUser", authMiddleware(['admin'], UserApi.find));
router.put("/:id/block", authMiddleware(['admin']), UserApi.blockUser);
router.put("/:id/unblock", authMiddleware(['admin']), UserApi.unblockUser);
router.get('/logout', UserApi.logout);

// rotas para User
router.get('/dashboardUser', authMiddleware(['user', UserApi.dashboardUser])); // preciso criar essa rota

module.exports = router;