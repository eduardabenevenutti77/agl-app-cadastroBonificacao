const express = require('express');
const UserApi = require("../api/user");
const router = express.Router();

router.post("/cadastroRegra", UserApi.cadastroRegra);

module.exports = router;