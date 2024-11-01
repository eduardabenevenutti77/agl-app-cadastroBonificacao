import api from './api';

export const createUser = async (user) => {
  const response = await api.post('/api/v1/user/cadastro', user);
  return response.data;
};

export const loginUser = async (email, senha) => {
  const body = { email, senha };
  const response = await api.post('/api/v1/user/loginUser', body, {
      headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const findUser = async () => {
  const response = await api.get('/api/v1/user/get/findUser');
  return response.data;
};
export const blockUser = async (id) => {
  const response = await api.put(`api/v1/user/${id}/block`)
  return response
}
export const unblock = async (id) => {
  const response = await api.put(`api/v1/user/${id}/unblock`)
  return response.data
}