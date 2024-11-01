const express = require('express');
// const session = require('express-session');
const router = express.Router();
const UserApi = require('../api/user')

// criando uma session
// router.use(session({
//     secret: 'exemplo',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {secure: false}
// }));

// rotas de fetch para o wehook do bitrix24
router.post('/funil', UserApi.createFunil);
router.get('/getFunil', UserApi.findFunil);

router.post('/fase', UserApi.createFase);
router.get('/getFase', UserApi.findFase);

router.post('/produto', UserApi.createProduto);
router.get('/getProduto', UserApi.findProduto);

router.post('/time', UserApi.createTime);
router.get('/getTime', UserApi.findTime);

router.post('/funcionario', UserApi.createFuncionario);
router.get('/getFuncionario', UserApi.findFuncionario);

module.exports = router;