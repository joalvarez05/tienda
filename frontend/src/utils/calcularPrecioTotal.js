import formatoPesoArgentino from "./formateoMoneda.js";

export const calcularPrecioTotal = (carritoStore) => {
  const total = carritoStore.reduce((total, prod) => {
    const precio = prod.precio;
    const cantidad = prod.cantidad || 1;
    if (precio && !isNaN(precio)) {
      return total + precio * cantidad;
    }
    return total;
  }, 0);

  return formatoPesoArgentino().format(total);
};

export const formatearPrecio = (prod) => {
  const precioTotal = prod.precio * (prod.cantidad || 1);

  const formatoPesoArgentino = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatoPesoArgentino.format(precioTotal);
};
