import { NextResponse } from 'next/server';
import { updateRequest, deleteRequest, getRequestById, getRequestByClase } from '../../../../services/requests/ciiuSectorRequest';

export async function GET(req: Request, { params }) {
  const { id } = params;
  try {
    const request = await getRequestById(id);
    return NextResponse.json(request, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error retrieving request' }, { status: 500 });
  }
}
export async function GETByClase(req: Request, { params }) {

  const { id_clase } = params;
  try {
    const requests = await getRequestByClase(id_clase);
    return NextResponse.json(requests, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error retrieving requests by clase' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }) {
  const { id } = params;
  const requestData = await req.json();

  try {
    const updatedRequest = await updateRequest(id, requestData);
    return NextResponse.json(updatedRequest, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error updating request' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }) {
  const { id } = params;

  try {
    await deleteRequest(id);
    return NextResponse.json({ message: 'Request deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting request' }, { status: 500 });
  }
}