/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface CreditRequestDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  tab: string;
  setTab: (tab: string) => void;
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleDepartmentChange: (value: string) => void;
  handleCityChange: (value: string) => void;
  handleSave: () => void;
  TamaEmpresa: (clasifEmpresa: string, lastIncome: number) => void;
  documentTypes: any[];
  ciiuOptions: any[];
  sector: string;
  subsector: string;
  departments: any[];
  clasifModelo: string;
  clasifEmpresa: string;
  cities: any[];
  getDocumentTypeName: (prefix: string) => string;
  ciiuSearchTerm: string;
  setCiiuSearchTerm: (term: string) => void;
  filteredCiiuOptions: any[];
}

const CreditRequestDialog: React.FC<CreditRequestDialogProps> = ({
  open,
  setOpen,
  tab,
  setTab,
  formData,
  handleInputChange,
  handleSelectChange,
  handleDepartmentChange,
  handleCityChange,
  handleSave,
  TamaEmpresa,
  documentTypes,
  sector,
  subsector,
  departments,
  clasifModelo,
  clasifEmpresa,
  cities,
  getDocumentTypeName,
}) => {
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const validateFields = () => {
    const newErrors: { [key: string]: boolean } = {};
    const requiredFields = [
      'documentTypePrefix', 
      'documentNumber', 
      'fullName', 
      'ciiu', 
      'department', 
      'city', 
      'agency', 
      'lastIncome', 
      'companySize',
      'legalRepDocumentNumber',
      'legalRepFirstName',
      'legalRepSecondName',
      'legalRepFirstSurname',
      'legalRepSecondSurname'
    ];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = true;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveClick = () => {
    if (validateFields()) {
      handleSave();
    } else {
      alert('Por favor complete todos los campos obligatorios, tanto de cliente como representante legal .');
    }
  };
  return(
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className="max-h-screen overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{formData.id ? "Editar Solicitud" : "Nueva Solicitud"}</DialogTitle>
      </DialogHeader>
      <Tabs value={tab} onValueChange={setTab} className="w-full max-w-2xl mx-auto p-4">
        <TabsList className="mb-4 flex justify-center">
          <TabsTrigger value="cliente">Cliente</TabsTrigger>
          <TabsTrigger value="representante">Representante Legal</TabsTrigger>
        </TabsList>
        
        <TabsContent value="cliente">
          <Card>
            <CardContent className="space-y-4 p-4">
              <Label>Fecha</Label>
              <Input 
                type="date" 
                name="date" 
                value={formData.date || new Date().toISOString().split('T')[0]} 
                onChange={handleInputChange} 
                className={errors.date ? 'border-red-500' : ''}
              />
              <Label>Tipo de documento</Label>
              <Select name="documentType" value={formData.documentTypePrefix} onValueChange={(value) => {
                handleSelectChange('documentTypePrefix', value);
              }} required>
                <SelectTrigger>
                  <SelectValue>{getDocumentTypeName(formData.documentTypePrefix)}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.filter(type => type.Prefijo === 'NIT').map(type => (
                    <SelectItem key={type.id} value={type.Prefijo}>{type.Tipo_Documento}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Label>Número de documento</Label>
              <Input type="text" name="documentNumber" value={formData.documentNumber} onChange={handleInputChange} required className={errors.documentNumber ? 'border-red-500' : ''} />
              <Label>Nombre</Label>
              <Input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required className={errors.fullName ? 'border-red-500' : ''} />
              <Label>CIIU Actividad Principal</Label>
              <Input type="number" name="ciiu" value={formData.ciiu == 0 ? "" : formData.ciiu} onChange={handleInputChange} required className={errors.ciiu ? 'border-red-500' : ''} />
              <Label>Sector</Label>
              <Input type="text" name="sector" value={sector} disabled />
              <Label>Subsector</Label>
              <Input type="text" name="subsector" value={subsector} disabled />
              <Label>Departamento del cliente</Label>
              <Select name="department" value={formData.department} onValueChange={(value) => {
                handleDepartmentChange(value);
              }} required>
                <SelectTrigger>
                  <SelectValue>{formData.department ? `${departments.find(dept => dept.CodigoDepartamento === formData.department)?.Departamento}` : "Seleccione Departamento"}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {departments.map(department => (
                    <SelectItem key={department.CodigoDepartamento} value={department.Departamento}>{department.Departamento}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Label>Ciudad del cliente</Label>
              <Select name="city" value={formData.city} onValueChange={(value) => {
                handleCityChange(value);
              }} required>
                <SelectTrigger>
                  <SelectValue>{formData.city ? `${cities.find(city => city.CodigoMunicipio === formData.city)?.Municipio}` : "Seleccione Ciudad"}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {cities.map(city => (
                    <SelectItem key={city.CodigoMunicipio} value={city.Municipio}>{city.Municipio}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Label>Clasificación empresa para modelo</Label>
              <Input type="text" name="companyClassificationModel" value={clasifModelo} onChange={handleInputChange} disabled />
              <Label>Clasificación empresa</Label>
              <Input type="text" name="companyClassification" value={clasifEmpresa} onChange={handleInputChange} disabled />
              <Label>Agencia</Label>
              <Select name="agency" value={formData.agency} onValueChange={(value) => {
                handleSelectChange('agency', value);
              }} required>
                <SelectTrigger>
                  <SelectValue>{formData.agency ? formData.agency : "Seleccione Agencia"}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map(number => (
                    <SelectItem key={number} value={number.toString()}>{number}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Label>Ingresos Ultimo cierre (En Miles)</Label>
              <Input 
                type="number" 
                name="lastIncome" 
                value={formData.lastIncome == 0 ? "" : formData.lastIncome} 
                onChange={async (e) => {
                  await handleInputChange(e);
                  await TamaEmpresa(clasifEmpresa ? clasifEmpresa.toString() : "", parseInt(e.target.value ? e.target.value : "0"));
                }} 
                required
                className={errors.lastIncome ? 'border-red-500' : ''}
              />
              <Label>Tamaño Empresa</Label>
              <Input type="text" name="companySize" value={formData.companySize} onChange={handleInputChange} required className={errors.companySize ? 'border-red-500' : ''} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="representante">
          <Card>
            <CardContent className="space-y-4 p-4">
              <Label>Tipo de documento</Label>
              <Select name="legalRepDocumentType" value={formData.legalRepDocumentTypePrefix} onValueChange={(value) => {
                handleSelectChange('legalRepDocumentTypePrefix', value);
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
              <Input 
                type="text" 
                name="legalRepDocumentNumber" 
                value={formData.legalRepDocumentNumber}  
                onChange={handleInputChange} 
                required 
                className={errors.legalRepDocumentNumber ? 'border-red-500' : ''} 
              />
              <Label>Primer Nombre</Label>
              <Input type="text" name="legalRepFirstName" value={formData.legalRepFirstName} onChange={handleInputChange} required className={errors.legalRepFirstName ? 'border-red-500' : ''} />
              <Label>Segundo Nombre</Label>
              <Input type="text" name="legalRepSecondName" value={formData.legalRepSecondName} onChange={handleInputChange}  />
              <Label>Primer Apellido</Label>
              <Input type="text" name="legalRepFirstSurname" value={formData.legalRepFirstSurname} onChange={handleInputChange} required className={errors.legalRepFirstSurname ? 'border-red-500' : ''}/>
              <Label>Segundo Apellido</Label>
              <Input type="text" name="legalRepSecondSurname" value={formData.legalRepSecondSurname} onChange={handleInputChange} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <DialogFooter>
        <Button onClick={handleSaveClick}>{formData.id ? "Actualizar" : "Guardar"}</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)};

export default React.memo(CreditRequestDialog);