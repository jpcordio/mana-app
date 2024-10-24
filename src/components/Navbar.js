import { Link } from "react-router-dom";
import { isCompany, isLogged } from "../services/Authentication.service";

function Navbar() {

  return (
    <div className="navbar">
        <nav>

            <Link to="/">Home</Link> |          

            { isCompany() && <Link to="/posts"> Posts | </Link> }
            { isLogged() && <Link to="/account"> Account | </Link> }
            { (!isCompany() && isLogged()) && <Link to="/company"> Companies | </Link> }

            { isLogged() && <Link to="/logout"> Logout | </Link> }
            { !isLogged() && <Link to="/login"> Login | </Link> }

            {/* Welcome Message */}
            {isLogged() && "Welcome " + localStorage.getItem("name") + "!"} 
            {isCompany() && isLogged() && " (Business Profile)" } 
            {!isCompany() && isLogged() && " (Customer Profile)"}

        </nav>        
    </div>
  );
}

export default Navbar;