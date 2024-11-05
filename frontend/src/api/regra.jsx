import api from './api';

export const findFunil = async () => {
    const response = await api.get('/api/v1/regra/getFunil')
    return response.data
}

export const findFase = async () => {
    const response = await api.get('/api/v1/regra/getFase');
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