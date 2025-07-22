import api from './axiosConfig';

export const loginApi = async () => {
  const session = await api.get('/api/session');
  return session.data;
};