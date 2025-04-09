export const getCiiuSector = async () => {
  const response = await fetch('/api/ciiuSector');
  return response.json();
}

export const createCiiuSector = async (data) => {
  const response = await fetch('/api/ciiuSector', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const getCiiuSectorById = async (id) => {
  const response = await fetch(`/api/ciiuSector/${id}`);
  return response.json();
};

export const getCiiuSectorByClase = async (id_clase) => {
  const response = await fetch(`/api/ciiuSector?id_clase=${id_clase}`);
  return response.json();
}

export const updateCiiuSector = async (id, data) => {
  const response = await fetch(`/api/ciiuSector/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const deleteCiiuSector = async (id) => {
  await fetch(`/api/ciiuSector/${id}`, {
    method: 'DELETE',
  });
};

export const getCreditRequestById = async (id) => {
  const response = await fetch(`/api/creditRequestss/${id}`);
  return response.json();
};