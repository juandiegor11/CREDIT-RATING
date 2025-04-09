import { NextResponse } from 'next/server';
import { consultaIndicadoresCliente } from '@/services/requests/procedure';

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params; // Asegúrate de usar `await` para resolver `params`
    const requests = await consultaIndicadoresCliente(id);
    return NextResponse.json(requests, { status: 200 });
  } catch (error) {
    console.error('Error retrieving requests:', error);
    return NextResponse.json({ error: 'Error retrieving requests' }, { status: 500 });
  }
}