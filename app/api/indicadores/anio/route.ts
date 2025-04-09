import { NextResponse } from 'next/server';
import { createRequest, getRequests, getRequestById, getDatosbyAnio } from '../../../../services/requests/balances';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const Anio = searchParams.get('Anio');
  if (id) {
    try {
      const request = await getRequestById(id);
      return NextResponse.json(request, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error retrieving request by id' }, { status: 500 });
    }
  } else if (Anio) {
    try {
      const requests = await getDatosbyAnio(Anio);
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