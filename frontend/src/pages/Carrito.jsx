import CarritoProductos from "@/components/carrito/CarritoProductos";
import CarritoCantidad from "@/components/carrito/CarritoCantidad";
import useCarritoStore from "@/hooks/useCarritoStore";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import Navbar from "@/components/navbar/Navbar.jsx";
import { useCarritoWatcher } from "@/hooks/useCarritoStore";

function Carrito() {
  useCarritoWatcher();

  const carritoStore = useCarritoStore((state) => state.carritoStore);
  let cantidadItems = carritoStore.length;

  return (
    <>
      <Navbar></Navbar>
      <section className="pt-3 pb-5 bg-light" id="carrito">
        <div className="container">
          <Breadcrumb></Breadcrumb>

          <h2 className="text-center py-1 oswald"> Mi Carrito </h2>
          <div>
            {cantidadItems <= 0 ? (
              ""
            ) : (
              <p className="fw-medium open-sans">{`${cantidadItems} items`}</p>
            )}
          </div>
          <div className="row">
            <div className="col-12 col-md-7 col-lg-8 d-flex justify-content-center mt-1 ">
              <CarritoProductos></CarritoProductos>
            </div>
            <div className="col-12 col-md-5 col-lg-4 mt-1">
              <CarritoCantidad></CarritoCantidad>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Carrito;
