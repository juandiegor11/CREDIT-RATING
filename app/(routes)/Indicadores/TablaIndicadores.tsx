import React, { useMemo } from 'react'
import { Table } from "@/components/ui/table";

const percentageCategories = [0, 1, 7, 8, 15, 16, 17, 18, 19, 20, 22, 23, 24, 31];

export default function TablaIndicadores(props) {
  console.log("Props received by TablaIndicadores:", props);
  const { Data } = props;

  if (!Array.isArray(Data)) {
    console.error("Expected Data to be an array, but received:", Data);
    return null; // Or handle the error gracefully
  }

  const { data, years }: { data: any[]; years: string[] } = useMemo(() => {
    const yearSet = new Set();

    const rows = Data.map(row => {
      const { Categoria, ...valuesByYear } = row;
      const filteredEntries = Object.entries(valuesByYear)
        .filter(([key, val]) => /^\d{4}$/.test(key) && val !== null);

      filteredEntries.forEach(([key]) => yearSet.add(key));

      const sorted = filteredEntries.sort(([a], [b]) => a.localeCompare(b));
      return {
        category: Categoria,
        values: sorted.map(([, val]) => val),
        editable: false,
        yearLabels: sorted.map(([year]) => year)
      };
    });

    const sortedYears = Array.from(yearSet).sort() as string[];

    return { data: rows, years: sortedYears };
  }, [Data]);

  const formatNumber = (value, categoryId) => {
    if (value === null || value === "") return "";

    if (percentageCategories.includes(categoryId)) {
      // Formatear como porcentaje con un decimal
      return (Number(value) * 100).toFixed(1) + "%";
    } else {
      // Formatear como valor entero con un decimal
      return Number(value).toLocaleString("es-CO", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      });
    }
  };
  return (
    <div>
      <div className="overflow-x-auto p-4">
        <Table className="min-w-full border border-gray-100">
          <thead>
            <tr className="bg-blue-100 text-black">
              <th className="text-left p-3">INDICADORES FINANCIEROS</th>
              {years.map((year) => (
                <th key={year} className="p-2">{year}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <React.Fragment key={rowIndex}>
                {rowIndex === 0 && (
                    <tr key={"ac" + rowIndex} className="bg-gray-100 text-black">
                    <td className="p-2 border-b font-bold text-left" colSpan={years.length + 1}>NIVEL DE ENDEUDAMIENTO</td>
                    </tr>
                )}
                {rowIndex === 11 && (
                    <tr key={"ac" + rowIndex} className="bg-gray-100 text-black">
                    <td className="p-2 border-b font-bold text-left" colSpan={years.length + 1}>TASA EFECTIVA DE FINANCIACIÓN</td>
                    </tr>
                )}
                {rowIndex === 12 && (
                    <tr key={"ac" + rowIndex} className="bg-gray-100 text-black">
                    <td className="p-2 border-b font-bold text-left" colSpan={years.length + 1}>COBERTURA DE LA DEUDA</td>
                    </tr>
                )}
                {rowIndex === 15 && (
                    <tr key={"ac" + rowIndex} className="bg-gray-100 text-black">
                    <td className="p-2 border-b font-bold text-left" colSpan={years.length + 1}>EVOLUCIÓN OPERACIONAL</td>
                    </tr>
                )}
                {rowIndex === 15 && (
                    <tr key={"acd" + rowIndex} className="bg-gray-100 text-black">
                    <td className="p-2 border-b font-bold text-left" colSpan={years.length + 1}>C R E C I M I E N T O</td>
                    </tr>
                )}
                {rowIndex === 17 && (
                    <tr key={"ac" + rowIndex} className="bg-gray-100 text-black">
                    <td className="p-2 border-b font-bold text-left" colSpan={years.length + 1}>M A R G E N E S</td>
                    </tr>
                )}
                {rowIndex === 21 && (
                    <tr key={"ac" + rowIndex} className="bg-gray-100 text-black">
                    <td className="p-2 border-b font-bold text-left" colSpan={years.length + 1}>OTROS</td>
                    </tr>
                )}
                {rowIndex === 22 && (
                    <tr key={"ac" + rowIndex} className="bg-gray-100 text-black">
                    <td className="p-2 border-b font-bold text-left" colSpan={years.length + 1}>RENTABILIDAD</td>
                    </tr>
                )}
                {rowIndex === 27 && (
                    <tr key={"ac" + rowIndex} className="bg-gray-100 text-black">
                    <td className="p-2 border-b font-bold text-left" colSpan={years.length + 1}>ACTIVIDAD</td>
                    </tr>
                )}
                <tr key={rowIndex} className="bg-gray-100 hover:bg-gray-200">
                  <td className="p-2 border-b">{row.category}</td>
                  {years.map((year, colIndex) => {
                    const valueIndex = row.yearLabels?.indexOf(year);
                    const value = valueIndex >= 0 ? row.values[valueIndex] : null;
                    return (
                      <td key={colIndex} className="p-2 border-b text-right">
                        <span>{formatNumber(value, rowIndex)}</span>
                      </td>
                    );
                  })}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}
