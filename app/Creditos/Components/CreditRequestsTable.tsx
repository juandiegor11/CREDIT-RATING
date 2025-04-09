import React, { useCallback, useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FaBalanceScale, FaEdit } from 'react-icons/fa';
import { FaDeleteLeft } from "react-icons/fa6";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

interface CreditRequestsTableProps {
  requests: {
    fullName: string;
    documentTypePrefix: string;
    documentNumber: string;
    lastIncome: number;
    id: number;
    Balance: number;
  }[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => Promise<void>;
  getDocumentTypeName: (prefix: string) => string;
  onViewEstadoResultados: (id: number) => void;
}

const CreditRequestsTable: React.FC<CreditRequestsTableProps> = ({
  requests,
  onEdit,
  onDelete,
  getDocumentTypeName,
  onViewEstadoResultados
}) => {
  const [open, setOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const handleDelete = useCallback((index: number) => {
    setDeleteIndex(index);
    setOpen(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (deleteIndex !== null && requests[deleteIndex]) {
      await onDelete(deleteIndex);
      setOpen(false);
      setDeleteIndex(null);
    }
  }, [deleteIndex, onDelete, requests]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(value);
  };

  return (
    <>
      <Alert open={open} setOpen={setOpen} onConfirm={confirmDelete} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre Completo</TableHead>
            <TableHead>Tipo Documento</TableHead>
            <TableHead>Número Documento</TableHead>
            <TableHead>Ingresos Último Cierre</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request, index) => (
            <TableRow key={index}>
              <TableCell>{request.fullName}</TableCell>
              <TableCell>{getDocumentTypeName(request.documentTypePrefix)}</TableCell>
              <TableCell>{request.documentNumber}</TableCell>
              <TableCell>{formatCurrency(request.lastIncome)}</TableCell>
              <TableCell>
                <Button onClick={() => onEdit(index)} variant="outline" className="mr-2">
                  <FaEdit /> {/* Icono de edición */}
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(index)}>
                  <FaDeleteLeft  /> 
                </Button>
                <Button
                  onClick={() => onViewEstadoResultados(request.id)}
                  variant="ghost"
                  disabled={request.Balance === 1}
                >
                  <FaBalanceScale /> {/* Icono de balance */}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

interface AlertProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
}

const Alert: React.FC<AlertProps> = ({ open, setOpen, onConfirm }) => (
  <AlertDialog open={open} onOpenChange={setOpen}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Eliminar Solicitud</AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogDescription>
        Estas seguro de eliminar este elemento?
      </AlertDialogDescription>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={() => setOpen(false)}>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={onConfirm}>Eliminar</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default React.memo(CreditRequestsTable);