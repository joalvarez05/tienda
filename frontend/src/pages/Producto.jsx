import React, { useState } from "react";
import productosData from "@/data/productos.json";
function Producto() {
  const [prod, setProd] = useState(productosData);
  console.log(prod);
  return (
    <div>
      <h1>producto </h1>
    </div>
  );
}

export default Producto;
