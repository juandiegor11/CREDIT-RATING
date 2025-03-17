import { NextResponse } from 'next/server';
import { getDepartments } from '../../../../services/requests/ciuDepartamento';

export async function GET() {
  try {
    const requests = await getDepartments();
    return NextResponse.json(requests, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error retrieving requests' }, { status: 500 });
  }
}
