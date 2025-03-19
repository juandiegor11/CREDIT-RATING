
export const getBalance = async () => {
    const response = await fetch('/api/balance');
    return response.json();
  }
  
  export const createBalance = async (data) => {
    const response = await fetch('/api/balance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
    return response.json();
  };

  export const getBalancebyAnio = async (codAnio) => {
    const response = await fetch(`/api/balance/anio?Anio=${codAnio}`);
    return response.json();
  }
  

  export const getBalanceById = async (id) => {
    const response = await fetch(`/api/balance/${id}`);
    return response.json();
  };
  
  export const updateBalance = async (id, data) => {
    const response = await fetch(`/api/balance/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
    return response.json();
  };
  
  export const deleteBalance = async (id) => {
    await fetch(`/api/balance/${id}`, {
      method: 'DELETE',
    });
  };

  export const deleteBalanceByClient = async(id) =>{
    await fetch(`/api/balance/cliente/${id}`, {
      method: 'DELETE',
    });
  }
  