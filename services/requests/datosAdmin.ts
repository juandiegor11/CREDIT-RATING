import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createRequest = async (data) => {
  return await prisma.datosAdministrador.create({
    data,
  });
};

export const getRequests = async () => {
  return await prisma.datosAdministrador.findMany({
    orderBy: {
      Anio: 'asc',
    },
  });
};

export const getRequestById = async (id) => {
  return await prisma.datosAdministrador.findUnique({
    where: { Id: Number(id) },
  });
};

export const updateRequest = async (id, data) => {
  return await prisma.datosAdministrador.update({
    where: { Id: Number(id) },
    data,
  });
};

export const deleteRequest = async (id) => {
  return await prisma.datosAdministrador.delete({
    where: { Id: Number(id) },
  });
};

export const getDatosby = async () => {
  return await prisma.datosAdministrador.findMany({
    //distinct: ['CodigoDepartamento', 'Departamento'],
    select: {
      Valor: true,
      Anio: true,
    }
  });
};

export const getDatosbyAnio = async (codAnio) => {
  return await prisma.datosAdministrador.findMany({
    //distinct: ['CodigoDepartamento', 'Departamento'],
    where: { Anio: codAnio },
    orderBy: {
      Id: 'asc',
    },
  });
};
