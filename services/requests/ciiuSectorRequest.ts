import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createRequest = async (data) => {
  return await prisma.cIIU_Sector_Subsector.create({
    data,
  });
};

export const getRequests = async () => {
  return await prisma.cIIU_Sector_Subsector.findMany({
    orderBy: {
      id_sector: 'asc',
    },
  });
};

export const getRequestById = async (id) => {
  return await prisma.cIIU_Sector_Subsector.findUnique({
    where: { id_sector: Number(id) },
  });
};

export const getRequestByClase = async (id) => {
    return await prisma.cIIU_Sector_Subsector.findMany({
        where: { id_ciiu_clase: Number(id) },
    });
};


export const updateRequest = async (id, data) => {
  return await prisma.cIIU_Sector_Subsector.update({
    where: { id_sector: Number(id) },
    data,
  });
};

export const deleteRequest = async (id) => {
  return await prisma.cIIU_Sector_Subsector.delete({
    where: { id_sector: Number(id) },
  });
};