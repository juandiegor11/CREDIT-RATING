
export const getInsolvencia = async () => {
    const response = await fetch('/api/insolvencia');
    return response.json();
  }
  
  export const createInsolvencia = async (data) => {
    const response = await fetch('/api/insolvencia', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
    return response.json();
  };

  export const getInsolvenciabyAnio = async (codAnio) => {
    const response = await fetch(`/api/insolvencia/anio?Anio=${codAnio}`);
    return response.json();
  }
  

  export const getInsolvenciaById = async (id) => {
    const response = await fetch(`/api/insolvencia/${id}`);
    return response.json();
  };
  
  export const updateInsolvencia = async (id, data) => {
    const response = await fetch(`/api/insolvencia/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
    return response.json();
  };
  
  export const deleteInsolvencia = async (id) => {
    await fetch(`/api/insolvencia/${id}`, {
      method: 'DELETE',
    });
  };
  