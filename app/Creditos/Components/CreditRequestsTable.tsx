import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FaBalanceScale, FaEdit  } from 'react-icons/fa'; 
import { FaDeleteLeft } from "react-icons/fa6";


interface CreditRequestsTableProps {
  requests: any[];
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
}) => (
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
          <TableCell>{request.lastIncome}</TableCell>
          <TableCell>
            <Button onClick={() => onEdit(index)} variant="outline" className="mr-2">
              <FaEdit /> {/* Icono de edición */}
            </Button>
            <Button onClick={() => onDelete(index)} variant="destructive">
              <FaDeleteLeft  /> {/* Icono de edición */}
            </Button>
            <Button onClick={() => onViewEstadoResultados(request.id)} variant="ghost">
              <FaBalanceScale /> {/* Icono de balance */}
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default React.memo(CreditRequestsTable);