/* eslint-disable prefer-const */
'use client';
import React, { useState } from "react";
import { Table } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createBalance } from '@/services/routes/balances'; 
import { useParams } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import { useYears} from "../../context/YearsContext";

//const years = [new Date().getFullYear() - 4, new Date().getFullYear() - 3, new Date().getFullYear() - 2, new Date().getFullYear() - 1];

const dataEstadoResultados = [
    { category: "Ingresos de Actividades Ordinarias", values: ["", "", "", ""], editable: true },
    { category: "Costo de Ventas", values: ["", "", "", ""], editable: true },
    { category: "% Costo de Ventas / Ventas", values: ["", "", "", ""], calculated: true },
    { category: "Gastos de Ventas", values: ["", "", "", ""], editable: true },
    { category: "% Gastos de Ventas / Ventas", values: ["", "", "", ""], calculated: true },
    { category: "Gastos de Administración", values: ["", "", "", ""], editable: true },
    { category: "% Gastos de Admon / Ventas", values: ["", "", "", ""], calculated: true },
    { category: "Utilidad Op. Antes de Deprec.", values: ["", "", "", ""], calculated: true },
    { category: "% Ut. Op. Antes de Dep. / Ventas", values: ["", "", "", ""], calculated: true },
    { category: "DEPRECIACIÓN", values: ["", "", "", ""], editable: true },
    { category: "AMORTIZACIÓN", values: ["", "", "", ""], editable: true },
    { category: "Utilidad Operacional", values: ["", "", "", ""], calculated: true },
    { category: "% Utilidad Operacional / Ventas", values: ["", "", "", ""], calculated: true },
    { category: "Ingresos Financieros", values: ["", "", "", ""], editable: true },
    { category: "Gastos Financieros", values: ["", "", "", ""], editable: true },
    { category: "% Gastos Financieros / Ventas", values: ["", "", "", ""], calculated: true },
    { category: "OTROS INGRESOS Y EGRESOS", values: ["", "", "", ""], editable: true },
    { category: "CORRECCIÓN MONETARIA", values: ["", "", "", ""], editable: true },
    { category: "Utilidad Antes de Impuestos", values: ["", "", "", ""], calculated: true },
    { category: "Impuestos", values: ["", "", "", ""], editable: true },
    { category: "Utilidad Neta", values: ["", "", "", ""], calculated: true },
    { category: "% Utilidad Neta  / Ventas", values: ["", "", "", ""], calculated: true },
    { category: "OTROS RESULTADOS INTEGRALES (NETO)", values: ["", "", "", ""], editable: true },
    { category: "Total Resultado Integral del Periodo", values: ["", "", "", ""], calculated: true }
];

export default function Creditos() {
    const params = useParams();
    const id = params?.id as string; // Asegúrate de que `id` sea un string
    const router = useRouter();
    const [data, setData] = useState(dataEstadoResultados);
    const [calculado, setCalculado] = useState(false);
    const [loading, setLoading] = useState(false);
    const { years, selectedYears, toggleYear, dataEstadoR,añadirDataEstadoR } = useYears();
    const [partialMonth, setPartialMonth] = useState<null | number>(null); // Permitir null o number
    const [isPartial, setIsPartial] = useState(false); // Estado para el checkbox de parcial

    const handleCheckboxChange = (year) => {
        toggleYear(year); // Almacenar la selección en el contexto
    };
    const formatNumber = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const parseNumber = (value) => {
        return value.replace(/[^0-9-]/g, "");
    };

    const calculateData = (updatedData) => {
        let ingresos = updatedData.find(row => row.category === "Ingresos de Actividades Ordinarias")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let costoVentas = updatedData.find(row => row.category === "Costo de Ventas")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let gastosVentas = updatedData.find(row => row.category === "Gastos de Ventas")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let gastosAdmin = updatedData.find(row => row.category === "Gastos de Administración")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let utilidadOpAntesDep = ingresos.map((ing, i) => ing - costoVentas[i] - gastosVentas[i] - gastosAdmin[i]);
        let depreciacion = updatedData.find(row => row.category === "DEPRECIACIÓN")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let amortizacion = updatedData.find(row => row.category === "AMORTIZACIÓN")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let utilidadOperacional = utilidadOpAntesDep.map((utilidad, i) => utilidad - depreciacion[i] - amortizacion[i]);
        let ingresosfinancieros = updatedData.find(row => row.category === "Ingresos Financieros")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let gastosfinancieros = updatedData.find(row => row.category === "Gastos Financieros")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let otrosIngresosEgresos = updatedData.find(row => row.category === "OTROS INGRESOS Y EGRESOS")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let correccionMonetaria = updatedData.find(row => row.category === "CORRECCIÓN MONETARIA")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let utilidadAntesImpuestos = utilidadOperacional.map((utilidad, i) => utilidad + ingresosfinancieros[i] - gastosfinancieros[i] + otrosIngresosEgresos[i] + correccionMonetaria[i]);
        let impuestos = updatedData.find(row => row.category === "Impuestos")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let utilidadNeta = utilidadAntesImpuestos.map((utilidad, i) => utilidad - impuestos[i]);
        let otrosResultadosIntegrales = updatedData.find(row => row.category === "OTROS RESULTADOS INTEGRALES (NETO)")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let totalResultadoIntegral = utilidadNeta.map((utilidad, i) => utilidad + otrosResultadosIntegrales[i]);
        
        return updatedData.map(row => {
            if (row.category === "Utilidad Op. Antes de Deprec.") {
                return {
                    ...row,
                    values: utilidadOpAntesDep
                };
            } if (row.category === "% Ut. Op. Antes de Dep. / Ventas") {
                return {
                    ...row,
                    values: utilidadOpAntesDep.map((utilidad, i) => ingresos[i] > 0 ? ((utilidad / ingresos[i]) * 100).toFixed(1) + '%' : "0.0%")
                };
            } else if (row.category === "Utilidad Operacional") {
                return {
                    ...row,
                    values: utilidadOperacional
                };
            } else if (row.category === "Utilidad Antes de Impuestos") {
                return {
                    ...row,
                    values: utilidadAntesImpuestos
                };
            } else if (row.category === "Utilidad Neta") {
                return {
                    ...row,
                    values: utilidadNeta
                };
            }
            else if (row.category === "Total Resultado Integral del Periodo") {
                return {
                    ...row,
                    values: totalResultadoIntegral
                };
            }
            if (row.category.includes("%")) {
                return {
                    ...row,
                    values: ingresos.map(
                        (ing, i) => ing > 0 ? (
                            (
                                row.category === "% Ut. Op. Antes de Dep. / Ventas" ? utilidadOpAntesDep[i] :
                                    row.category === "% Costo de Ventas / Ventas" ? costoVentas[i] :
                                        row.category === "% Gastos de Ventas / Ventas" ? gastosVentas[i] :
                                            row.category === "% Gastos de Admon / Ventas" ? gastosAdmin[i] :
                                                row.category === "% Utilidad Operacional / Ventas" ? utilidadOperacional[i] :
                                                    row.category === "% Gastos Financieros / Ventas" ? updatedData.find(row => row.category === "Gastos Financieros")?.values[i] || 0 :
                                                        row.category === "% Utilidad Neta  / Ventas" ? utilidadNeta[i] :
                                                            0
                            ) / ing * 100).toFixed(1) + '%' : "0.0%"
                    )

                };
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
        localStorage.setItem("month", JSON.stringify(partialMonth));
        localStorage.setItem("isPartial", JSON.stringify(isPartial));
    };

    const saveDataToDatabase = async (data) => {
        const response = await createBalance(JSON.stringify(data));
        return response;
    };

    const getFilteredData = () => {
        return data.map(row => ({
            category: row.category,
            values: row.values.filter((_, index) => selectedYears[years[index]])
        }));
    };

    const handlePartialCheckboxChange = () => {
        setIsPartial(!isPartial);
        if (!isPartial) {
            setPartialMonth(null); // Resetear el mes si se desmarca
        }
    };

    const handlePartialMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPartialMonth(Number(event.target.value)); // Ahora TypeScript no dará error
    };

    const handleSave = async () => {
        if (!id) {
            console.error("ID is missing");
            return;
        }
        setLoading(true);
        data.push({
            category: "periodo ultimo año",
            values: ["", "", "", localStorage.getItem("isPartial") === "true" ? (localStorage.getItem("month") ?? "12") : "12"],
            editable: true,
        })
        try {
            const formattedData = data.map((row, rowIndex) => ({
                category: row.category,
                Cliente_id: id ? parseNumber(id) : null,
                idcategory: `1${rowIndex}`,
                values: row.values
                    .map((value, index) => ({
                        year: years[index],  // Año basado en el contexto
                        value: row.category === "periodo ultimo año" && index === years.length - 1
                            ? (localStorage.getItem("isPartial") === "true" 
                                ? Number(localStorage.getItem("month")) 
                                : 12)
                            : parseFloat(value) || 0 // Por defecto 12 para todos los años
                    }))
                    .filter(entry => selectedYears[entry.year]) // Filtra solo los años seleccionados
            }));
            debugger;
            router.push(`/Creditos/Estadof/${id}`);
            // const response = await saveDataToDatabase(formattedData);
            // if (response.status === 200) {
            //     setLoading(false);
            //     router.push(`/Creditos/Estadof/${id}`);
            // } else {
            //     alert('Error server - saving data');
            // }
            //alert('Data saved successfully');
            añadirDataEstadoR(formattedData);
            setLoading(false);
            setCalculado(false);
        } catch (error) {
            console.error('Error saving data:', error);
            alert('Error server - saving data');
            setCalculado(false);
        } finally {
            setCalculado(false);
            
        }
    };

    return (
        <div className="overflow-x-auto p-4">
            <h1>Estado de Resultados para ID: {id}</h1>
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
                    <tr className="bg-green-300 text-black-100">
                        <th className="text-left p-3 text--600 ">CIFRAS EN</th>
                        <th className="text-left p-1 "></th>
                        <th className="text-left p-1"></th>
                        <th className="text-left p-1"></th>
                        <th className="text-left p-3">
                        {selectedYears[years[years.length - 1]] && (
                            <>
                                parcial  <input 
                                    type="checkbox" 
                                    onChange={handlePartialCheckboxChange}
                                    checked={isPartial}
                                /> 
                                {isPartial && (
                                    <select 
                                        value={partialMonth || ""} 
                                        onChange={handlePartialMonthChange} 
                                        className="ml-2 p-1 border rounded"
                                    >
                                        <option value="" disabled>Mes</option>
                                        {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                                            <option key={month} value={month}>{month}</option>
                                        ))}
                                    </select>
                                )}
                                </>
                            )}
                            </th>
                    </tr>
                    <tr className="bg-green-300 text-black">
                        <th className="text-left p-2">Estado de Resultados</th>
                        {years.map((year, index) => (
                            <th key={index} className="p-2">
                                <input 
                                    type="checkbox" 
                                    onChange={() => handleCheckboxChange(year)}
                                    checked={selectedYears[year] || false}
                                /> {year}
                            </th>
                        ))}
                    </tr>
  
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className={row.calculated ? "bg-green-200 text-black" : "bg-gray-100 hover:bg-gray-200"}>
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
                                            disabled={!selectedYears[years[colIndex]]}
                                        />
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="flex justify-between mb-4 mt-4">
                <Button onClick={handleCalculate} className="bg-blue-500 text-white">Calcular</Button>
                <Button 
                    onClick={handleSave} 
                    className="bg-green-500 text-white"
                    disabled={!calculado}
                >Siguiente</Button>
            </div>
        </div>
    );
}
