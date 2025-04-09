
export const getIndicadores = async () => {
    const response = await fetch('/api/indicadores');
    return response.json();
  }
  
  export const createIndicadores = async (data) => {
    const response = await fetch('/api/indicadores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
    return response.json();
  };

  export const getIndicadoresbyAnio = async (codAnio) => {
    const response = await fetch(`/api/indicadores/anio?Anio=${codAnio}`);
    return response.json();
  }
  

  export const getIndicadoresById = async (id) => {
    const response = await fetch(`/api/indicadores/${id}`);
    return response.json();
  };
  
  export const updateIndicadores = async (id, data) => {
    const response = await fetch(`/api/indicadores/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
    return response.json();
  };
  
  export const deleteIndicadores = async (id) => {
    await fetch(`/api/indicadores/${id}`, {
      method: 'DELETE',
    });
  };

  export const deleteIndicadoresByClient = async(id) =>{
    await fetch(`/api/indicadores/cliente/${id}`, {
      method: 'DELETE',
    });
  }

  export const getIndicadoresByClient = async (id) => {
    const response = await fetch(`/api/indicadores/cliente/${id}`);
    return response.json();
  };
  