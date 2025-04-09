
export const getIndicadoresCliente = async (Nit) => {
    const response = await fetch( `/api/consultar/indicadores/${Nit}`);
    return response.json();
}