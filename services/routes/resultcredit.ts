
export const getResultCredit = async () => {
    const response = await fetch('/api/resultcredit');
    return response.json();
  }
  
  export const createResultCredit = async (data) => {
    const response = await fetch('/api/resultcredit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
    return response.json();
  };

  export const getResultCreditbyAnio = async (codAnio) => {
    const response = await fetch(`/api/resultcredit/anio?Anio=${codAnio}`);
    return response.json();
  }
  

  export const getResultCreditById = async (id) => {
    const response = await fetch(`/api/resultcredit/${id}`);
    return response.json();
  };
  
  export const updateResultCredit = async (id, data) => {
    const response = await fetch(`/api/resultcredit/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
    return response.json();
  };
  
  export const deleteResultCredit = async (id) => {
    await fetch(`/api/resultcredit/${id}`, {
      method: 'DELETE',
    });
  };
  