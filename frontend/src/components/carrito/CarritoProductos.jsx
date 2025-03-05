import useCarritoStore from "@/hooks/useCarritoStore";
import { IoTrash } from "react-icons/io5";
import { formatearPrecio } from "@/utils/calcularPrecioTotal";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function CarritoProductos() {
  const navigate = useNavigate();
  const carritoStore = useCarritoStore((state) => state.carritoStore);
  const setCarritoStore = useCarritoStore((state) => state.setCarritoStore);
  console.log(carritoStore);

  const eliminarProducto = async (prod) => {
    const resultado = await Swal.fire({
      icon: "question",
      title: "Este producto será eliminado.",
      text: "¿Deseas eliminar este producto?",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (resultado.isConfirmed) {
      const nuevoCarrito = carritoStore.filter((item) => item.id !== prod.id);
      setCarritoStore(nuevoCarrito);
      toast.success("Producto eliminado de tu carrito");
    }
  };

  const handleCantidadProducto = (prod, tipo) => {
    const nuevoCarrito = carritoStore
      .map((item) => {
        if (item.id === prod.id) {
          const nuevaCantidad =
            tipo === "incrementar" ? item.cantidad + 1 : item.cantidad - 1;

          return nuevaCantidad > 0
            ? { ...item, cantidad: nuevaCantidad }
            : null;
        }
        return item;
      })
      .filter(Boolean);

    setCarritoStore(nuevoCarrito);
  };

  return (
    <div className="w-100">
      <Toaster position="top-center" reverseOrder={true} />

      {carritoStore.length > 0 ? (
        carritoStore.map((prod) => (
          <div
            key={prod.id}
            className="container card sombra mt-lg-2 mt-md-2 mt-1"
          >
            <div className="mt-1 bottom-line">
              <div className="row">
                <div className="col-lg-3 col-3 d-flex justify-content-center">
                  <img
                    src={prod.imagen}
                    alt={prod.descripcion}
                    className="img-carrito"
                  />
                </div>
                <div className="col-lg-9 col-9 mb-lg-1">
                  <div className="mt-2 mt-lg-0 d-flex align-items-center justify-content-between">
                    <h4>{prod.marca}</h4>
                    <div className="btn-quantity-container d-flex align-items-center">
                      <button
                        type="button"
                        title="Disminuir cantidad"
                        className="btn-quantity btn btn-default"
                        onClick={() =>
                          handleCantidadProducto(prod, "decrementar")
                        }
                      >
                        -
                      </button>
                      <span className="p-quantity">{prod.cantidad || 1}</span>
                      <button
                        type="button"
                        title="Aumentar cantidad"
                        className="btn-quantity btn btn-default"
                        onClick={() =>
                          handleCantidadProducto(prod, "incrementar")
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="fw-lighter">{prod.descripcion}</div>
                  {carritoStore.color && (
                    <div className="fw-lighter">Color: {prod.color}</div>
                  )}
                  {carritoStore.color && (
                    <div className="fw-lighter">Talle: {prod.talle}</div>
                  )}
                  <div className="d-flex gap-1 align-items-center justify-content-between">
                    <h5 className="descuento">{formatearPrecio(prod)}</h5>
                    <button
                      type="button"
                      title="Borrar articulo"
                      className="btn btn-danger mb-2 text-white btn-sm titulo"
                      onClick={() => {
                        eliminarProducto(prod);
                      }}
                    >
                      <IoTrash className="mx-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <>
          <div className="d-flex align-items-center justify-content-center flex-column">
            <p className="fw-bold py-2">
              Aún no agregaste productos a tu carrito.
            </p>
            <button onClick={() => navigate(-1)} className="btn btn-primary">
              {" "}
              Ver productos
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CarritoProductos;
