// import toast from "react-hot-toast";

// export const iniciarLimpiezaCarrito = (setCarritoStore) => {
//   setInterval(() => {
//     const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
//     if (carritoGuardado.length === 0) return;

//     const tiempoActual = Date.now();
//     const tiempoLimite = 8000;

//     const carritoExpirado = carritoGuardado.every(
//       (item) => tiempoActual - item.fechaDeAgregado > tiempoLimite
//     );

//     if (carritoExpirado) {
//       toast.error("Tu carrito ha expirado ! ");
//       localStorage.removeItem("carrito");
//       setCarritoStore([]);
//     }
//   }, 5000);
// };

// export default iniciarLimpiezaCarrito;
