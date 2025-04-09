import axios from 'axios';

export const getDocumentTypes = async () => {
  const response = await axios.get('/api/document-types');
  return response.data;
};