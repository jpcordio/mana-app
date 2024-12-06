import { logout } from "../services/Authentication.service";
import 'bootstrap/dist/css/bootstrap.min.css';

function Logout(props) { 
  async function handleSignOut() { 
    try {
      const isLogout = await logout();

      if (isLogout) {
        window.location.href = "/login";
      }

    } catch (error) {
      if (error.response) {
        console.error("Error on the request:", error.response.data);
      } else {
        console.error("Unknown Error:", error.message);
      }
      alert(error.response.data.errors[0]);
    }  
  }

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg text-center" style={{ maxWidth: "400px", margin: "auto" }}>
        <h3 className="mb-4" style={{ color: "#143157" }}>Are you sure you want to log out?</h3>
        
        <button 
          onClick={handleSignOut} 
          className="btn btn-block"
          style={{ backgroundColor: "#ff6600", color: "#fff" }}
        >
          Log Out
        </button>

        <button 
          onClick={() => window.location.href = "/"}
          className="btn btn-link mt-3"
          style={{ color: "#143157", fontWeight: "bold" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Logout;
