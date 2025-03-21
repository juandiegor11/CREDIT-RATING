import { NextResponse } from 'next/server';
import { deleteBalanceByClient } from '../../../../../services/requests/balances';


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