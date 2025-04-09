interface Indicador {
  category: string;
  editable: boolean;
  values: { year: number; value: number }[]; // Define el tipo de `values`
}

export function createDataIndicadores(Balance, selectedYears, years, ClientId, partialMonth) {

    const Indicadores: Indicador[] = [
        { category: "Total Pasivo / Total Activo", editable: true, values: [] },
        { category: "Total Pasivo / (Total Activo - Valorizaciones)", editable: true, values: [] },
        { category: "Total Pasivo / Total Patrimonio", editable: true, values: [] },
        { category: "Total Pasivo / Total Patrimonio (Excluye Valorizaciones)", editable: true, values: [] },
        { category: "Total Pasivos / Ebitda", editable: true, values: [] },
        { category: "Obligaciones Financieras / Ebitda", editable: true, values: [] },
        { category: "Obligaciones Financieras / Efectivo Neto Operacional", editable: true, values: [] },
        { category: "Obligaciones Financieras / Ventas", editable: true, values: [] },
        { category: "Concentración deuda Corto Plazo (%)", editable: true, values: [] },
        { category: "Saldo Obligaciones Financieras", editable: true, values: [] },
        { category: "Obligaciones Contingentes por Leasing", editable: true, values: [] },
        { category: "Gastos por deuda Financiera / Obligaciones Financieras (Promedio)", editable: true, values: [] },
        { category: "Ebitda / Gastos Financieros", editable: true, values: [] },
        { category: "Ebitda / Gastos Financieros + Amortización de Capital", editable: true, values: [] },
        { category: "Utilidad Operacional / Gastos Financieros", editable: true, values: [] },
        { category: "Evolución de Ventas (% Crecimiento)", editable: true, values: [] },
        { category: "Crecimiento Gasto Administración (% Crecimiento)", editable: true, values: [] },
        { category: "Margen Ebitda", editable: true, values: [] },
        { category: "Margen Bruto", editable: true, values: [] },
        { category: "Margen Operacional", editable: true, values: [] },
        { category: "Margen Neto", editable: true, values: [] },
        { category: "Ventas / Patrimonio", editable: true, values: [] },
        { category: "ROA", editable: true, values: [] },
        { category: "ROE", editable: true, values: [] },
        { category: "Margen Neto (Rentabilidad)", editable: true, values: [] },
        { category: "Rotación de Activo (Ventas / Activos Totales)", editable: true, values: [] },
        { category: "Apalancamiento (Activos / Patrimonio)", editable: true, values: [] },
        { category: "Rotación de Cartera (Días Ventas)", editable: true, values: [] },
        { category: "Rotación de Inventarios (Días Costo de Ventas)", editable: true, values: [] },
        { category: "Rotación de Proveedores (Días Costo de Ventas)", editable: true, values: [] },
        { category: "Ciclo Operacional", editable: true, values: [] },
        { category: "Capital de Trabajo Operativo / Ventas", editable: true, values: [] },
        { category: "Capital de Trabajo Operativo / Obligaciones Fin. C.P", editable: true, values: [] },
        { category: "Capital de Trabajo Operativo / Obligaciones Fin. Totales", editable: true, values: [] },
    ];
    const parseNumber = (value) => {
        return value.replace(/[^0-9-]/g, "");
    };

    // Helper function to get the value for a specific category and year
    function getValueFromBalance(categoryId, year) {
        const category = Balance.find(item => item.idcategory === categoryId);
        if (!category) return null;
        const yearData = category.values.find(value => value.year === year);
        return yearData ? yearData.value : null;
    }

    function formatNumber(value) {
        if (value === 0) return 0; // Manejo del cero como 0
        let rounded = Math.abs(value); // Redondea al entero más cercano  
        if (value < 0) {
            return rounded; // Usa paréntesis para números negativos
        }
        
        return rounded;
    }

    // Single loop to calculate all indicators for selected years
    years.forEach((year, index) => {
        if (!selectedYears[year]) return; // Saltar años no seleccionados

        const totalPasivo = (getValueFromBalance("221", year) || 0);
        const totalpasivocorriente = (getValueFromBalance("218", year) || 0);
        const totalActivo = (getValueFromBalance("213", year) || 0);
        const valorizaciones = (getValueFromBalance("212", year) || 0);
        const totalPatrimonio = (getValueFromBalance("232", year) || 0);
        const ajustesValorizaciones = (getValueFromBalance("229", year) || 0);
        const ebitda = (getValueFromBalance("111", year) || 0);
        const efectivoNeto = (getValueFromBalance("20", year) || 0);
        const ventas = (getValueFromBalance("10", year) || 0);
        const ventasAnterior = index !=0 ? getValueFromBalance("10", years[index - 1]) : 0;
        const gastosAdministracion = (getValueFromBalance("15", year) || 0);
        const gastosAdministracionAnterior = index !=0 ? getValueFromBalance("15", years[index - 1]) : 0;
        const obligacionesFinancierasCP = (getValueFromBalance("214", year) || 0);
        const obligacionesFinancierasLP = (getValueFromBalance("219", year) || 0);
        const gastosFinancieros = (getValueFromBalance("114", year) || 0);
        const utilidadOperacional = (getValueFromBalance("111", year) || 0);
        const utilidadNeta = (getValueFromBalance("120", year) || 0);
        const cartera = (getValueFromBalance("22", year) || 0);
        const inventarios = (getValueFromBalance("23", year) || 0);
        const proveedores = (getValueFromBalance("216", year) || 0);
        const costodeventas = (getValueFromBalance("11", year) || 0);
        const SCORING30 = (getValueFromBalance("25", year) || 0) - totalpasivocorriente;
        const Mes = partialMonth > 0 ? partialMonth : 12;
        const efectivoNetoOperacional = ( 
            getValueFromBalance("17", year) - getValueFromBalance("18", year) - getValueFromBalance("10", year) - getValueFromBalance("12", year) + 
            getValueFromBalance("17", year) + getValueFromBalance("18", year)) + ((getValueFromBalance("17", year) || 0) - (getValueFromBalance("18", year) || 0) - getValueFromBalance("29",year) ); // Efectivo Neto Operacional
        //lebigda = ((BALANCES!D17-BALANCES!D18-BALANCES!D10-BALANCES!D12+BALANCES!D17+BALANCES!D18))
       // efectivo netoop = ((BALANCES!17-BALANCES!18-BALANCES!10-BALANCES!12+BALANCES!17+BALANCES!18)) +((G17 + G18)-G29)
       
        const obligacionesFinancieras = (obligacionesFinancierasCP || 0) + (obligacionesFinancierasLP || 0);

        // Calcular indicadores
        Indicadores[0].values.push({ year, value: totalActivo ? totalPasivo / totalActivo : 0 }); // Total Pasivo / Total Activo
        Indicadores[1].values.push({ year, value: totalActivo - valorizaciones !=0 ? totalPasivo / (totalActivo - valorizaciones) : 0 }); // Total Pasivo / (Total Activo - Valorizaciones)
        Indicadores[2].values.push({ year, value: totalPatrimonio ? totalPasivo / totalPatrimonio : 0 }); // Total Pasivo / Total Patrimonio
        Indicadores[3].values.push({ year, value: totalPatrimonio - ajustesValorizaciones !=0 ? totalPasivo / (totalPatrimonio - ajustesValorizaciones) : 0 }); // Total Pasivo / Total Patrimonio (Excluye Valorizaciones)
        Indicadores[4].values.push({ year, value: totalPasivo != 0  && ebitda != 0 ? totalPasivo / ebitda : 0 }); // Total Pasivos / Ebitda
        Indicadores[5].values.push({ year, value: ebitda !=0 && (obligacionesFinancierasCP + obligacionesFinancierasLP) !=0 ? (obligacionesFinancierasCP + obligacionesFinancierasLP) / ebitda : 0 }); // Obligaciones Financieras / Ebitda
        Indicadores[6].values.push({ year, value: efectivoNetoOperacional !=0 && (obligacionesFinancierasCP + obligacionesFinancierasLP) ? (obligacionesFinancierasCP + obligacionesFinancierasLP) / efectivoNeto : 0 }); // Obligaciones Financieras / Efectivo Neto Operacional
        Indicadores[7].values.push({ year, value: obligacionesFinancierasCP + obligacionesFinancierasLP !=0 ? ((obligacionesFinancierasCP + obligacionesFinancierasLP) / ventas) : 0}); // Obligaciones Financieras / Ventas
        Indicadores[8].values.push({ year, value: obligacionesFinancierasCP + obligacionesFinancierasLP !=0 ? (obligacionesFinancierasCP/(obligacionesFinancierasCP + obligacionesFinancierasLP)) : 0}); // Concentración deuda Corto Plazo (%)    
        Indicadores[9].values.push({ year, value: obligacionesFinancierasCP + obligacionesFinancierasLP }); // Saldo Obligaciones Financieras
        Indicadores[10].values.push({ year, value: 0 }); // Obligaciones Contingentes por Leasing
        Indicadores[11].values.push({ year, value: obligacionesFinancierasCP + obligacionesFinancierasLP  !=0 ? (gastosFinancieros /(obligacionesFinancierasCP + obligacionesFinancierasLP)) : 0 }); // Gastos por deuda Financiera / Obligaciones Financieras (Promedio)
        Indicadores[12].values.push({ year, value: gastosFinancieros !=0 ? ebitda / gastosFinancieros : 0 }); // Ebitda / Gastos Financieros
        Indicadores[13].values.push({ year, value: 0 }); // Ebitda / Gastos Financieros + Amortización de Capital
        Indicadores[14].values.push({ year, value: utilidadOperacional && gastosFinancieros !=0 ? utilidadOperacional / gastosFinancieros : 0 }); // Utilidad Operacional / Gastos Financieros
        Indicadores[15].values.push({
            year,
            value: year === Math.max(...years) ?  
                (ventas-ventasAnterior != 0) && ventasAnterior > 0 ? ((ventas / Mes) - (ventasAnterior / 12)) / (ventasAnterior / 12) : 0 
            :  (ventas-ventasAnterior != 0) && ventasAnterior > 0 ? ((ventas - ventasAnterior)/ventasAnterior) : 0
        }); // Evolución de Ventas (% Crecimiento)
        Indicadores[16].values.push({
            year,
            value: year === Math.max(...years) ? 
                ((gastosAdministracion - gastosAdministracionAnterior != 0) && gastosAdministracionAnterior > 0  ? ((gastosAdministracion / Mes) - (gastosAdministracionAnterior / 12)) / (gastosAdministracionAnterior / 12) : 0)
            : ((gastosAdministracion - gastosAdministracionAnterior != 0) && gastosAdministracionAnterior > 0  ? ((gastosAdministracion - gastosAdministracionAnterior)/gastosAdministracionAnterior) : 0)
        }); // Crecimiento Gasto Administración (% Crecimiento)
        Indicadores[17].values.push({ year, value: 0.116 }); // Margen Ebitda
        Indicadores[18].values.push({ year, value: (ventas - costodeventas)&&(ventas !=0) ? (ventas - costodeventas) / ventas : 0 }); // Margen Bruto
        Indicadores[19].values.push({ year, value: ventas !=0 && utilidadOperacional !=0 ? utilidadOperacional / ventas : 0 }); // Margen Operacional
        Indicadores[20].values.push({ year, value: ventas !=0 && utilidadNeta !=0  ? utilidadNeta / ventas : 0 }); // Margen Neto
        Indicadores[21].values.push({ year, value: ventas !=0 && totalPatrimonio !=0 ? ventas / totalPatrimonio : 0 }); // Ventas / Patrimonio
        Indicadores[22].values.push({ year, value: utilidadNeta!=0 && totalActivo !=0 ? utilidadNeta / totalActivo : 0 }); // ROA
        Indicadores[23].values.push({ year, value: totalPatrimonio !=0 && utilidadNeta !=0? utilidadNeta / totalPatrimonio : 0 }); // ROE
        Indicadores[24].values.push({ year, value: ventas !=0 && utilidadNeta !=0 ? utilidadNeta / ventas : 0 }); // Margen Neto (Rentabilidad)
        Indicadores[25].values.push({ year, value: totalActivo !=0 && ventas !=0? ventas / totalActivo : 0 }); // Rotación de Activo (Ventas / Activos Totales)
        Indicadores[26].values.push({ year, value: totalPatrimonio!=0 && totalPatrimonio !=0 ? totalActivo / totalPatrimonio : 0 }); // Apalancamiento (Activos / Patrimonio)
        
        let val27 = year === Math.max(...years) ? 
            (ventas!=0 && cartera *(30 * Mes ) !=0 ? (cartera * (30 * Mes)) / ventas : 0)
        : (ventas!=0 && cartera * 360 != 0 ? (cartera * 360) / ventas : 0)
        Indicadores[27].values.push({ year, value: val27}); // Rotación de Cartera (Días Ventas)
        
        let val28 = year === Math.max(...years) ? 
            costodeventas!=0 && inventarios*(30 * Mes)!=0 ? (inventarios * (30 * Mes)) / costodeventas : 0
        : costodeventas!=0 && inventarios*360!=0 ? (inventarios * 360) / costodeventas : 0;
        Indicadores[28].values.push({ year, value: val28 }); // Rotación de Inventarios (Días Costo de Ventas)

        let val29 = year === Math.max(...years) ? 
            costodeventas!=0 && proveedores*(30 * Mes)!=0 ? (proveedores * (30 * Mes)) / costodeventas : 0
        : costodeventas!=0 && proveedores*360!=0 ? (proveedores * 360) / costodeventas : 0;
        Indicadores[29].values.push({ year, value: val29 }); // Rotación de Proveedores (Días Costo de Ventas)

        let ciclop = val27 + val28 - val29;
        Indicadores[30].values.push({year,value: ciclop ?  formatNumber(ciclop) : 0}); // Ciclo Operacional
        
        Indicadores[31].values.push({ year, value: ventas!=0 && SCORING30!=0 ? SCORING30 / ventas : 0 }); // Capital de Trabajo Operativo / Ventas

        let capobl = obligacionesFinancierasCP!=0 && SCORING30!=0 ? SCORING30 / obligacionesFinancierasCP : 0 ;
        Indicadores[32].values.push({ year, value: capobl ? formatNumber(capobl) : 0 }); // Capital de Trabajo Operativo / Obligaciones Fin. C.P

        let capotot = obligacionesFinancieras!=0 && SCORING30!=0 ? SCORING30 / obligacionesFinancieras : 0 ;;
        Indicadores[33].values.push({ year, value: capotot ? formatNumber(capotot) : 0 }); // Capital de Trabajo Operativo / Obligaciones Fin. Totales
    });

    const formattedData = Indicadores.map((row, rowIndex) => ({
        category: row.category,
        Cliente_id: ClientId ? parseNumber(ClientId) : null,
        idcategory: `${rowIndex}`,
        values: row.values
    }));

    return formattedData;
}

//createDataIndicadores(Balance,selectedYears,years,"21")