import React, { createContext, useContext, useState, useEffect } from "react";
//import { DataEstadoR } from "./dataEstadoR";

// Obtener los últimos 4 años
const currentYear = new Date().getFullYear();
const lastFourYears = [currentYear - 4, currentYear - 3, currentYear - 2, currentYear - 1];

interface YearsContextType {
  years: number[];
  selectedYears: Record<number, boolean>;
  toggleYear: (year: number) => void;
  resetYears: () => void; // Nueva función para reiniciar la selección
  dataEstadoR: any[];
  setDataEstadoR: React.Dispatch<React.SetStateAction<any[]>>;
  clearDataEstadoR: () => void;
  añadirDataEstadoR: (data: any) => void;
}

// Crear contexto
const YearsContext = createContext<YearsContextType | undefined>(undefined);

// Hook para acceder al contexto
export const useYears = () => {
  const context = useContext(YearsContext);
  if (!context) {
    throw new Error("useYears debe usarse dentro de un YearsProvider");
  }
  return context;
};

// Proveedor del contexto
export const YearsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedYears, setSelectedYears] = useState<Record<number, boolean>>({});
  const [hydrated, setHydrated] = useState(false);
  const [dataEstadoR, setDataEstadoR] = useState([]);
  const clearDataEstadoR = () => setDataEstadoR([]);

  useEffect(() => {
    const storedYears = localStorage.getItem("selectedYears");
    const storedDataEstadoR = localStorage.getItem("dataEstadoR");
    if (storedDataEstadoR) {
      setDataEstadoR(JSON.parse(storedDataEstadoR));
    }
    if (storedYears) {
      setSelectedYears(JSON.parse(storedYears));
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("selectedYears", JSON.stringify(selectedYears));
      localStorage.setItem("dataEstadoR", JSON.stringify(dataEstadoR));
    }
  }, [selectedYears, hydrated]);

  const toggleYear = (year: number) => {
    setSelectedYears((prev) => ({
      ...prev,
      [year]: !prev[year],
    }));
  };

  const añadirDataEstadoR = (data: any) => {
    setDataEstadoR( dataEstadoR.concat(data))
  }

  // Nueva función para resetear la selección
  const resetYears = () => {
    setSelectedYears({});
    localStorage.removeItem("selectedYears");
  };

  return (
    <YearsContext.Provider value={{ years: lastFourYears, selectedYears, toggleYear, resetYears,dataEstadoR, setDataEstadoR, clearDataEstadoR, añadirDataEstadoR }}>
      {children}
    </YearsContext.Provider>
  );
};
