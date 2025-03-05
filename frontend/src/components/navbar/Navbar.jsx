import "./navbar.css";
import { Link } from "react-router-dom";
import { BsCart3, BsTelephone, BsGeoAlt } from "react-icons/bs";
import { FaWhatsapp, FaInstagram, FaRegClock, FaRoad } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import ContactInfo from "@/components/navbar/Contacto.jsx";
import { getEmpresaInfo } from "@/utils/getEmpresaInfo";
import { useState, useEffect } from "react";
import useEmpresaStore from "@//hooks/useEmpresaStore";
import CuentaRegresiva from "@/components/cuentaRegresiva/CuentaRegresiva";
import useCarritoStore from "@/hooks/useCarritoStore";

function Navbar() {
  const [cuentaRegresiva, setCuentaRegresiva] = useState(false);
  const { carritoStore } = useCarritoStore();
  const { empresaActual, setEmpresaActual } = useEmpresaStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const totalCantidad = carritoStore
    .map((item) => item.cantidad)
    .reduce((acc, cantidad) => acc + cantidad, 0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEmpresaInfo();
        setEmpresaActual(data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
        console.log("Error", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (carritoStore.length > 0) {
      setCuentaRegresiva(true);
    } else {
      setCuentaRegresiva(false);
    }
  }, [carritoStore]);

  const formatTime = (time) => {
    if (!time) return "";
    const [hour, minute] = time.split(":");
    return `${hour}:${minute}`;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error al cargar la información</div>;
  }

  const {
    empresa,
    descripcionSuperior,
    direccion,
    ciudad,
    telefono,
    email,
    instagram,
    horarioAperturaLunesViernes,
    horarioCierreLunesViernes,
    horarioAperturaFinDeSemana,
    horarioCierreFinDeSemana,
    imagen,
  } = empresaActual;

  const horarioLunesViernesApertura = formatTime(horarioAperturaLunesViernes);
  const horarioLunesViernesCierre = formatTime(horarioCierreLunesViernes);
  const horarioFinDeSemanaApertura = formatTime(horarioAperturaFinDeSemana);
  const horarioFinDeSemanaCierre = formatTime(horarioCierreFinDeSemana);

  return (
    <div>
      <div className="lavanda-str pt-1 d-flex justify-content-center align-items-center hide-on-mobile-md">
        {empresaActual && descripcionSuperior && (
          <span className="fs-5 py-1 fw-medium open-sans lettering-space">
            {descripcionSuperior}
          </span>
        )}
      </div>
      <header className="underline-nav" id="top">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid py-3 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <button
                className="navbar-toggler d-lg-none"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#sidebarNav"
                aria-controls="sidebarNav"
                aria-label="Desplegar modal"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="ms-5">
                <button
                  type="button"
                  className="btn btn-outline-magenta sm-hidden open-sans fw-medium"
                  data-bs-toggle="modal"
                  data-bs-target="#infoModal"
                >
                  Acerca de <span className="fw-bold">{empresa}</span>
                </button>

                <div
                  className="modal fade"
                  id="infoModal"
                  tabIndex="-1"
                  aria-labelledby="infoModalLabel"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content custom-modal">
                      <div className="modal-header">
                        <h5 className="modal-title" id="infoModalLabel">
                          Sobre Nosotros
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <ul className="list-unstyled">
                          <li>
                            <strong>📍 Dirección:</strong> {direccion}
                          </li>
                          <li>
                            <strong>🏙️ Ciudad:</strong> {ciudad}
                          </li>
                          <li>
                            <strong>📞 Teléfono:</strong> {telefono}
                          </li>
                          <li>
                            <strong>📧 Email:</strong> {email}
                          </li>
                          {instagram && (
                            <li>
                              <span className="fw-bold">
                                <FaInstagram size={19} /> Instagram:{" "}
                              </span>
                              <a
                                className="text-decoration-none text-black"
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`https://www.instagram.com/${instagram}`}
                              >
                                {" "}
                                Acequiones
                              </a>
                            </li>
                          )}
                          <li>
                            <strong>🕒 Horarios:</strong> Lunes a viernes:{" "}
                            <span>
                              {horarioLunesViernesApertura} -{" "}
                              {horarioLunesViernesCierre}{" "}
                            </span>
                            <br />
                            Sabado y Domingo:{" "}
                            <span>
                              {horarioFinDeSemanaApertura} -{" "}
                              {horarioFinDeSemanaCierre}{" "}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="logo-brand">
                <img
                  src={imagen || <RxAvatar />}
                  title={empresa || "logo"}
                  alt={`logo de ${empresa || "empresa"}`}
                  style={{ maxWidth: "50px", borderRadius: "50%" }}
                />
              </div>
            </div>
            <div className="carritoFix">
              <Link to="/carrito" className="mx-4 position-relative">
                <BsCart3 color="black" size={24} aria-label="Ir al carrito" />
                {totalCantidad > 0 && (
                  <div
                    className="position-absolute top-0 start-100 translate-middle rounded-circle d-flex justify-content-center align-items-center"
                    style={{
                      width: "18px",
                      height: "18px",
                      backgroundColor: "#4f39f6",
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "bold",
                      border: "2px solid white",
                    }}
                  >
                    {totalCantidad}
                  </div>
                )}
              </Link>
              {cuentaRegresiva && (
                <div className="position-relative">
                  <CuentaRegresiva timeLeft={1500} />
                </div>
              )}
            </div>
          </div>
          <div
            className="offcanvas offcanvas-start rounded-3 w-365"
            tabIndex="-1"
            id="sidebarNav"
            aria-labelledby="sidebarNavLabel"
          >
            <div className="offcanvas-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Cerrar modal"
              ></button>
            </div>
            <div className="offcanvas-body mt-5">
              <ul className="navbar-nav">
                <li className="nav-item hide-on-desktop mb-4">
                  <h2 className="titulo text-center oswald">{empresa}</h2>
                </li>
                <ContactInfo
                  icon={<FaWhatsapp />}
                  label="WhatsApp"
                  value={telefono}
                />
                <ContactInfo
                  icon={<BsTelephone />}
                  label="Teléfono"
                  value={telefono}
                />
                <ContactInfo
                  icon={<FaRoad />}
                  label="Dirección"
                  value={direccion}
                />
                <ContactInfo
                  icon={<BsGeoAlt />}
                  label="Dirección"
                  value={ciudad}
                />
                <ContactInfo
                  icon={<FaInstagram />}
                  label="Instagram"
                  value={instagram}
                />
                <ContactInfo
                  icon={<BsGeoAlt />}
                  label="Dirección"
                  value={ciudad}
                />
                <div className="mt-3 hide-on-desktop nav-item">
                  <li className="open-sans d-flex align-items-center ">
                    <FaRegClock />
                    <p className="ms-2">
                      Lunes a viernes:{" "}
                      <span className="fw-semibold">
                        {horarioLunesViernesApertura} -{" "}
                        {horarioLunesViernesCierre}{" "}
                      </span>
                      <br />
                      Sabado y Domingo:{" "}
                      <span className="fw-semibold">
                        {horarioFinDeSemanaApertura} -{" "}
                        {horarioFinDeSemanaCierre}{" "}
                      </span>
                    </p>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
