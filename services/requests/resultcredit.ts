import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createRequest = async (data) => {
  return await prisma.resultados_Creditos.create({
    data,
  });
};

export const getRequests = async () => {
  return await prisma.resultados_Creditos.findMany({
    orderBy: {
      Cliente_Id: 'asc',
    },
  });
};

export const getRequestById = async (id) => {
  return await prisma.resultados_Creditos.findUnique({
    where: { id: Number(id) },
  });
};

export const updateRequest = async (id, data) => {
  return await prisma.resultados_Creditos.update({
    where: { id: Number(id) },
    data,
  });
};

export const deleteRequest = async (id) => {
  return await prisma.resultados_Creditos.delete({
    where: { id: Number(id) },
  });
};


