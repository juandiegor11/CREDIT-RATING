export const getCreditRequests = async () => {
    const response = await fetch('/api/creditRequestss');
    return response.json();
  };
  
  export const createCreditRequest = async (data) => {
    const response = await fetch('/api/creditRequestss', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
    return response.json();
  };
  
  export const updateCreditRequest = async (id, data) => {
    const response = await fetch(`/api/creditRequestss/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
    return response.json();
  };
  
  export const deleteCreditRequest = async (id) => {
    await fetch(`/api/creditRequestss/${id}`, {
      method: 'DELETE',
    });
  };