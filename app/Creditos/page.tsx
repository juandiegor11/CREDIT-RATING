'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export default function CreditRequests() {
    
  const [requests, setRequests] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    documentType: "",
    documentNumber: "",
    requestedAmount: "",
  });

  const documentTypes = ["Cédula", "Pasaporte", "Licencia de Conducir", "Tarjeta de Identidad"];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (editingIndex !== null) {
      const updatedRequests = [...requests];
      updatedRequests[editingIndex] = formData;
      setRequests(updatedRequests);
      setEditingIndex(null);
    } else {
      setRequests([...requests, formData]);
    }
    setFormData({ fullName: "", documentType: "", documentNumber: "", requestedAmount: "" });
    setOpen(false);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData(requests[index]);
    setOpen(true);
  };

  const handleDelete = (index) => {
    setRequests(requests.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6">
      <Card>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Solicitudes de Crédito</h2>
            <Button onClick={() => setOpen(true)}>Crear Solicitud</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre Completo</TableHead>
                <TableHead>Tipo Documento</TableHead>
                <TableHead>Número Documento</TableHead>
                <TableHead>Monto Solicitado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request, index) => (
                <TableRow key={index}>
                  <TableCell>{request.fullName}</TableCell>
                  <TableCell>{request.documentType}</TableCell>
                  <TableCell>{request.documentNumber}</TableCell>
                  <TableCell>{request.requestedAmount}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(index)} variant="outline" className="mr-2">Editar</Button>
                    <Button onClick={() => handleDelete(index)} variant="destructive">Eliminar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingIndex !== null ? "Editar Solicitud" : "Nueva Solicitud"}</DialogTitle>
          </DialogHeader>
          <Input placeholder="Nombre Completo" name="fullName" value={formData.fullName} onChange={handleInputChange} className="mb-2" />
          <select name="documentType" value={formData.documentType} onChange={handleInputChange} className="mb-2 w-full p-2 border rounded">
            <option value="">Seleccione Tipo de Documento</option>
            {documentTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
            ))}
          </select>
          <Input placeholder="Número de Documento" name="documentNumber" value={formData.documentNumber} onChange={handleInputChange} className="mb-2" />
          <Input placeholder="Monto Solicitado" name="requestedAmount" value={formData.requestedAmount} onChange={handleInputChange} className="mb-2" />
          <DialogFooter>
            <Button onClick={handleSave}>{editingIndex !== null ? "Actualizar" : "Guardar"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
{/*nit cedula cedulaestranjeria pasaporte 
codigo ciu

--registro info financiaera 
*/}
