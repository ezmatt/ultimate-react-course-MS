import { Search } from "./Search";
import { Logo } from "./Logo";
import { NumResults } from "./NumResults";

export function NavBar({ movies }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <NumResults movies={movies} />
    </nav>
  );
}
