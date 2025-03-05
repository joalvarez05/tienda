export const eliminarCarrito = (setCarritoStore) => {
  localStorage.removeItem("carrito");
  setCarritoStore([]);
};
export default eliminarCarrito;
