import { query } from "./strapi";
const STRAPI_HOST = import.meta.env.VITE_STRAPI_HOST;

export function getEmpresaInfo() {
  return query("home?populate=logoEmpresa").then((res) => {
    const {
      empresa,
      descripcionSuperior,
      direccion,
      ciudad,
      telefono,
      email,
      instagram,
      horarioAperturaLunesViernes,
      horarioCierreLunesViernes,
      horarioAperturaFinDeSemana,
      horarioCierreFinDeSemana,
      logoEmpresa,
    } = res.data;
    const imagen = `${STRAPI_HOST}${logoEmpresa.url}`;
    return {
      empresa,
      descripcionSuperior,
      direccion,
      ciudad,
      telefono,
      email,
      instagram,
      imagen,
      horarioAperturaLunesViernes,
      horarioCierreLunesViernes,
      horarioAperturaFinDeSemana,
      horarioCierreFinDeSemana,
    };
  });
}
