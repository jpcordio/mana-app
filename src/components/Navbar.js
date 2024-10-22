import { Link } from "react-router-dom";
import { isCompany, isLogged } from "../services/Authentication.service";

function Navbar() {

  return (
    <div className="navbar">
        <nav>
            <Link to="/">Home</Link> |          
            {/* <Link to="/forgot-password">Forgot Password</Link> |
            <Link to="/reset-password">Reset Password</Link> |
            <Link to="/resend-confirmation">Resend Confirmation</Link> |     */}
            { isCompany() && <Link to="/posts"> Posts | </Link> }
            { isLogged() && <Link to="/account"> Account | </Link> }
            { isLogged() && <Link to="/company"> Companies | </Link> }
            { isLogged() && <Link to="/logout"> Logout | </Link> }
            { !isLogged() && <Link to="/login"> Login | </Link> }
            { !isLogged() && <Link to="/create-account"> Create Account | </Link> }
            {isLogged() && "Welcome " + localStorage.getItem("name") + "!"} 
            {isCompany() && isLogged() && " (Business Profile)" } 
            {!isCompany() && isLogged() && " (Customer Profile)"}
        </nav>        
    </div>
  );
}

export default Navbar;