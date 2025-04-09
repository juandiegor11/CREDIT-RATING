
export const getDatosAdmin = async () => {
    const response = await fetch('/api/datosAdmin');
    return response.json();
  }
  
  export const createDatosAdmin = async (data) => {
    const response = await fetch('/api/datosAdmin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
    return response.json();
  };

  export const getDatosAdminbyAnio = async (codAnio) => {
    const response = await fetch(`/api/datosAdmin/anio?Anio=${codAnio}`);
    return response.json();
  }
  

  export const getDatosAdminById = async (id) => {
    const response = await fetch(`/api/datosAdmin/${id}`);
    return response.json();
  };
  
  export const updateDatosAdmin = async (id, data) => {
    const response = await fetch(`/api/datosAdmin/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
    return response.json();
  };
  
  export const deleteDatosAdmin = async (id) => {
    await fetch(`/api/datosAdmin/${id}`, {
      method: 'DELETE',
    });
  };
  