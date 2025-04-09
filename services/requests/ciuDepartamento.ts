import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createRequest = async (data) => {
  return await prisma.ciudadDepartamento_flat.create({
    data,
  });
};

export const getRequests = async () => {
  return await prisma.ciudadDepartamento_flat.findMany({
    orderBy: {
      CodigoMunicipio: 'asc',
    },
  });
};

export const getRequestById = async (id) => {
  return await prisma.ciudadDepartamento_flat.findUnique({
    where: { CodigoMunicipio: Number(id) },
  });
};

export const updateRequest = async (id, data) => {
  return await prisma.ciudadDepartamento_flat.update({
    where: { CodigoMunicipio: Number(id) },
    data,
  });
};

export const deleteRequest = async (id) => {
  return await prisma.ciudadDepartamento_flat.delete({
    where: { CodigoMunicipio: Number(id) },
  });
};

export const getDepartments = async () => {
  return await prisma.ciudadDepartamento_flat.findMany({
    distinct: ['CodigoDepartamento', 'Departamento'],
    select: {
      CodigoDepartamento: true,
      Departamento: true,
    },
    orderBy: {
      Departamento: 'asc',
    },
  });
};

export const getDepartmentsbyId = async (codDepartamento) => {
  return await prisma.ciudadDepartamento_flat.findMany({
    distinct: ['CodigoDepartamento', 'Departamento'],
    where: { CodigoDepartamento: Number(codDepartamento) },
    select: {
      CodigoDepartamento: true,
      Departamento: true,
    },
    orderBy: {
      Departamento: 'asc',
    },
  });
};

export const getMunicipalitiesByDepartment = async (departmentCode) => {
  return await prisma.ciudadDepartamento_flat.findMany({
    where: { CodigoDepartamento: Number(departmentCode) },
    select: {
      CodigoMunicipio: true,
      Municipio: true,
    },
    orderBy: {
      Municipio: 'asc',
    },
  });
};