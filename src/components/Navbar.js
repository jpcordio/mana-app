import { Link } from "react-router-dom";
import { isLogged } from "../services/Authentication.service";

function Navbar() {
  return (
    <div className="navbar">
        <nav>
            <Link to="/">Home</Link> |            
            {/* <Link to="/create-account">Create Account</Link> |
            <Link to="/forgot-password">Forgot Password</Link> |
            <Link to="/reset-password">Reset Password</Link> |
            <Link to="/resend-confirmation">Resend Confirmation</Link> | */}
            { isLogged() && <Link to="/account">Account |</Link> }
            <Link to="/logout">Logout</Link> |
            <Link to="/login">Login</Link> |
        </nav>        
    </div>
  );
}

export default Navbar;