const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const UserApi = require("../api/user");

// rotas para ADM
router.get("/context", UserApi.findContext);
router.post("/cadastroRegra", authMiddleware(['admin']), UserApi.cadastroRegra);
// router.get("/dashboardAdm", authMiddleware(['admin'], UserApi.dashboardADM)); // preciso criar essa rota
router.get("/get/findUser", UserApi.find);
router.put("/:id/block", authMiddleware(['admin']), UserApi.blockUser);
router.put("/:id/unblock", authMiddleware(['admin']), UserApi.unblockUser);
router.get('/logout', UserApi.logout);

module.exports = router;