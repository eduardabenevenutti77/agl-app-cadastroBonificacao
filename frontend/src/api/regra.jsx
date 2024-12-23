import api from './api';

export const findFunil = async () => {
    const response = await api.get('/api/v1/regra/getFunil')
    return response.data
}

export const findFase = async () => {
    const response = await api.get(`/api/v1/regra/getFase`);
    return response.data
}

export const findTime = async () => {
    const response = await api.get('/api/v1/regra/getTime');
    return response.data
}

export const findFuncionario = async () => {
    const response = await api.get('/api/v1/regra/getFuncionario');
    return response.data
}

export const findProduto = async () => {
    const response = await api.get('/api/v1/regra/getProduto');
    return response.data
}

export const findVendasAnual = async () => {
    const response = await api.get('/api/v1/regra/getValorVendasAnual');
    return response.data
}

export const findProdutosVendidos = async () => {
    const response = await api.get('/api/v1/regra/getProdutosVendidos');
    return response.data
}

export const findVendasMensal = async () => {
    const response = await api.get('/api/v1/regra/getVendasMensal');
    return response.data
}

export const cadastroRegra = async (regra) => {
    const response = await api.post(`/api/v1/user/cadastroRegra`, regra)
    return response.data
}

export const cadastroFixa = async ({remuneracaoFixa, userId}) => {
    console.log('Dado recebido: ', {remuneracaoFixa, userId});
    const response = await api.put(`/api/v1/regra/put/cadastroFixa/${userId}`, {remuneracaoFixa: remuneracaoFixa});
    return response.data
}

export const chartFunil = async () => {
    const response = await api.get('/api/v1/regra/chartFunil');
    return response.data
}

export const findMonthTime = async () => {
    const response = await api.get('/api/v1/regra/getVendasMensalTime');
    return response.data
}

export const findMonthFunc = async () => {
    const response = await api.get('/api/v1/regra/getVendasMensalFunc');
    return response.data
}