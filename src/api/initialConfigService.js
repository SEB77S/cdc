import api from './axiosConfig';

export const getToken = (user) => api.post('/api/login', user);

