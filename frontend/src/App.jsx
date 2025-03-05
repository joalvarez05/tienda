import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "@/components/navbar/Navbar";
import Home from "@/pages/Home";
import Footer from "@/components/footer/Footer.jsx";
import Carrito from "@/pages/Carrito.jsx";
import Pedido from "@/pages/Pedido.jsx";
import Producto from "@/pages/Producto.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route path="/carrito" element={<Carrito />}></Route>
        <Route path="/pedido" element={<Pedido />}></Route>
        <Route path="/producto" element={<Producto />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
