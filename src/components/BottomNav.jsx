import { NavLink } from "react-router-dom";
import "../components/BottomNav.css";
export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/explore">Explore</NavLink>
      <NavLink to="/visited">Visited</NavLink>
    </nav>
  );
}
