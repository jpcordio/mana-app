import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
        <nav>
            <Link to="/">Home</Link> |
            <Link to="/login">Login</Link> |
            <Link to="/create-account">Create Account</Link>
        </nav>        
    </div>
  );
}

export default Navbar;