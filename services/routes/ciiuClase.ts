
export const getCiiuClases = async () => {
    const response = await fetch('/api/ciiuClase');
    return response.json();
  }
  
  export const createCiiuClase = async (data) => {
    const response = await fetch('/api/ciiuClase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
    return response.json();
  };
  
  export const getCiiuClaseById = async (id) => {
    const response = await fetch(`/api/ciiuClase/${id}`);
    return response.json();
  };
  
  export const updateCiiuClase = async (id, data) => {
    const response = await fetch(`/api/ciiuClase/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
    return response.json();
  };
  
  export const deleteCiiuClase = async (id) => {
    await fetch(`/api/ciiuClase/${id}`, {
      method: 'DELETE',
    });
  };
  
  export const getCreditRequestById = async (id) => {
    const response = await fetch(`/api/creditRequestss/${id}`);
    return response.json();
  };
  