import api from './api';

export const findFunil = async () => {
    const response = await api.get('/api/v1/regra/getFunil')
    return response.data
}

export const findFase = async () => {
    const response = await api.get('/api/v1/getFase');
    return response.data
}

export const findTime = async () => {
    const response = await api.get('/api/v1/getTime');
    return response.data
}

export const findFuncionario = async () => {
    const response = await api.get('/api/v1/getFuncionario');
    return response.data
}