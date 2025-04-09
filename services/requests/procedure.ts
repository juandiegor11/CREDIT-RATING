import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const consultaIndicadoresCliente = async(Nit) =>{
  try {
    const result = await prisma.$queryRawUnsafe(
      `CALL ObtenerIndicadoresPorCliente(?)`,
      Nit
    );
    return JSON.stringify({ status: 'success', data: result });
  } catch (error) {
    console.error('Error ejecutando el procedimiento:', error);
    return JSON.stringify({ status: 'error', error: 'Error ejecutando el procedimiento' });
  } finally {
    await prisma.$disconnect();
  }
}