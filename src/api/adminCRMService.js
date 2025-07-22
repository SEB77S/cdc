import api from './axiosConfig';

export const getOKR = (startDate, endDate) => api.get(`/admin_crm/generate_okr?start_date=${startDate}&end_date=${endDate}`);

