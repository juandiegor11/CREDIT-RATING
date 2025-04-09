import { NextResponse } from 'next/server';
import { createRequest, getRequests } from '../../../services/requests/creditRequest';

export async function GET() {
  try {
    const requests = await getRequests();
    return NextResponse.json(requests, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error retrieving requests' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const requestData = await req.json();
    const newRequest = await createRequest(requestData);
    return NextResponse.json(newRequest, { status: 201 });
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({ error: 'Error creating request' }, { status: 500 });
  }
}