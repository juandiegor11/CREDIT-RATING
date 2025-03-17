/* eslint-disable prefer-const */
'use client';
import React, { useState } from "react";
import { Table } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const DataActivos = [
    { category: "Efectivo y Equivalentes de Efectivo", values: ["152", 72, 249, 484], editable: true },
    { category: "Inversiones Temporales", values: ["", "", "", ""], editable: true },
    { category: "Clientes y Ctas Ctes Comerciales", values: [3131, 3552, 4109, 3866], editable: true },
    { category: "Inventarios", values: ["", "", "", ""], editable: true },
    { category: "Otros Activos Corrientes", values: [2345, 4550, 5045, 6043], editable: true },
    { category: "Total Activo Corriente", values: ["", "", "", ""], calculated: true },
    { category: "Propiedad Planta y Equipo", values: [5455, 13833, 17466, 18207], editable: true },
    { category: "Depreciación Acumulada", values: ["", -5312, -6426, -5312], editable: true },
    { category: "Propiedad Planta y Equipo Neto", values: ["", "", "", ""], calculated: true },
    { category: "Inversiones Permanentes", values: ["104", "104", "104", "104"], editable: true },
    { category: "Activos Intangibles", values: ["", "", "", ""], editable: true },
    { category: "Otros Activos No Corrientes", values: [292, "", "", ""], editable: true },
    { category: "Inv.Disp.Venta / Valorizaciones", values: ["", "", "", ""], editable: true },
    { category: "Total Activo", values: ["", "", "", ""], calculated: true }
];
const DataPasivos = [
    
    { category: "Obligaciones Financieras CP", values: [58, 314, 515, 594], editable: true },
    { category: "Porcion Corriente Deuda LP", values: ["", "", "", ""], editable: true },
    { category: "Proveedores", values: [497, 505, 3577, 5002], editable: true },
    { category: "Otros Pasivos Corrientes", values: [6997, 8864, 7066, 6421], editable: true },
    { category: "Total Pasivo Corriente", values: ["", "", "", ""], calculated: true },
    { category: "Obligaciones Financieras LP", values: [235, 1924, 2886, 2377], editable: true },
    { category: "Otros Pasivos No Corrientes", values: [454, 444, 444, 1017], editable: true },
    { category: "Total Pasivos", values: ["", "", "", ""], calculated: true }
]
const DataPatrimonio = [
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
]

export default function EstadoFinanciero() {
    const [activos, setActivos] = useState(DataActivos);
    const [pasivos, setPasivos] = useState(DataPasivos);
    const [patrimonio, setPatrimonio] = useState(DataPatrimonio);
    const [data, setData] = useState([]);

    const formatNumber = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const parseNumber = (value) => {
        return value.replace(/[^0-9-]/g, "");
    };

    const calculateDataActivo = (updatedData) => {
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
            return row;
        });
    };
    const calculateDataPasivo = (updatedData) => {
        let obligacionesfinancieras = updatedData.find(row => row.category === "Obligaciones Financieras CP")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let porcioncorrientedeuda = updatedData.find(row => row.category === "Porcion Corriente Deuda LP")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let proveedores = updatedData.find(row => row.category === "Proveedores")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let otrospasivoscorrientes = updatedData.find(row => row.category === "Otros Pasivos Corrientes")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let totalPasivoCorriente = obligacionesfinancieras.map((val, idx) => val + porcioncorrientedeuda[idx] + proveedores[idx] + otrospasivoscorrientes[idx]);

        let obligacionesfinancierasLP = updatedData.find(row => row.category === "Obligaciones Financieras LP")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let otrospasivosnocorrientes = updatedData.find(row => row.category === "Otros Pasivos No Corrientes")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let totalPasivo = obligacionesfinancierasLP.map((val, idx) => val + otrospasivosnocorrientes[idx]);

        return updatedData.map(row => {
            if(row.category === "Total Pasivo Corriente") {
                return { ...row, values: totalPasivoCorriente, calculated: true };
            }
            if(row.category === "Total Pasivos") {
                return { ...row, values: totalPasivo, calculated: true };
            }
            return row;
        });
    };
    const calculateData = (updatedData ) => {
        let totalActivo = activos.find(row => row.category === "Total Activo")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let totalPasivo = updatedData.find(row => row.category === "Total Pasivos")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let capitalpagado = updatedData.find(row => row.category === "Capital Pagado")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let primaencolocacion = updatedData.find(row => row.category === "Prima En Colocacion De Acciones")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let otrossuperavit = updatedData.find(row => row.category === "Otros Superávit de Capital")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let efectosadopcion = updatedData.find(row => row.category === "Efectos Adopción Primera Vez (NIIF)")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let reservalegal = updatedData.find(row => row.category === "Reserva Legal")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let otrasreservas = updatedData.find(row => row.category === "Otras Reservas")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let ajustesotroresultado = updatedData.find(row => row.category === "Ajustes Otro Resultado Integral")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let ajustesinvdispventa = updatedData.find(row => row.category === "Ajustes Inv.Disp.Venta / Valorizaciones")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let utilidadesretenidas = updatedData.find(row => row.category === "Utilidades Retenidas")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let utilidadesperiodo = updatedData.find(row => row.category === "Utilidades del Periodo")?.values.map(val => Number(val) || 0) || [0, 0, 0, 0];
        let totalpatrimonio = capitalpagado.map((val, idx) => val + primaencolocacion[idx] + otrossuperavit[idx] + efectosadopcion[idx] + reservalegal[idx] + otrasreservas[idx] + ajustesotroresultado[idx] + ajustesinvdispventa[idx] + utilidadesretenidas[idx] + utilidadesperiodo[idx]);
        
        let totalpasivopatrimonio = totalActivo.map((val, idx) => val - totalPasivo[idx]);
        let diferencia = totalActivo.map((val, idx) => val - totalpasivopatrimonio[idx]);

        return updatedData.map(row => {
            if(row.category === "Total Patrimonio") {
                return { ...row, values: totalpatrimonio, calculated: true };
            }
            if(row.category === "Total Pasivo + Patrimonio") {
                return { ...row, values: totalpasivopatrimonio, calculated: true };
            }
            if(row.category === "Diferencia") {
                return { ...row, values: diferencia, calculated: true };
            }
            return row;
        });
    }

    const handleChange = (index, colIndex, value) => {
        const rawValue = parseNumber(value);
        let newData = activos.map((row, rowIdx) => {
            if (rowIdx === index && row.editable) {
                const updatedValues = row.values.map((val, valIdx) =>
                    valIdx === colIndex ? rawValue : val
                );
                return { ...row, values: updatedValues };
            }
            return row;
        });
        setActivos(newData);

        let newData2 = pasivos.map((row, rowIdx) => {
            if (rowIdx === index && row.editable) {
                const updatedValues = row.values.map((val, valIdx) =>
                    valIdx === colIndex ? rawValue : val
                );
                return { ...row, values: updatedValues };
            }
            return row;
        });
        setPasivos(newData2);

        let newData3 = patrimonio.map((row, rowIdx) => {
            if (rowIdx === index && row.editable) {
                const updatedValues = row.values.map((val, valIdx) =>
                    valIdx === colIndex ? rawValue : val
                );
                return { ...row, values: updatedValues };
            }
            return row;
        });
        setPatrimonio(newData3);
    };

    const handleCalculate = () => {
        setActivos(calculateDataActivo(activos));
        setPasivos(calculateDataPasivo(pasivos));
        setPatrimonio(calculateData(patrimonio));
        setData([...activos, ...pasivos, ...patrimonio]);
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
                        <th className="text-left p-2">ESTADO DE SITUACION FINANCIERA</th>
                        <th className="p-2">{new Date().getFullYear() - 4}</th>
                        <th className="p-2">{new Date().getFullYear() - 3}</th>
                        <th className="p-2">{new Date().getFullYear() - 2}</th>
                        <th className="p-2">{new Date().getFullYear() - 1}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-gray-100 text-black">
                        <td className="p-2 border-b font-bold text-center">ACTIVOS</td>
                        <td className="p-2 border-b"></td>
                        <td className="p-2 border-b"></td>
                        <td className="p-2 border-b"></td>
                        <td className="p-2 border-b"></td>
                    </tr>
                    {activos.map((row, rowIndex) => (
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
                    <tr className="bg-gray-100 text-black">
                        <td className="p-2 border-b font-bold text-center">PASIVOS</td>
                        <td className="p-2 border-b"></td>
                        <td className="p-2 border-b"></td>
                        <td className="p-2 border-b"></td>
                        <td className="p-2 border-b"></td>
                    </tr>
                    {pasivos.map((row, rowIndex) => (
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
                    <tr className="bg-gray-100 text-black">
                        <td className="p-2 border-b font-bold text-center">PATRIMONIO</td>
                        <td className="p-2 border-b"></td>
                        <td className="p-2 border-b"></td>
                        <td className="p-2 border-b"></td>
                        <td className="p-2 border-b"></td>
                    </tr>
                    {patrimonio.map((row, rowIndex) => (
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
                       // window.location.href = "/";
                    }} 
                    className="bg-green-500 text-white" 
                    disabled={!activos.some(row => row.calculated)}
                >
                    Siguiente
                </Button>
            </div>
        </div>
    );
}
