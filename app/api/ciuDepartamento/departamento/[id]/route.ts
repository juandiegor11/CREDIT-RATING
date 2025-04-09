import { NextResponse } from 'next/server';
import {  getDepartmentsbyId } from '../../../../../services/requests/ciuDepartamento';

export async function GET(req: Request, { params }) {
  const { id } = params;

  try {
    const request = await getDepartmentsbyId(id);
    if (!request) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }
    return NextResponse.json(request, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error retrieving request' }, { status: 500 });
  }
}
