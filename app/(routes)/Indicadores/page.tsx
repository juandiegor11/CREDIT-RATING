/* eslint-disable prefer-const */
'use client';
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TablaIndicadores from "./TablaIndicadores";
import { getIndicadoresByClient } from "@/services/routes/indicadores";

interface Indicador {
  // Define aquí las propiedades esperadas de cada objeto en el arreglo
  id: number;
  nombre: string;
  valor: number;
}

export default function EstadoFinanciero() {
    const [nit, setNit] = useState("");
    const [showTable, setShowTable] = useState(false);
    const [Data, setData] = useState<Indicador[]>([]); // Especifica el tipo del estado

    const handleConsultar = () => {
        if (nit.trim() !== "") {
            debugger;
            getIndicadoresByClient(nit).then((response) => {
                console.log("Response from getIndicadoresByClient:", response);
                if (Array.isArray(response)) {
                    if (response.length === 0) {
                        alert("No se encontraron resultados para el NIT ingresado.");
                    } else {
                        setShowTable(true);
                        setData(response); // Ahora TypeScript no dará error
                    }
                } else {
                    setShowTable(false);
                    alert("No se encontraron resultados para el NIT ingresado.");
                }
            });
            
        } else {
            alert("Por favor, ingrese un NIT válido.");
        }
    };

    return (
        <div className="space-y-4">
            <h1 className="text-xl font-bold m-4">INDICADORES</h1>
            <div className="flex items-center space-x-4">
                <Input
                    type="text"
                    placeholder="Ingrese el NIT"
                    value={nit}
                    onChange={(e) => setNit(e.target.value)}
                    className="w-1/2 m-4"
                />
                <Button onClick={handleConsultar}>Consultar</Button>
            </div>
            {showTable && <TablaIndicadores Data={Data} />}
        </div>
    );
}

