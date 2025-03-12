import axios from 'axios';

export const getDocumentTypes = async () => {
  const response = await axios.get('/api/document-types');
  return response.data;
};

export const getCreditRequests = async () => {
  const response = await axios.get('/api/creditRequests');
  return response.data;
};

export const createCreditRequest = async (data) => {
  const response = await axios.post('/api/creditRequests', data);
  return response.data;
};

export const updateCreditRequest = async (id, data) => {
  const response = await axios.put(`/api/creditRequests/${id}`, data);
  return response.data;
};

export const deleteCreditRequest = async (id) => {
  await axios.delete(`/api/creditRequests/${id}`);
};



// Puedes agregar más funciones para obtener otros datos necesarios