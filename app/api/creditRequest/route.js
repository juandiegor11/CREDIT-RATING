import prisma from '@/lib/prismaClient';

export async function GET(req) {
  try {
    const creditRequests = await prisma.CreditRequest.findMany();
    return new Response(JSON.stringify(creditRequests), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching credit requests' }), { status: 500 });
  }
}