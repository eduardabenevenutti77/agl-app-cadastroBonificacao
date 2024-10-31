import api from './api';

export const findFunil = async () => {
    const response = await api.get('/api/v1/regra/getFunil')
    return response.data
}