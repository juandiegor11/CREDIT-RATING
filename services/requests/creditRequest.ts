// filepath: /C:/Users/JuanDiegoRodriguezMa/OneDrive - OSSA Consultoria SAS/Documentos/Desarrollo/trasunion/credit-risk/services/creditRequest.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createRequest = async (data) => {
  return await prisma.creditRequest.create({
    data,
  });
};

export const getRequests = async () => {
  return await prisma.creditRequest.findMany();
};

export const getRequestById = async (id) => {
  return await prisma.creditRequest.findUnique({
    where: { id: Number(id) },
  });
};

export const updateRequest = async (id, data) => {
  return await prisma.creditRequest.update({
    where: { id: Number(id) },
    data,
  });
};

export const deleteRequest = async (id) => {
  return await prisma.creditRequest.delete({
    where: { id: Number(id) },
  });
};