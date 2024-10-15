import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
        <nav>
            <Link to="/">Home</Link> |
            <Link to="/login">Login</Link>
        </nav>        
    </div>
  );
}

export default Navbar;