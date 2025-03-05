import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Breadcrumb() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const breadcrumbMap = {
    "/carrito": "Mi carrito",
    "/pedido": "Pedido",
  };
  const breadcrumbLabel = breadcrumbMap[path] || "Inicio";

  const productosLabel =
    path === "/carrito"
      ? "Productos"
      : path === "/pedido"
      ? "Carrito"
      : "Productos";

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item text-decoration-none">
          <span
            className="titulo"
            onClick={handleGoBack}
            style={{
              cursor: "pointer",
            }}
          >
            {productosLabel}
          </span>
        </li>
        <li
          className="breadcrumb-item texto-secundario active"
          aria-current="page"
        >
          {breadcrumbLabel}
        </li>
      </ol>
    </nav>
  );
}

export default Breadcrumb;
