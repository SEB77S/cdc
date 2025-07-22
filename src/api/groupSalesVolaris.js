import api from './axiosConfig';

export const getGroupsVolaris = () => api.get('/volaris/get_all_volaris_groups');
export const getGroupsDatesVolaris = (id) => api.get(`/volaris/get_all_volaris_groups_dates?group_id=${id}`);
export const postCreateGroupsVolaris = (form) => api.post(`/volaris/create_volaris_group`, form, { headers: { 'Content-Type': 'multipart/form-data' } });
export const getIncompleteGroupsDatesVolaris = () => api.get(`/volaris/get_all_incomplete_volaris_groups`);
export const getPassengersByDK = (dk) => api.get(`/volaris/get_passengers_by_dk?customer_dk=${dk}`);
export const updatePassengerPhoto = (passenger) => api.put(`/volaris/update_passenger_photos`, passenger, { headers: { 'Content-Type': 'multipart/form-data' } });
