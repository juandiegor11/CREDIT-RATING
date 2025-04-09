import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface IndicadorRecord {
  ClienteId: number;
  CategoriaId: number | null;
  Categoria: string;
  Anio: number;
  Valor: number;
}

export const createRequest = async (data: any[]) => {
  try {
    const records: IndicadorRecord[] = []; // Define el tipo explícito del arreglo

    for (const row of data) {
      for (const value of row.values) {
        records.push({
          ClienteId: Number(row.Cliente_id), // Asegúrate de que Cliente_id sea un número
          CategoriaId: row.idcategory ? Number(row.idcategory) : null,
          Categoria: row.category,
          Anio: Number(value.year), // Asegúrate de que Anio sea un número
          Valor: Number(value.value), // Asegúrate de que Valor sea un número
        });
      }
    }

    const res = await prisma.indicadores.createMany({
      data: records,
    });

    return {
      status: 200,
      message: 'Success',
      data: res,
    };

  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: 'Error',
      error: error.message,
    };
  }
};

export const getRequests = async () => {
  return await prisma.indicadores.findMany({
    orderBy: {
      Anio: 'asc',
    },
  });
};

export const getRequestById = async (id) => {
  return await prisma.indicadores.findUnique({
    where: { id: Number(id) },
  });
};

export const updateRequest = async (id, data) => {
  return await prisma.indicadores.update({
    where: { id: Number(id) },
    data,
  });
};

export const deleteRequest = async (id) => {
  return await prisma.indicadores.delete({
    where: { id: Number(id) },
  });
};

export const getDatosby = async () => {
  return await prisma.indicadores.findMany({
    select: {
      Valor: true,
      Anio: true,
    }
  });
};

export const getDatosbyAnio = async (codAnio) => {
  return await prisma.indicadores.findMany({
    where: { Anio: codAnio },
    orderBy: {
      id: 'asc',
    },
  });
};

export const deleteBalanceByClient= async (id) => {
  return await prisma.indicadores.deleteMany({
    where: { ClienteId : Number(id) },
  });
};

export const getBalancesByClient = async (id) => {
  return await prisma.indicadores.findMany({
    where: { ClienteId : Number(id) },
    orderBy: {
      CategoriaId: 'asc',
    },
  });
};