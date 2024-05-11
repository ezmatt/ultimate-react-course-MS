export function Navigaton({ navKey, setNavKey }) {
  return (
    <header>
      <nav className="header__nav">
        <div className="header__logo">
          <h4>Flash Cards</h4>
          <div className="header__logo-overlay"></div>
        </div>

        <ul className="header__menu">
          <li>
            <button>Mathematics</button>
            {/* <a href="math">Mathematics</a> */}
          </li>
          <li>
            <a href="flags">Flags</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
