import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createRequest = async (data) => {
  return await prisma.cIIU_Clase.create({
    data,
  });
};

export const getRequests = async () => {
  return await prisma.cIIU_Clase.findMany({
    orderBy: {
      id_clase: 'asc',
    },
  });
};

export const getRequestById = async (id) => {
  return await prisma.cIIU_Clase.findUnique({
    where: { id_clase: Number(id) },
  });
};

export const updateRequest = async (id, data) => {
  return await prisma.cIIU_Clase.update({
    where: { id_clase: Number(id) },
    data,
  });
};

export const deleteRequest = async (id) => {
  return await prisma.cIIU_Clase.delete({
    where: { id_clase: Number(id) },
  });
};