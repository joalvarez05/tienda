const STRAPI_HOST = import.meta.env.VITE_STRAPI_HOST;
const apiToken = import.meta.env.VITE_STRAPI_API_TOKEN;

export function query(url) {
  return fetch(`${STRAPI_HOST}/api/${url}`, {
    headers: {
      Authorization: `Bearer ${apiToken}`,
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
