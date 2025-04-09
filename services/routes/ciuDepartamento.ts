
export const getCiuDepartamento = async () => {
    const response = await fetch('/api/ciuDepartamento');
    return response.json();
  }
  
  export const createCiuDepartamento = async (data) => {
    const response = await fetch('/api/ciuDepartamento', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
    return response.json();
  };

  export const getMunicipalitiesByDepartment = async (departmentCode) => {
    const response = await fetch(`/api/ciuDepartamento/municipio/${departmentCode}`);
    return response.json();
  }
  
  export const getDepartments = async () => {
    const response = await fetch('/api/ciuDepartamento/departamento');  
    return response.json();
  }

  export const getCiuDepartamentoById = async (id) => {
    const response = await fetch(`/api/ciuDepartamento/${id}`);
    return response.json();
  };
  
  export const updateCiuDepartamento = async (id, data) => {
    const response = await fetch(`/api/ciuDepartamento/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
    return response.json();
  };
  
  export const deleteCiuDepartamento = async (id) => {
    await fetch(`/api/ciuDepartamento/${id}`, {
      method: 'DELETE',
    });
  };
  
  export const getCreditRequestById = async (id) => {
    const response = await fetch(`/api/creditRequestss/${id}`);
    return response.json();
  };
  