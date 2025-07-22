import api from './axiosConfig';

export const postDataXML = (xml) => api.post('/admin_crm/upload_csv', xml);

