import { NextResponse } from 'next/server';
import { deleteBalanceByClient, getBalancesByClient } from '@/services/requests/indicadores';
import { getRequestByNit } from '@/services/requests/creditRequest';

export async function DELETE(req: Request, { params }) {
  const { id } = params;

  try {
    await deleteBalanceByClient(id);
    return NextResponse.json({ message: 'Request deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ 
        error: 'Error deleting request', 
        message: error.message
    }, { status: 500 });
  }
}

export async function GET(req: Request, { params }) {
  const { id } = params;

  try {
    const Cliente = await getRequestByNit(String(id));
    const ClientId = Cliente ? Cliente[0].id : null;
    console.log(ClientId);
    if (!ClientId) return NextResponse.json({ error: 'Client not found' }, { status: 404 });

    const res = await getBalancesByClient(ClientId);
    if (res.length === 0) {
      return NextResponse.json({ message: 'No data found' }, { status: 404 });
    }
    const data = res.map((item) => ({
      ClienteId: item.ClienteId,
      CategoriaId: item.CategoriaId,
      Categoria: item.Categoria,
      Anio: item.Anio,
      Valor: item.Valor
    }));
    const resultado = Object.values(
      data.reduce((acc, item) => {
        const key = `${item.ClienteId}-${item.Categoria}`;
        if (!acc[key]) {
          acc[key] = {
            ClienteId: item.ClienteId,
            Categoria: item.Categoria,
            CategoriaId: item.CategoriaId
          };
        }

        // Manejo del caso en que item.Valor sea null
        acc[key][item.Anio] = parseFloat(item.Valor !== null ? item.Valor.toString() : "0");
        return acc;
      }, {})
    );
    return NextResponse.json(resultado, { status: 200 });
  } catch (error) {
    return NextResponse.json({ 
        error: 'Error fetching request', 
        message: error.message
    }, { status: 500 });
  }
}