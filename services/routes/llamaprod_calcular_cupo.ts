
export const getProdCupo = async (ClientId) => {
    const response = await fetch( `/api/prodCupo/${ClientId}`);
    return response.json();
}
export const deleteCupo = async (ClientId) => {
    const response = await fetch( `/api/prodCupo/${ClientId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return response.json();
}