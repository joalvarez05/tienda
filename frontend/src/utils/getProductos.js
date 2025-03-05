import { query } from "./strapi";
const STRAPI_HOST = import.meta.env.VITE_STRAPI_HOST;

export function getProductos() {
  return query("productos?populate=imagenProducto")
    .then((res) => {
      return res.data.map((prod) => {
        const {
          cantidad,
          color,
          descripcion,
          id,
          marca,
          precio,
          talle,
          imagenProducto,
        } = prod;
        const imagen = `${STRAPI_HOST}${imagenProducto.url}`;

        return {
          cantidad,
          color,
          descripcion,
          id,
          marca,
          precio,
          talle,
          imagen,
        };
      });
    })
    .catch((error) => {
      console.error("Error al obtener los productos:", error);
      throw error;
    });
}
