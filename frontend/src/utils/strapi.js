const STRAPI_HOST = import.meta.env.VITE_STRAPI_HOST;
const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_TOKEN;

export function query(url) {
  return fetch(`${STRAPI_HOST}/api/${url}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        console.error(
          "Error en la respuesta de la API:",
          res.status,
          res.statusText
        );
        throw new Error(
          `Error en la consulta: ${res.status} ${res.statusText}`
        );
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error al hacer la solicitud:", error);
      throw error;
    });
}
