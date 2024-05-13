import { NavLink } from "react-router-dom";

export function Navigaton() {
  return (
    <nav className="header__nav">
      <div className="header__logo">
        <NavLink to="/">
          <h4>Flash Cards</h4>
        </NavLink>
        <div className="header__logo-overlay"></div>
      </div>

      <ul className="header__menu">
        <li>
          <NavLink to="/maths">Mathematics</NavLink>
        </li>
        <li>
          <NavLink to="/flags">flags</NavLink>
        </li>
      </ul>
    </nav>
  );
}
