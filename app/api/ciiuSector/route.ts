import { NextResponse } from 'next/server';
import { createRequest, getRequests, getRequestById, getRequestByClase } from '../../../services/requests/ciiuSectorRequest';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const id_clase = searchParams.get('id_clase');
  if (id) {
    try {
      const request = await getRequestById(id);
      return NextResponse.json(request, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error retrieving request by id' }, { status: 500 });
    }
  } else if (id_clase) {
    try {
      const requests = await getRequestByClase(id_clase);
      return NextResponse.json(requests, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error retrieving requests by clase' }, { status: 500 });
    }
  } else {
    try {
      const requests = await getRequests();
      return NextResponse.json(requests, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error retrieving requests' }, { status: 500 });
    }
  }
}

export async function POST(req: Request) {
  try {
    const requestData = await req.json();
    const newRequest = await createRequest(requestData);
    return NextResponse.json(newRequest, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating request' }, { status: 500 });
  }
}