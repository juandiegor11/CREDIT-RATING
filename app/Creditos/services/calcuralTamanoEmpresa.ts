import { getDatosAdminbyAnio } from '@/services/routes/datosAdmin';

export const calcularTamanoEmpresa = async ( clasifEmpresa, value ) => {
  const tipoEmpresa ={
      "Manufacturero": {
        "Micro": 23563,
        "Pequeña": 204995,
        "Mediana": 1736565,
        "Gran Empresa": 1736565
      },
      "Servicios": {
        "Micro": 32988,
        "Pequeña": 131951,
        "Mediana": 483034,
        "Gran Empresa": 483034
      },
      "Comercio": {
        "Micro": 44769,
        "Pequeña": 431196,
        "Mediana": 2160692,
        "Gran Empresa": 2160692
      }
    };
    const Anio = new Date().getFullYear();
    const datosAdmin = await getDatosAdminbyAnio(Anio);
    /*{
      "Id": 19,
      "Variables": "UVT",
      "Anio": "2021",
      "Valor": "47.000"
    }*/
    const lastIncome = datosAdmin.find(dato => dato.Variables === "UVT");
    const valorUVT = lastIncome.Valor? parseFloat(lastIncome.Valor): 0;
    //=+'Presentación 1'!C15/Q8
    const valorcompany = value / valorUVT;
    //set companySize
    let companySize = "";
    if(clasifEmpresa === "Manufacturero"){
      if(valorcompany <= tipoEmpresa.Manufacturero.Micro){
        companySize = "Micro";
      }else if(valorcompany <= tipoEmpresa.Manufacturero.Pequeña){
        companySize = "Pequeña";
      }else if(valorcompany <= tipoEmpresa.Manufacturero.Mediana){
        companySize = "Mediana";
      }else{
        companySize = "Gran Empresa";
      }
    }else if(clasifEmpresa === "Servicios"){
      if(valorcompany <= tipoEmpresa.Servicios.Micro){
        companySize = "Micro";
      }else if(valorcompany <= tipoEmpresa.Servicios.Pequeña){
        companySize = "Pequeña";
      }else if(valorcompany <= tipoEmpresa.Servicios.Mediana){
        companySize = "Mediana";
      }else{
        companySize = "Gran Empresa";
      }
    }else if(clasifEmpresa === "Comercio"){
      if(valorcompany <= tipoEmpresa.Comercio.Micro){
        companySize = "Micro";
      }else if(valorcompany <= tipoEmpresa.Comercio.Pequeña){
        companySize = "Pequeña";
      }else if(valorcompany <= tipoEmpresa.Comercio.Mediana){
        companySize = "Mediana";
      }else{
        companySize = "Gran Empresa";
      }
    }
    return companySize;
  }