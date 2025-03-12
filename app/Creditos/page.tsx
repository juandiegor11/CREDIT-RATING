'use client'
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { getDocumentTypes } from '@/services/api';
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { createCreditRequest, updateCreditRequest, deleteCreditRequest, getCreditRequests } from '@/services/api';

export default function CreditRequests() {
    
  const [requests, setRequests] = useState([]);
  const [tab, setTab] = useState("cliente");
  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    documentTypePrefix: "",
    documentNumber: "",
    requestedAmount: "",
    ciiu: "",
    sector: "",
    subsector: "",
    department: "",
    city: "",
    companyClassificationModel: "",
    companyClassification: "",
    agency: "",
    lastIncome: "",
    companySize: "",
    legalRepDocumentTypePrefix: "",
    legalRepDocumentNumber: "",
    legalRepFirstName: "",
    legalRepSecondName: "",
    legalRepFirstSurname: "",
    legalRepSecondSurname: ""
  });

  const [documentTypes, setDocumentTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const types = await getDocumentTypes();
      setDocumentTypes(types);
      const requestsData = await getCreditRequests();
      setRequests(requestsData);
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, prefix) => {
    setFormData({ ...formData, [`${name}Prefix`]: prefix });
  };

  const handleSave = async () => {
    if (editingIndex !== null) {
      await updateCreditRequest(requests[editingIndex].id, formData);
      const updatedRequests = [...requests];
      updatedRequests[editingIndex] = formData;
      setRequests(updatedRequests);
      setEditingIndex(null);
    } else {
      const newRequest = await createCreditRequest(formData);
      setRequests([...requests, newRequest]);
    }
    resetForm();
    setOpen(false);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData(requests[index]);
    setOpen(true);
  };

  const handleDelete = async (index) => {
    await deleteCreditRequest(requests[index].id);
    setRequests(requests.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setFormData({ 
      fullName: "", 
      documentTypePrefix: "",
      documentNumber: "", 
      requestedAmount: "",
      ciiu: "",
      sector: "",
      subsector: "",
      department: "",
      city: "",
      companyClassificationModel: "",
      companyClassification: "",
      agency: "",
      lastIncome: "",
      companySize: "",
      legalRepDocumentTypePrefix: "",
      legalRepDocumentNumber: "",
      legalRepFirstName: "",
      legalRepSecondName: "",
      legalRepFirstSurname: "",
      legalRepSecondSurname: ""
    });
  };

  const getDocumentTypeName = (prefix) => {
    const type = documentTypes.find(type => type.Prefijo === prefix);
    return type ? type.Tipo_Documento : "Seleccione tipo";
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
        <DialogContent className="max-h-screen overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingIndex !== null ? "Editar Solicitud" : "Nueva Solicitud"}</DialogTitle>
          </DialogHeader>
          <Tabs value={tab} onValueChange={setTab} className="w-full max-w-2xl mx-auto p-4">
            <TabsList className="mb-4 flex justify-center">
              <TabsTrigger value="cliente">Cliente</TabsTrigger>
              <TabsTrigger value="representante">Representante Legal</TabsTrigger>
            </TabsList>
            
            <TabsContent value="cliente">
              <Card>
                <CardContent className="space-y-4 p-4">
                  <Label>Tipo de documento</Label>
                  <Select name="documentType" value={formData.documentTypePrefix} onValueChange={(value) => {
                    handleSelectChange('documentType', value);
                  }}>
                    <SelectTrigger>
                      <SelectValue>{getDocumentTypeName(formData.documentTypePrefix)}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.map(type => (
                        <SelectItem key={type.id} value={type.Prefijo}>{type.Tipo_Documento}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Label>Número de documento</Label>
                  <Input type="text" name="documentNumber" value={formData.documentNumber} onChange={handleInputChange} />
                  
                  <Label>Nombre</Label>
                  <Input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} />
                  
                  <Label>CIIU Actividad Principal</Label>
                  <Input type="text" name="ciiu" value={formData.ciiu} onChange={handleInputChange} />
                  
                  <Label>Sector</Label>
                  <Input type="text" name="sector" value={formData.sector} onChange={handleInputChange} />
                  
                  <Label>Subsector</Label>
                  <Input type="text" name="subsector" value={formData.subsector} onChange={handleInputChange} />
                  
                  <Label>Departamento del cliente</Label>
                  <Input type="text" name="department" value={formData.department} onChange={handleInputChange} />
                  
                  <Label>Ciudad del cliente</Label>
                  <Input type="text" name="city" value={formData.city} onChange={handleInputChange} />
                  
                  <Label>Clasificación empresa para Modelo de Default</Label>
                  <Input type="text" name="companyClassificationModel" value={formData.companyClassificationModel} onChange={handleInputChange} />
                  
                  <Label>Clasificación empresa</Label>
                  <Input type="text" name="companyClassification" value={formData.companyClassification} onChange={handleInputChange} />
                  
                  <Label>Agencia</Label>
                  <Input type="text" name="agency" value={formData.agency} onChange={handleInputChange} />
                  
                  <Label>Ingresos Ultimo cierre (En Miles)</Label>
                  <Input type="number" name="lastIncome" value={formData.lastIncome} onChange={handleInputChange} />
                  
                  <Label>Tamaño Empresa</Label>
                  <Input type="text" name="companySize" value={formData.companySize} onChange={handleInputChange} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="representante">
              <Card>
                <CardContent className="space-y-4 p-4">
                  <Label>Tipo de documento</Label>
                  <Select name="legalRepDocumentType" value={formData.legalRepDocumentTypePrefix} onValueChange={(value) => {
                    handleSelectChange('legalRepDocumentType', value);
                  }}>
                    <SelectTrigger>
                      <SelectValue>{getDocumentTypeName(formData.legalRepDocumentTypePrefix)}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.map(type => (
                        <SelectItem key={type.id} value={type.Prefijo}>{type.Tipo_Documento}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Label>Número de documento</Label>
                  <Input type="text" name="legalRepDocumentNumber" value={formData.legalRepDocumentNumber} onChange={handleInputChange} />
                  
                  <Label>Primer Nombre</Label>
                  <Input type="text" name="legalRepFirstName" value={formData.legalRepFirstName} onChange={handleInputChange} />
                  
                  <Label>Segundo Nombre</Label>
                  <Input type="text" name="legalRepSecondName" value={formData.legalRepSecondName} onChange={handleInputChange} />
                  
                  <Label>Primer Apellido</Label>
                  <Input type="text" name="legalRepFirstSurname" value={formData.legalRepFirstSurname} onChange={handleInputChange} />
                  
                  <Label>Segundo Apellido</Label>
                  <Input type="text" name="legalRepSecondSurname" value={formData.legalRepSecondSurname} onChange={handleInputChange} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button onClick={handleSave}>{editingIndex !== null ? "Actualizar" : "Guardar"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}