/* eslint-disable prefer-const */
'use client';
import React, { useState } from "react";
import { Table } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { Progress } from "@radix-ui/react-progress";
import { createBalance } from "@/services/routes/balances";

const initialData = [
    { category: "Efectivo y Equivalentes de Efectivo", values: [152, 72, 249, 484], editable: true },
    { category: "Inversiones Temporales", values: ["", "", "", ""], editable: true },
    { category: "Clientes y Ctas Ctes Comerciales", values: [3131, 3552, 4109, 3866], editable: true },
    { category: "Inventarios", values: ["", "", "", ""], editable: true },
    { category: "Otros Activos Corrientes", values: [2345, 4550, 5045, 6043], editable: true },
    { category: "Total Activo Corriente", values: ["", "", "", ""], calculated: true },
    { category: "Propiedad Planta y Equipo", values: [5455, 13833, 17466, 18207], editable: true },
    { category: "Depreciación Acumulada", values: ["", -5312, -6426, -5312], editable: true },
    { category: "Propiedad Planta y Equipo Neto", values: ["", "", "", ""], calculated: true },
    { category: "Inversiones Permanentes", values: [104, 104, 104, 104], editable: true },
    { category: "Activos Intangibles", values: ["", "", "", ""], editable: true },
    { category: "Otros Activos No Corrientes", values: [292, "", "", ""], editable: true },
    { category: "Inv.Disp.Venta / Valorizaciones", values: ["", "", "", ""], editable: true },
    { category: "Total Activo", values: ["", "", "", ""], calculated: true },

    { category: "Obligaciones Financieras CP", values: [58, 314, 515, 594], editable: true },
    { category: "Porcion Corriente Deuda LP", values: ["", "", "", ""], editable: true },
    { category: "Proveedores", values: [497, 505, 3577, 5002], editable: true },
    { category: "Otros Pasivos Corrientes", values: [6997, 8864, 7066, 6421], editable: true },
    { category: "Total Pasivo Corriente", values: ["", "", "", ""], calculated: true },
    { category: "Obligaciones Financieras LP", values: [235, 1924, 2886, 2377], editable: true },
    { category: "Otros Pasivos No Corrientes", values: [454, 444, 444, 1017], editable: true },
    { category: "Total Pasivos", values: ["", "", "", ""], calculated: true },

    { category: "Capital Pagado", values: [990, 990, 990, 990], editable: true },
    { category: "Prima En Colocacion De Acciones", values: ["", "", "", ""], editable: true },
    { category: "Otros Superávit de Capital", values: ["", 557, 557, ""], editable: true },
    { category: "Efectos Adopción Primera Vez (NIIF)", values: [187, 187, 187, 782], editable: true },
    { category: "Reserva Legal", values: [495, 495, 495, 495], editable: true },
    { category: "Otras Reservas", values: ["", "", "", ""], editable: true },
    { category: "Ajustes Otro Resultado Integral", values: ["", "", "", ""], editable: true },
    { category: "Ajustes Inv.Disp.Venta / Valorizaciones ", values: ["", "", "", ""], editable: true },
    { category: "Utilidades Retenidas", values: [999, 1773, 2518, 4192], editable: true },
    { category: "Utilidades del Periodo", values: [567, 746, 1312, 1522], editable: true },
    { category: "Total Patrimonio", values: ["", "", "", ""], calculated: true },
    { category: "Total Pasivo + Patrimonio", values: ["", "", "", ""], calculated: true },

    { category: "Diferencia", values: ["", "", "", ""], calculated: true },
];

export default function EstadoFinanciero() {
    const [data, setData] = useState(initialData);
    const [calculado, setCalculado] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { id } = useParams();

    const formatNumber = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const parseNumber = (value) => {
        return value.replace(/[^0-9-]/g, "");
    };

    const calculateData = (updatedData) => {
        let efectivoyequivalentes = updatedData.find(row => row.category === "Efectivo y Equivalentes de Efectivo")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let inversionestemporales = updatedData.find(row => row.category === "Inversiones Temporales")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let clientes = updatedData.find(row => row.category === "Clientes y Ctas Ctes Comerciales")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let inventarios = updatedData.find(row => row.category === "Inventarios")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let otrosactivoscorrientes = updatedData.find(row => row.category === "Otros Activos Corrientes")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let totalActivoCorriente = efectivoyequivalentes.map((val, idx) => val + inversionestemporales[idx] + clientes[idx] + inventarios[idx] + otrosactivoscorrientes[idx]);

        let propiedadplanta = updatedData.find(row => row.category === "Propiedad Planta y Equipo")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let depreciacion = updatedData.find(row => row.category === "Depreciación Acumulada")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let propiedadplantaneto = propiedadplanta.map((val, idx) => val + depreciacion[idx]);

        let inversionespermanentes = updatedData.find(row => row.category === "Inversiones Permanentes")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let activosintangibles = updatedData.find(row => row.category === "Activos Intangibles")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let otrosactivosnocorrientes = updatedData.find(row => row.category === "Otros Activos No Corrientes")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let invdispventa = updatedData.find(row => row.category === "Inv.Disp.Venta / Valorizaciones")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let totalActivo = propiedadplantaneto.map((val, idx) => val + totalActivoCorriente[idx]   + inversionespermanentes[idx] + activosintangibles[idx] + otrosactivosnocorrientes[idx] + invdispventa[idx]);

        let obligacionesfinancierasCP = updatedData.find(row => row.category === "Obligaciones Financieras CP")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let porcioncorrientedeudaLP = updatedData.find(row => row.category === "Porcion Corriente Deuda LP")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let proveedores = updatedData.find(row => row.category === "Proveedores")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let otrospasivoscorrientes = updatedData.find(row => row.category === "Otros Pasivos Corrientes")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let totalPasivoCorriente = obligacionesfinancierasCP.map((val, idx) => val + porcioncorrientedeudaLP[idx] + proveedores[idx] + otrospasivoscorrientes[idx]);

        let obligacionesfinancierasLP = updatedData.find(row => row.category === "Obligaciones Financieras LP")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let otrospasivosnocorrientes = updatedData.find(row => row.category === "Otros Pasivos No Corrientes")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let totalPasivos = obligacionesfinancierasLP.map((val, idx) => val + totalPasivoCorriente[idx] + otrospasivosnocorrientes[idx]);

        let capitalpagado = updatedData.find(row => row.category === "Capital Pagado")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let primaencolocaciondeacciones = updatedData.find(row => row.category === "Prima En Colocacion De Acciones")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let otrossuperavitdecapital = updatedData.find(row => row.category === "Otros Superávit de Capital")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let efectosadopcionprimeravez = updatedData.find(row => row.category === "Efectos Adopción Primera Vez (NIIF)")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let reservalegal = updatedData.find(row => row.category === "Reserva Legal")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let otrasreservas = updatedData.find(row => row.category === "Otras Reservas")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let ajustesotroresultadointegral = updatedData.find(row => row.category === "Ajustes Otro Resultado Integral")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let ajustesinvdispventa = updatedData.find(row => row.category === "Ajustes Inv.Disp.Venta / Valorizaciones ")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let utilidadesretenidas = updatedData.find(row => row.category === "Utilidades Retenidas")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let utilidadesdelperiodo = updatedData.find(row => row.category === "Utilidades del Periodo")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let totalPatrimonio = capitalpagado.map((val, idx) => val + primaencolocaciondeacciones[idx] + otrossuperavitdecapital[idx] + efectosadopcionprimeravez[idx] + reservalegal[idx] + otrasreservas[idx] + ajustesotroresultadointegral[idx] + ajustesinvdispventa[idx] + utilidadesretenidas[idx] + utilidadesdelperiodo[idx]);
        let totalPasivoPatrimonio = totalPasivos.map((val, idx) => val + totalPatrimonio[idx]);

        let diferencia = totalActivo.map((val, idx) => val - totalPasivoPatrimonio[idx]);

        return updatedData.map(row => {
            if(row.category === "Total Activo Corriente") {
                return { ...row, values: totalActivoCorriente, calculated: true };
            }
            if(row.category === "Propiedad Planta y Equipo Neto") {
                return { ...row, values: propiedadplantaneto, calculated: true };
            }
            if(row.category === "Total Activo") {
                return { ...row, values: totalActivo, calculated: true };
            }
            if(row.category === "Total Pasivo Corriente") {
                return { ...row, values: totalPasivoCorriente, calculated: true };
            }
            if(row.category === "Total Pasivos") {
                return { ...row, values: totalPasivos, calculated: true };
            }
            if(row.category === "Total Patrimonio") {
                return { ...row, values: totalPatrimonio, calculated: true };
            }
            if(row.category === "Total Pasivo + Patrimonio") {
                return { ...row, values: totalPasivoPatrimonio, calculated: true };
            }
            if(row.category === "Diferencia") {
                return { ...row, values: diferencia, calculated: true };
            }
            return row;
        });
    };

    const handleChange = (index, colIndex, value) => {
        const rawValue = parseNumber(value);
        let newData = data.map((row, rowIdx) => {
            if (rowIdx === index && row.editable) {
                const updatedValues = row.values.map((val, valIdx) =>
                    valIdx === colIndex ? rawValue : val
                );
                return { ...row, values: updatedValues };
            }
            return row;
        });

        setData(newData);
    };

    const handleCalculate = () => {
        setData(calculateData(data));
        setCalculado(true);
    };
    
    const saveDataToDatabase = async (data) => {
        const response = await createBalance(JSON.stringify(data));
        return response;
    };
    const handleSave = async () => {
        setLoading(true);
        try {
            const formattedData = data.map((row, rowIndex) => ({
                category: row.category,
                Cliente_id: id ? parseNumber(id) : null,
                idcategory: 1 + '' + rowIndex,
                values: row.values.map((value, index) => ({
                    year: new Date().getFullYear() - 4 + index,
                    value: Number(value)
                }))
            }));
            const response = await saveDataToDatabase(formattedData);
            if (response.status == 200) {
                setCalculado(false);
                router.push('')
            } else {
                alert('Error saving data');
            }
            //alert('Data saved successfully');
        } catch (error) {
            console.error('Error saving data:', error);
            alert('Error saving data');
            setCalculado(false);
        } finally {
            setTimeout(() => {
            setLoading(false);
            router.push(`/Creditos/Estadof/${id}`);
            }, 6000);
            setCalculado(false);
            
        }
    };

    return (
        <div className="overflow-x-auto p-4">
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white p-4 rounded shadow-lg">
                        <Progress 
                            value={100} 
                            className="w-full" 
                        />
                        <p className="text-center mt-2">Guardando datos...</p>
                    </div>
                </div>
            )}
            <Table className="min-w-full border border-gray-100">
                <thead>
                    <tr className="bg-green-300 text-black-100">
                        <th className="text-left p-3 text--600 ">CIFRAS EN</th>
                        <th className="text-left p-1 "></th>
                        <th className="text-left p-1"></th>
                        <th className="text-left p-1"></th>
                        <th className="text-left p-3">MILLONES DE PESOS</th>

                    </tr>
                    <tr className="bg-green-300 text-black">
                        <th className="text-left p-2">ESTADO DE SITUACION FINANCIERA</th>
                        <th className="p-2">{new Date().getFullYear() - 4}</th>
                        <th className="p-2">{new Date().getFullYear() - 3}</th>
                        <th className="p-2">{new Date().getFullYear() - 2}</th>
                        <th className="p-2">{new Date().getFullYear() - 1}</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <React.Fragment key={rowIndex}>
                            {rowIndex === 0 && (
                                <tr key={"ac" + rowIndex} className="bg-gray-100 text-black">
                                    <td className="p-2 border-b font-bold text-center">ACTIVOS</td>
                                    <td className="p-2"></td>
                                    <td className="p-2"></td>
                                    <td className="p-2"></td>
                                    <td className="p-2"></td>
                                </tr>
                            )}
                            {rowIndex === 14 && (
                                <tr key={"p" + rowIndex} className="bg-gray-100 text-black">
                                    <td className="p-2 border-b font-bold text-center">PASIVOS</td>
                                    <td className="p-2"></td>
                                    <td className="p-2"></td>
                                    <td className="p-2"></td>
                                    <td className="p-2"></td>
                                </tr>
                            )}
                            {rowIndex === 22 && (
                                <tr key={"pt-" + rowIndex} className="bg-gray-100 text-black">
                                    <td className="p-2 border-b font-bold text-center">PATRIMONIO</td>
                                    <td className="p-2"></td>
                                    <td className="p-2"></td>
                                    <td className="p-2"></td>
                                    <td className="p-2"></td>
                                </tr>
                            )}
                            <tr key={row.category} className={row.calculated ? "bg-green-200 text-black font-bold" : "bg-gray-100 hover:bg-gray-200"}>
                                <td className="p-2 border-b">{row.category}</td>
                                {row.values.map((value, colIndex) => (
                                    <td key={colIndex} className="p-2 border-b text-right">
                                        {row.calculated ? (
                                            <span>{formatNumber(value)}</span>
                                        ) : (
                                            <Input
                                                type="text"
                                                placeholder="0"
                                                value={formatNumber(value)}
                                                onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                                                className="w-full bg-gray-100 text-black p-1 rounded focus:outline-none text-right"
                                            />
                                        )}
                                    </td>
                                ))}
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </Table>
            <div className="flex justify-between mb-4 mt-4">
                <Button onClick={handleCalculate} className="bg-blue-500 text-white">Calcular</Button>
                <Button 
                    onClick={handleSave} 
                    className="bg-green-500 text-white"
                    disabled = {!calculado}
                >
                    
                        Guardar
                </Button>
            </div>
        </div>
    );
}