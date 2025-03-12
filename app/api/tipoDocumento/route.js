import prisma from '@/lib/prismaClient';

export async function GET(req) {
  try {
    const documentTypes = await prisma.tipo_Documento.findMany();
    return new Response(JSON.stringify(documentTypes), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching document types' }), { status: 500 });
  }
}