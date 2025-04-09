import { NextResponse } from 'next/server';
import { handler, deleteRequest } from '../../../../services/requests/prodCupo';

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params; // Usa `await` para resolver `params` como un Promise
    const requests = await handler(String(id));
    return NextResponse.json(requests, { status: 200 });
  } catch (error) {
    console.error('Error retrieving requests:', error);
    return NextResponse.json({ error: 'Error retrieving requests' }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params; // Usa `await` para resolver `params` como un Promise
    const requests = await deleteRequest(String(id));
    return NextResponse.json(requests, { status: 200 });
  } catch (error) {
    console.error('Error deleting request:', error);
    return NextResponse.json({ error: 'Error deleting request' }, { status: 500 });
  }
}