import "./footer.css";
import useEmpresaStore from "@/hooks/useEmpresaStore";

function Footer() {
  const { empresaActual } = useEmpresaStore();
  if (!empresaActual) {
    return <footer>No se encontro la tienda que buscas :(</footer>;
  }
  return (
    <footer className="text-center bg-body-tertiary py-3">
      <div>
        <p className="open-sans fw-medium px-2">
          No pagues por adelantado sin conocer al local. Todos los ítems
          ofrecidos son responsabilidad de{" "}
          <span className="magenta"> {empresaActual.empresa}</span>
        </p>
      </div>
      <div>
        Desarrollado por{" "}
        <span>
          <a
            href="https://uhmo.com.ar/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://res.cloudinary.com/druvz15q9/image/upload/v1738808093/logoNegrowithoutBg_za2vpn.png"
              alt="logo de uhmo"
              title="logo de uhmo"
              loading="lazy"
              className="avatar-img"
            />
          </a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
