export const ContactInfo = ({ icon, label, value }) => (
  <li className="nav-item hide-on-desktop mt-3">
    <div className="d-flex align-items-center">
      {icon}
      <p className="open-sans ms-2">{value || "No disponible"}</p>
    </div>
  </li>
);

export default ContactInfo;
