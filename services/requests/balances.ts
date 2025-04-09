import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface BalanceRecord {
  Cliente_id: number;
  Categoria_id: number | null;
  Categoria: string;
  Anio: number;
  Valor: number;
}

export const createRequest = async (data: any[]) => {
  try {
    const records: BalanceRecord[] = []; // Define el tipo explícito del arreglo

    for (const row of data) {
      for (const value of row.values) {
        records.push({
          Cliente_id: Number(row.Cliente_id), // Asegúrate de que Cliente_id sea un número
          Categoria_id: row.idcategory ? Number(row.idcategory) : null,
          Categoria: row.category,
          Anio: Number(value.year), // Asegúrate de que Anio sea un número
          Valor: Number(value.value), // Asegúrate de que Valor sea un número
        });
      }
    }

    const res = await prisma.balances.createMany({
      data: records,
    });

    return {
      status: 200,
      message: 'Success',
      data: res,
    };

  } catch (error) {
    return {
      status: 500,
      message: 'Error',
      error: error.message,
    };
  }
};

export const getRequests = async () => {
  return await prisma.balances.findMany({
    orderBy: {
      Anio: 'asc',
    },
  });
};

export const getRequestById = async (id) => {
  return await prisma.balances.findUnique({
    where: { id: Number(id) },
  });
};

export const updateRequest = async (id, data) => {
  return await prisma.balances.update({
    where: { id: Number(id) },
    data,
  });
};

export const deleteRequest = async (id) => {
  return await prisma.balances.delete({
    where: { id: Number(id) },
  });
};

export const getDatosby = async () => {
  return await prisma.balances.findMany({
    select: {
      Valor: true,
      Anio: true,
    }
  });
};

export const getDatosbyAnio = async (codAnio) => {
  return await prisma.balances.findMany({
    where: { Anio: codAnio },
    orderBy: {
      id: 'asc',
    },
  });
};

export const deleteBalanceByClient= async (id) => {
  return await prisma.balances.deleteMany({
    where: { Cliente_id : Number(id) },
  });
};

export const getBalancesByClient = async (id) => {
  return await prisma.balances.findMany({
    where: { Cliente_id : Number(id) },
    orderBy: {
      Categoria_id: 'asc',
    },
  });
}