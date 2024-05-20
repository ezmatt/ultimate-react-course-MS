import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";

export function Navigaton() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenuOnMobile = () => {
    if (window.innerWidth <= 1150) {
      setShowMenu(false);
    }
  };

  return (
    <header className="header">
      <nav className="nav container">
        <p className="nav__logo">Flash Cards</p>

        <div
          className={`nav__menu${showMenu ? " show-menu" : ""}`}
          id="nav-menu"
        >
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink
                className="nav__link"
                to="/maths"
                onClick={closeMenuOnMobile}
              >
                Mathematics
              </NavLink>
            </li>

            <li className="nav__item">
              <NavLink
                className="nav__link"
                to="/flags"
                onClick={closeMenuOnMobile}
              >
                Flags
              </NavLink>
            </li>

            <li className="nav__item">
              <NavLink
                className="nav__link"
                to="/language"
                onClick={closeMenuOnMobile}
              >
                Language
              </NavLink>
            </li>
          </ul>

          <div className="nav__close" id="nav-close" onClick={toggleMenu}>
            <IoClose />
          </div>
        </div>

        <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
          <IoMenu />
        </div>
      </nav>
    </header>
  );
}
