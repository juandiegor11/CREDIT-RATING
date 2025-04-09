import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createRequest = async (data) => {
  return await prisma.lEY_DE_INSOLVENCIA.createMany({
    data: data.map((item) => ({
      NIT: item.NIT,
      NOMBRE: item.NOMBRE? String(item.NOMBRE) : null, // Convertir a String o asignar null
      REGIONAL: item.REGIONAL? String(item.REGIONAL) : null, // Convertir a String o asignar null
      DEPARTAMENTO: item.DEPARTAMENTO? String(item.DEPARTAMENTO) : null, // Convertir a String o asignar null
      CIUDAD: item.CIUDAD? String(item.CIUDAD) : null, // Convertir a String o asignar null
      CIIU: item.CIIU ? String(item.CIIU) : null, // Convertir a String o asignar null
      MACROSECTOR: item.MACROSECTOR? String(item.MACROSECTOR) : null, // Convertir a String o asignar null
      PROCESO: item.PROCESO? String(item.PROCESO) : null, // Convertir a String o asignar null
    })),
  });
};

export const getRequests = async () => {
  return await prisma.lEY_DE_INSOLVENCIA.findMany({
    orderBy: {
      NIT: 'asc',
    },
  });
};

export const getRequestById = async (id) => {
  return await prisma.lEY_DE_INSOLVENCIA.findUnique({
    where: { Id: Number(id) },
  });
};

export const updateRequest = async (id, data) => {
  return await prisma.lEY_DE_INSOLVENCIA.update({
    where: { Id: Number(id) },
    data,
  });
};

export const deleteRequest = async (id) => {
  return await prisma.lEY_DE_INSOLVENCIA.delete({
    where: { Id: Number(id) },
  });
};




