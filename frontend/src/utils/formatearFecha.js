export const horaActual = () => {
  const ahora = new Date();

  const dia = String(ahora.getDate()).padStart(2, "0");
  const mes = String(ahora.getMonth() + 1).padStart(2, "0");
  const anio = String(ahora.getFullYear()).slice(2);

  const horas = String(ahora.getHours()).padStart(2, "0");
  const minutos = String(ahora.getMinutes()).padStart(2, "0");

  const fechaYHora = `${dia}/${mes}/${anio} - ${horas}:${minutos}hs`;
  return fechaYHora;
};

export default horaActual;
