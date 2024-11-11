const express = require('express');
const router = express.Router();
const UserApi = require('../api/user')

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

router.get('/getValorVendasAnual', UserApi.findVendasAnual);
router.get('/getProdutosVendidos', UserApi.findProdutosVendidos);
router.get('/getVendasMensal', UserApi.findVendasMensal);

router.get('/calculoOTE', UserApi.calculoOTE);

router.post('/cadastroFixa', UserApi.cadastroFixa);

module.exports = router;