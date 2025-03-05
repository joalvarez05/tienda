import React from "react";
import "./carrito.css";
import useCarritoStore from "@/hooks/useCarritoStore";
import { calcularPrecioTotal } from "@/utils/calcularPrecioTotal.js";
import { Link } from "react-router-dom";
function CarritoCantidad() {
  const carritoStore = useCarritoStore((state) => state.carritoStore);
  const total = calcularPrecioTotal(carritoStore);

  const handleRedirection = (e) => {
    if (carritoStore.length === 0) {
      e.preventDefault();
    }
  };

  return (
    <div className="text-center w-100">
      <div className="container mt-3 mt-lg-1 card">
        <div className="mt-2 bottom-line pb-3">
          <h3 className="pb-5 pt-3 oswald">Resumen de tu pedido: </h3>
          {carritoStore.length > 0 ? (
            <h4 className="fs-5 d-flex justify-content-between pt-3 pb-3">
              Total estimado: <span className="fw-bold fs-5">{total}</span>
            </h4>
          ) : (
            ""
          )}

          <Link to="/pedido" onClick={handleRedirection}>
            <button
              type="button"
              className="btn btn-success w-100 fw-bold open-sans"
              disabled={carritoStore.length === 0}
            >
              Confirmar pedido
            </button>
          </Link>
        </div>
        <div className="accordion accordion-flush" id="accordionFlushExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                ¿ Necesitas ayuda ?
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body open-sans fw-medium">
                Para ayuda, consulta la información del comercio y contáctalos
                directamente.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwo"
                aria-expanded="false"
                aria-controls="flush-collapseTwo"
              >
                Paga Seguro
              </button>
            </h2>
            <div
              id="flush-collapseTwo"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body open-sans fw-medium">
                La seguridad es nuestra prioridad. Te conectaremos directamente
                con el comercio para que uses sus métodos de pago de forma
                segura.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarritoCantidad;
