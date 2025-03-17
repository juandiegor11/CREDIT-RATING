/* eslint-disable prefer-const */
'use client';
import React, { useState } from "react";
import { Table } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const dataEstadoResultados = [
    { category: "Ingresos de Actividades Ordinarias", values: [11751, "", "", ""], editable: true },
    { category: "Costo de Ventas", values: [9019, "", "", ""], editable: true },
    { category: "% Costo de Ventas / Ventas", values: ["", "", "", ""], calculated: true },
    { category: "Gastos de Ventas", values: [172, "", "", ""], editable: true },
    { category: "% Gastos de Ventas / Ventas", values: ["", "", "", ""], calculated: true },
    { category: "Gastos de Administración", values: [1381, "", "", ""], editable: true },
    { category: "% Gastos de Admon / Ventas", values: ["", "", "", ""], calculated: true },
    { category: "Utilidad Op. Antes de Deprec.", values: ["", "", "", ""], calculated: true },
    { category: "% Ut. Op. Antes de Dep. / Ventas", values: ["", "", "", ""], calculated: true },
    { category: "DEPRECIACIÓN", values: ["", "", "", ""], editable: true },
    { category: "AMORTIZACIÓN", values: ["", "", "", ""], editable: true },
    { category: "Utilidad Operacional", values: ["", "", "", ""], calculated: true },
    { category: "% Utilidad Operacional / Ventas", values: ["", "", "", ""], calculated: true },
    { category: "Ingresos Financieros", values: ["153", "", "", ""], editable: true },
    { category: "Gastos Financieros", values: ["490", "", "", ""], editable: true },
    { category: "% Gastos Financieros / Ventas", values: ["", "", "", ""], calculated: true },
    { category: "OTROS INGRESOS Y EGRESOS", values: ["", "", "", ""], editable: true },
    { category: "CORRECCIÓN MONETARIA", values: ["", "", "", ""], editable: true },
    { category: "Utilidad Antes de Impuestos", values: ["", "", "", ""], calculated: true },
    { category: "Impuestos", values: ["", "", "", ""], editable: true },
    { category: "Utilidad Neta", values: ["", "", "", ""], calculated: true },
    { category: "% Utilidad Neta  / Ventas", values: ["", "", "", ""], calculated: true },
    { category: "OTROS RESULTADOS INTEGRALES (NETO)", values: [0, 8, 0, 0], editable: true },
    { category: "Total Resultado Integral del Periodo", values: ["", "", "", ""], calculated: true }
];

export default function Creditos() {
    const [data, setData] = useState(dataEstadoResultados);

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
    };

    const saveDataToDatabase = async (data) => {
        const response = await fetch('/api/saveData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    
        if (!response.ok) {
            throw new Error('Error saving data');
        }
    
        return response.json();
    };
    const handleSave = async () => {
        try {
            const formattedData = data.map((row, rowIndex) => ({
                category: row.category,
                creditId: 1,
                idcategory:  1 + '' + rowIndex,
                values: row.values.map((value, index) => ({
                    year: new Date().getFullYear() - 4 + index,
                    value: Number(value)
                }))
            }));
            debugger;
            //console.log('Data to save:', formattedData);
            //await saveDataToDatabase(formattedData);
            alert('Data saved successfully');
        } catch (error) {
            console.error('Error saving data:', error);
            alert('Error saving data');
        }
    };

    return (
        <div className="overflow-x-auto p-4">

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
                        <th className="text-left p-2">Estado de Resultados</th>
                        <th className="p-2">{new Date().getFullYear() - 4}</th>
                        <th className="p-2">{new Date().getFullYear() - 3}</th>
                        <th className="p-2">{new Date().getFullYear() - 2}</th>
                        <th className="p-2">{new Date().getFullYear() - 1}</th>
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
                    onClick={() => {
                        handleCalculate();
                        // Navigate to the next section
                        window.location.href = "Creditos/Estadof";
                    }} 
                    className="bg-green-500 text-white" 
                    disabled={!data.some(row => row.calculated)}
                >
                    Siguiente
                </Button>
                <Button onClick={handleSave} className="bg-green-500 text-white">Guardar</Button>
            </div>
        </div>
    );
}
