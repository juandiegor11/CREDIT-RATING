'use client';
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { getDocumentTypes } from '@/services/routes/documentType';
import { getCiiuClases } from '@/services/routes/ciiuClase';
import { getCiiuSectorByClase } from '@/services/routes/ciiuSector';
import { calcularTamanoEmpresa } from "./services/calcuralTamanoEmpresa";
import { getDepartments, getMunicipalitiesByDepartment, getCiuDepartamentoById } from '@/services/routes/ciuDepartamento';
import { createCreditRequest, updateCreditRequest, deleteCreditRequest, getCreditRequests } from '@/services/routes/creditRequest';
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const CreditRequests = () => {
  const [requests, setRequests] = useState([]);
  const [tab, setTab] = useState("cliente");
  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [sector, setSector] = useState("Servicios");
  const [subsector, setSubsector] = useState("Servicios");
  const [clasifModelo, setClasifModelo] = useState("");
  const [clasifEmpresa, setClasifEmpresa] = useState("");
  const [departments, setDepartments] = useState([]);
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    documentTypePrefix: "",
    documentNumber: "",
    requestedAmount: 0,
    ciiu: 0,
    sector: null,
    subsector: null,
    department: null,
    city: null,
    companyClassificationModel: "",
    companyClassification: "",
    agency: "",
    lastIncome: 0,
    companySize: "",
    legalRepDocumentTypePrefix: "",
    legalRepDocumentNumber: "",
    legalRepFirstName: "",
    legalRepSecondName: "",
    legalRepFirstSurname: "",
    legalRepSecondSurname: ""
  });

  const [documentTypes, setDocumentTypes] = useState([]);
  const [ciiuOptions, setCiiuOptions] = useState([]);
  const [ciiuSearchTerm, setCiiuSearchTerm] = useState("");
  const [filteredCiiuOptions, setFilteredCiiuOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [types, requestsData, ciiuData, departmentsData] = await Promise.all([
        getDocumentTypes(),
        getCreditRequests(),
        getCiiuClases(),
        getDepartments()
      ]);
      setDocumentTypes(types);
      setRequests(requestsData);
      setCiiuOptions(ciiuData);
      setDepartments(departmentsData);
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchSector = async () => {
      if (formData.ciiu) {
        const sectorData = await getCiiuSectorByClase(formData.ciiu);
        if (sectorData.length > 0) {
          setFormData(prevFormData => ({
            ...prevFormData,
            sector: sectorData[0].id_sector
          }));
          setSector(sectorData[0].sector);
          setSubsector(sectorData[0].subsector);

          setClasifModelo( ciiuOptions.find(option => option.id_clase === formData.ciiu).clase2);
          setClasifEmpresa( ciiuOptions.find(option => option.id_clase === formData.ciiu).clase_servicios);

        } else {
          setFormData(prevFormData => ({
            ...prevFormData,
            sector: null
          }));
          setSector("Servicios");
          setSubsector("Servicios");
          setClasifModelo("");
          setClasifEmpresa("");
        }
      }else{
        setFormData(prevFormData => ({
          ...prevFormData,
          sector: 0
        }));
        setSector("Servicios");
        setSubsector("Servicios");
        setClasifModelo("");
        setClasifEmpresa("");
      }

    };

    fetchSector();
  }, [formData.ciiu]);

  useEffect(() => {
    const fetchCity = async () => {
      if (formData.city) {
        const cityData = await getCiuDepartamentoById(formData.city);
        setCities([cityData]);
      }
    };

    fetchCity();
  }, [formData.city]);

  useEffect(() => {
    if (ciiuSearchTerm === "") {
      setFilteredCiiuOptions(ciiuOptions);
    } else {
      setFilteredCiiuOptions(
        ciiuOptions.filter(option =>
          option.descripcion.toLowerCase().includes(ciiuSearchTerm.toLowerCase())
        )
      );
    }
  }, [ciiuSearchTerm, ciiuOptions]);

  const handleInputChange = useCallback(async (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: name === 'requestedAmount' || name === 'lastIncome' || name === 'ciiu' ? parseFloat(value ? value : 0 ) : value
    }));
    /*if (name === 'lastIncome') {
      const companySize = await calcularTamanoEmpresa(clasifEmpresa,parseInt(value));
      debugger;
      setFormData(prevFormData => ({
        ...prevFormData,
        companySize
      }));
    }*/

  }, []);

  const TamaEmpresa = useCallback(async (clasifEmpresa, lastIncome) => {
    debugger;
    const companySize = await calcularTamanoEmpresa(clasifEmpresa,lastIncome);
    setFormData(prevFormData => ({
      ...prevFormData,
      companySize    
    }));
  }
  ,[]);

  const handleSelectChange = useCallback((name, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  }, []);

  const handleDepartmentChange = useCallback(async (value) => {
    const selectedDepartment = departments.find(department => department.Departamento === value);
    setFormData(prevFormData => ({
      ...prevFormData,
      department: selectedDepartment.CodigoDepartamento,
      city: 0 // Reset city when department changes
    }));
    const citiesData = await getMunicipalitiesByDepartment(selectedDepartment.CodigoDepartamento);
    setCities(citiesData);
  }, [departments]);

  const handleCityChange = useCallback((value) => {
    const selectedCity = cities.find(city => city.Municipio === value);
    setFormData(prevFormData => ({
      ...prevFormData,
      city: selectedCity.CodigoMunicipio
    }));
  }, [cities]);

  const handleSave = useCallback(async () => {
    if (editingIndex !== null) {
      await updateCreditRequest(requests[editingIndex].id, JSON.stringify(formData));
      setRequests(prevRequests => {
        const updatedRequests = [...prevRequests];
        updatedRequests[editingIndex] = formData;
        return updatedRequests;
      });
    } else {
      const newRequest = await createCreditRequest(JSON.stringify(formData));
      setRequests(prevRequests => [...prevRequests, newRequest]);
    }
    resetForm();
    setEditingIndex(null);
    setOpen(false);
  }, [editingIndex, formData, requests]);

  const handleEdit = useCallback(async (index) => {
    setEditingIndex(index);
    setFormData(requests[index]);
    const citiesData = await getMunicipalitiesByDepartment(requests[index].department);
    setCities(citiesData);
    setOpen(true);
  }, [requests]);

  const handleDelete = useCallback(async (index) => {
    await deleteCreditRequest(requests[index].id);
    setRequests(prevRequests => prevRequests.filter((_, i) => i !== index));
  }, [requests]);

  const resetForm = useCallback(() => {
    setFormData({
      fullName: "",
      documentTypePrefix: "",
      documentNumber: "",
      requestedAmount: 0,
      ciiu: 0,
      sector: null,
      subsector: null,
      department: null,
      city: null,
      companyClassificationModel: "",
      companyClassification: "",
      agency: "",
      lastIncome: 0,
      companySize: "",
      legalRepDocumentTypePrefix: "",
      legalRepDocumentNumber: "",
      legalRepFirstName: "",
      legalRepSecondName: "",
      legalRepFirstSurname: "",
      legalRepSecondSurname: ""
    });
    setCities([]);
  }, []);

  const getDocumentTypeName = useCallback((prefix) => {
    const type = documentTypes.find(type => type.Prefijo === prefix);
    return type ? type.Tipo_Documento : "Seleccione tipo";
  }, [documentTypes]);

  const getCiiuDescription = useCallback((id) => {
    const ciiu = ciiuOptions.find(option => option.id_clase === id);
    return ciiu ? ciiu.description : "Seleccione CIIU";
  }, [ciiuOptions]);

  const handleNewRequest = useCallback(() => {
    resetForm();
    setEditingIndex(null);
    setOpen(true);
  }, [resetForm]);

  return (
    <div className="p-6">
      <Card>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Solicitudes de Crédito</h2>
            <Button onClick={handleNewRequest}>Crear Solicitud</Button>
          </div>
          <CreditRequestsTable requests={requests} onEdit={handleEdit} onDelete={handleDelete} getDocumentTypeName={getDocumentTypeName} />
        </CardContent>
      </Card>

      <CreditRequestDialog
        open={open}
        setOpen={setOpen}
        tab={tab}
        setTab={setTab}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        handleDepartmentChange={handleDepartmentChange}
        handleCityChange={handleCityChange}
        TamaEmpresa={TamaEmpresa}
        handleSave={handleSave}
        documentTypes={documentTypes}
        ciiuOptions={ciiuOptions}
        sector={sector}
        subsector={subsector}
        clasifModelo={clasifModelo}
        clasifEmpresa={clasifEmpresa}
        departments={departments}
        cities={cities}
        getDocumentTypeName={getDocumentTypeName}
        ciiuSearchTerm={ciiuSearchTerm}
        setCiiuSearchTerm={setCiiuSearchTerm}
        filteredCiiuOptions={filteredCiiuOptions}
      />
    </div>
  );
};

interface CreditRequestsTableProps {
  requests: any[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => Promise<void>;
  getDocumentTypeName: (prefix: string) => string;
}

const CreditRequestsTable: React.FC<CreditRequestsTableProps> = React.memo(({ requests, onEdit, onDelete, getDocumentTypeName }) => (
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
            <Button onClick={() => onEdit(index)} variant="outline" className="mr-2">Editar</Button>
            <Button onClick={() => onDelete(index)} variant="destructive">Eliminar</Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
));

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
  TamaEmpresa : (clasifEmpresa: string, lastIncome: number) => void;
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

const CreditRequestDialog: React.FC<CreditRequestDialogProps> = React.memo(({
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
  ciiuOptions,
  sector,
  subsector,
  departments,
  clasifModelo,
  clasifEmpresa,
  cities,
  getDocumentTypeName,
  ciiuSearchTerm,
  setCiiuSearchTerm,
  filteredCiiuOptions
}) => (
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
                />
              <Label>Tipo de documento</Label>
              <Select name="documentType" value={formData.documentTypePrefix} onValueChange={(value) => {
                handleSelectChange('documentTypePrefix', value);
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
                          
              <Label>Nombre</Label>
              <Input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} />
              
              <Label>CIIU Actividad Principal</Label>
              <Input type="number" name="ciiu" value={formData.ciiu == 0? "": formData.ciiu} onChange={handleInputChange} />
              {/*<Select name="ciiu" value={formData.ciiu} onValueChange={(value) => {
                handleSelectChange('ciiu', value);
              }}>
                <SelectTrigger>
                  <SelectValue>{formData.ciiu ? `${formData.ciiu}` : "Seleccione CIIU"}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <Input
                    type="text"
                    placeholder="Buscar CIIU..."
                    value={ciiuSearchTerm}
                    onChange={(e) => setCiiuSearchTerm(e.target.value)}
                  />
                  {filteredCiiuOptions.map(option => (
                    <SelectItem key={option.id_clase} value={option.id_clase}>{`${option.id_clase} - ${option.descripcion}`}</SelectItem>
                  ))}
                </SelectContent>
              </Select>*/}
              
              <Label>Sector</Label>
              <Input type="text" name="sector" value={sector}  disabled />
              
              <Label>Subsector</Label>
              <Input type="text" name="subsector" value={subsector} disabled />
              
              <Label>Departamento del cliente</Label>
              <Select name="department" value={formData.department} onValueChange={(value) => {
                handleDepartmentChange(value);
              }}>
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
              }}>
                <SelectTrigger>
                  <SelectValue>{formData.city ? `${cities.find(city => city.CodigoMunicipio === formData.city)?.Municipio}` : "Seleccione Ciudad"}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {cities.map(city => (
                    <SelectItem key={city.CodigoMunicipio} value={city.Municipio}>{city.Municipio}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Label>Clasificación empresa para modelo </Label>
              <Input type="text" name="companyClassificationModel" value={clasifModelo} onChange={handleInputChange} disabled />
              
              <Label>Clasificación empresa</Label>
              <Input type="text" name="companyClassification" value={clasifEmpresa} onChange={handleInputChange} disabled/>
              
                <Label>Agencia</Label>
                <Select name="agency" value={formData.agency} onValueChange={(value) => {
                handleSelectChange('agency', value);
                }}>
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
                  value={formData.lastIncome == 0 ? "" : formData.lastIncome } 
                  onChange={async (e) => {
                      await handleInputChange(e);
                      await TamaEmpresa(clasifEmpresa ? clasifEmpresa.toString() : "", parseInt(e.target.value ? e.target.value : "0"));
                  }}
                />
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
        <Button onClick={handleSave}>{formData.id ? "Actualizar" : "Guardar"}</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
));

export default CreditRequests;