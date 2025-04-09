/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CreditRequestsTable from './Components/CreditRequestsTable';
import CreditRequestDialog from './Components/CreditRequestDialog';
import { getDocumentTypes } from '@/services/routes/documentType';
import { getCiiuClases } from '@/services/routes/ciiuClase';
import { getCiiuSectorByClase } from '@/services/routes/ciiuSector';
import { calcularTamanoEmpresa } from "./services/calcuralTamanoEmpresa";
import { deleteBalanceByClient } from "@/services/routes/balances";
import { getDepartments, getMunicipalitiesByDepartment, getCiuDepartamentoById } from '@/services/routes/ciuDepartamento';
import { createCreditRequest, updateCreditRequest, deleteCreditRequest, getCreditRequests } from '@/services/routes/creditRequest';
import { useRouter } from 'next/navigation';
import { deleteCupo } from "@/services/routes/llamaprod_calcular_cupo";
const CreditRequests = () => {
  const router = useRouter();
  const [requests, setRequests] = useState<{
    fullName: string;
    documentTypePrefix: string;
    documentNumber: string;
    lastIncome: number;
    id: number;
    Balance: number;
    department: number;
  }[]>([]);
  const [tab, setTab] = useState("cliente");
  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [sector, setSector] = useState("Servicios");
  const [subsector, setSubsector] = useState("Servicios");
  const [clasifModelo, setClasifModelo] = useState("");
  const [clasifEmpresa, setClasifEmpresa] = useState("");
  const [departments, setDepartments] = useState<{ CodigoDepartamento: number; Departamento: string }[]>([]);
  const [cities, setCities] = useState<{ CodigoMunicipio: number; Municipio: string }[]>([]);
  const [formData, setFormData] = useState({
    fullName: "",
    documentTypePrefix: "",
    documentNumber: "",
    requestedAmount: 0,
    ciiu: 0,
    sector: null as null | number,
    subsector: null,
    department: null as null | number,
    city: null as null | number,
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

  const handleViewEstadoResultados = (id: number) => {
    router.push(`/Creditos/EstadoR/${id}`);
  };

  const [documentTypes, setDocumentTypes] = useState<{ Prefijo: string; Tipo_Documento: string }[]>([]);
  const [ciiuOptions, setCiiuOptions] = useState<{ id_clase: number; clase2?: string; clase_servicios?: string; descripcion: string }[]>([]);
  const [ciiuSearchTerm, setCiiuSearchTerm] = useState("");
  const [filteredCiiuOptions, setFilteredCiiuOptions] = useState<{ id_clase: number; clase2?: string; clase_servicios?: string; descripcion: string }[]>([]);

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

          const ciiuOption = ciiuOptions.find(option => option.id_clase === formData.ciiu);
          setClasifModelo(ciiuOption?.clase2 || ""); // Usa un valor predeterminado si es undefined
          setClasifEmpresa(ciiuOption?.clase_servicios || ""); // Usa un valor predeterminado si es undefined
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
      } else {
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
  }, [formData.ciiu, ciiuOptions]);

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
      [name]: name === 'requestedAmount' || name === 'lastIncome' || name === 'ciiu' ? parseInt(value ? value : 0) : value
    }));
  }, []);

  const TamaEmpresa = useCallback(async (clasifEmpresa, lastIncome) => {
    const companySize = await calcularTamanoEmpresa(clasifEmpresa, lastIncome);
    setFormData(prevFormData => ({
      ...prevFormData,
      companySize
    }));
  }, []);

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
      department: selectedDepartment ? selectedDepartment.CodigoDepartamento : null,
      city: selectedDepartment ? 0 : null // Reset city only if department changes
    }));
    if (selectedDepartment) {
      const citiesData = await getMunicipalitiesByDepartment(selectedDepartment.CodigoDepartamento);
      setCities(citiesData);
    }
  }, [departments]);

  const handleCityChange = useCallback((value) => {
    const selectedCity = cities.find(city => city.Municipio === value);
    setFormData(prevFormData => ({
      ...prevFormData,
      city: selectedCity?.CodigoMunicipio ?? null
    }));
  }, [cities]);

  const handleSave = useCallback(async () => {
    if (editingIndex !== null) {
      await updateCreditRequest(requests[editingIndex].id, JSON.stringify(formData));
      setRequests(prevRequests => {
        const updatedRequests = [...prevRequests];
        updatedRequests[editingIndex] = { 
          ...formData, 
          id: requests[editingIndex].id, 
          Balance: requests[editingIndex].Balance, 
          department: formData.department ?? 0 // Ensure department is a number
        };
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
    setFormData({
      ...formData,
      ...requests[index]
    });
    const citiesData = await getMunicipalitiesByDepartment(requests[index].department);
    setCities(citiesData);
    setOpen(true);
  }, [requests]);

  const getDocumentTypeName = useCallback((prefix) => {
    const type = documentTypes.find(type => type.Prefijo === prefix);
    return type ? type.Tipo_Documento : "Seleccione tipo";
  }, [documentTypes]);

  const handleDelete = useCallback(async (index) => {
    debugger;
    if (requests.length > 0 && requests[index]) {
      await deleteCreditRequest(requests[index].id);
      await deleteCupo(requests[index].id);
      setRequests(prevRequests => prevRequests.filter((_, i) => i !== index));
    } else {
      console.error("Invalid index or empty requests array");
    }
  }, [requests, setRequests]);

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

  return (
    <div className="p-6">
      <Card>
        <CardContent>
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-bold">Solicitudes de Crédito</h2>
            <Button className="mt-5" onClick={
              () => {
                resetForm();
                setEditingIndex(null); // Restablecer el estado editingIndex
                setOpen(true);
              }
            }>CREAR SOLICITUD</Button>
          </div>
          <CreditRequestsTable 
            requests={requests}
            onEdit={handleEdit} 
            onDelete={handleDelete}
            getDocumentTypeName={getDocumentTypeName}
            onViewEstadoResultados={handleViewEstadoResultados}
          />
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
        </CardContent>
      </Card>
      
    </div>
  );
};

export default CreditRequests;