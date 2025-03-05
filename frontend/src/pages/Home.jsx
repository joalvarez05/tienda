import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import agregarAlCarrito from "@/utils/agregarAlCarrito";
import { BsArrowUp } from "react-icons/bs";
import useCarritoStore from "@/hooks/useCarritoStore";
import useProductoStore from "@/hooks/useProductoStore";
import { getProductos } from "@/utils/getProductos";

function Home() {
  const [ordenar, setOrdenar] = useState("Filtrar");
  const [searchValue, setSearchValue] = useState("");
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [carro, setCarro] = useState(false);
  const { productoStore, setProductoStore } = useProductoStore(
    (state) => state
  );
  const { setCarritoStore } = useCarritoStore((state) => state);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const productos = await getProductos();
        setProductoStore(productos);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
        console.error("Error al cargar productos:", error);
      }
    };
    fetchProductos();
  }, [setProductoStore]);

  useEffect(() => {
    if (productoStore.length > 0) {
      let filtrados = productoStore.filter((prod) =>
        prod.marca.toLowerCase().includes(searchValue.toLowerCase())
      );

      if (ordenar === "Mayor precio") {
        filtrados = filtrados.sort((a, b) => b.precio - a.precio);
      } else if (ordenar === "Menor precio") {
        filtrados = filtrados.sort((a, b) => a.precio - b.precio);
      }

      setProductosFiltrados(filtrados);
    }
  }, [searchValue, productoStore, ordenar]);

  const agregarAlCarritoHandler = (producto) => {
    agregarAlCarrito(producto, setCarritoStore);
    setCarro(!carro);
  };

  return (
    <main className="pt-3 pb-5 margen-superior">
      <a href="#top" className="go-top d-flex">
        <BsArrowUp />
      </a>
      <Toaster position="top-center" reverseOrder={true} />

      <section className="container pb-2 d-flex sm-bottom">
        <div className="text-center w-100">
          <input
            id="search"
            type="search"
            value={searchValue}
            placeholder="Buscar por marca..."
            onChange={(e) => setSearchValue(e.target.value)}
            className="inp-search"
          />
        </div>
        <div className="d-flex justify-content-end sm">
          <div className="dropdown">
            <button
              type="button"
              className="btn btn-outline-dark dropdown-toggle open-sans fw-medium"
              aria-expanded="false"
              data-bs-toggle="dropdown"
            >
              {ordenar}
            </button>
            <ul className="dropdown-menu oswald">
              {["Relevancia", "Mayor precio", "Menor precio"].map((opcion) => (
                <li key={opcion}>
                  <button
                    className="dropdown-item"
                    onClick={() => setOrdenar(opcion)}
                  >
                    {opcion}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="container">
        <section className="mt-4">
          <article id="productos">
            <div className="row container-mid justify-content-center">
              {isLoading ? (
                <p>Cargando productos...</p>
              ) : isError ? (
                <p>Hubo un error al cargar los productos.</p>
              ) : productosFiltrados.length > 0 ? (
                productosFiltrados.map((prod, index) => (
                  <div
                    className="row tarjeta border py-2 rounded-3 pt-lg-3 col-md-6 col-lg-4 me-lg-2 me-sm-0"
                    key={prod.id}
                  >
                    <div className="col-4 p-0 col-md-4 col-lg-4 pt-3 m-0">
                      <img
                        src={prod.imagen}
                        className="card-img-top rounded-3"
                        alt={prod.descripcion}
                        loading={index < 3 ? "eager" : "lazy"}
                        fetchpriority={index < 3 ? "high" : "auto"}
                      />
                    </div>
                    <div className="col-8 col-lg-8 col-md-3 card-body d-flex text-center">
                      <span className="card-text pt-1 fw-semibold">
                        {prod.marca}
                      </span>
                      <span className="texto-secundario open-sans fw-medium">
                        {prod.descripcion}
                      </span>
                      <span className="card-text fw-bold open-sans ">
                        ${prod.precio}
                      </span>
                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          className="btn btn-sm btn-success fw-medium d-block d-sm-none"
                          onClick={() => agregarAlCarritoHandler(prod)}
                        >
                          Agregar al carrito
                        </button>
                        <button
                          type="button"
                          className="btn btn-success d-none d-sm-block"
                          onClick={() => agregarAlCarritoHandler(prod)}
                        >
                          Agregar al carrito
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No hay productos disponibles</p>
              )}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}

export default Home;
