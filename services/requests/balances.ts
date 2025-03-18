import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createRequest = async (data) => {
  try {
    const records = [];

    for (const row of data) {
      const category = await prisma.categorias_Balances.findFirst({
        where: { nombre: row.category },
      });

      for (const value of row.values) {
        records.push({
          Cliente_id: Number(row.Cliente_id), // Asegúrate de que Cliente_id sea un número
          Categoria_id: category ? category.id : null,
          Categoria: row.category,
          Anio: value.year,
          Valor: value.value,
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
