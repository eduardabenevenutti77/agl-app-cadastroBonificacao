import api from './api';

export const createUser = async (user) => {
  const response = await api.post('/api/v1/user/cadastro', user);
  return response.data;
};

export const login = async (email, senha) => {
  const body = { email, senha };
  const response = await api.post('/api/v1/user/login', body, {
      headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const findUsers = async () => {
  const response = await api.get('/api/v1/user/findUsers');
  return response.data;
};