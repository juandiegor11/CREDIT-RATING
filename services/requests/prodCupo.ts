import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const handler = async(ClientId) =>{
  try {
    const result = await prisma.$queryRawUnsafe(
      `CALL sp_LlamadoApi_CalcularTodo(?)`,
      ClientId
    );
    return JSON.stringify({ status: 'success', data: result });
  } catch (error) {
    console.error('Error ejecutando el procedimiento:', error);
    return JSON.stringify({ status: 'error', error: 'Error ejecutando el procedimiento' });
  } finally {
    await prisma.$disconnect();
  }
}

export const deleteRequest = async (id) => {
  try {
    const result = await prisma.$queryRawUnsafe(
      `CALL sp_EliminarSolicitud(?)`,
      id
    );
    return JSON.stringify({ status: 'success', data: result });
  }
  catch (error) {
    console.error('Error eliminando el registro:', error);
    throw new Error('Error eliminando el registro');
  }
  finally {
    await prisma.$disconnect();
  }
}
