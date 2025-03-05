import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useCarritoStore from "@/hooks/useCarritoStore";

const agregarAlCarrito = (producto) => {
  if (!producto) {
    console.warn("Producto inválido");
    return;
  }

  const { carritoStore, setCarritoStore } = useCarritoStore.getState();

  const tiempoActual = Date.now();

  const existe = carritoStore.some((item) => item.id === producto.id);

  if (existe) {
    Swal.fire({
      icon: "question",
      title: "Este producto ya está en el carrito.",
      text: "¿Deseas agregar otra unidad?",
      showCancelButton: true,
      confirmButtonText: "Sí, agregar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const carritoActualizado = carritoStore.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );

        setCarritoStore(carritoActualizado);
        toast.success("Producto agregado a tu carrito");
      }
    });

    return;
  }

  const carritoActualizado = [
    ...carritoStore,
    { ...producto, cantidad: 1, fechaDeAgregado: tiempoActual },
  ];

  setCarritoStore(carritoActualizado);
  toast.success("Producto agregado correctamente");
};

export default agregarAlCarrito;
