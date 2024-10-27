import { useState } from "react";
import { deleteUser } from "../services/User.service";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

function DeleteAccountAction(props) { 
  const [emailAddress, setEmailAddress] = useState('');
  let accessToken = localStorage.getItem("accessToken");
  let client = localStorage.getItem("client");

  ///////////////////////////////////// Handles the Delete of an User ////////////////////////////////////
  async function handleDelete(e) {
    e.preventDefault();

    try {

      const response = await deleteUser(accessToken, emailAddress, client);

      alert(response);

      window.location.href = "/login";
  
    } catch (error) {
      if (error.response) {
        // Erro (status 4xx ou 5xx)
        console.error("Erro to delete the user:", error.response.data);
      } else if (error.request) {
          // No reply from the server
          console.error("No response:", error.request);
      } else {
          // Something else happened
          console.error("Unknown error:", error.message);
      }
      alert('Erro while deleting the user.');
    }
  }

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", margin: "auto" }}>
        <h3 className="mb-4" style={{ color: "#143157" }}>Danger Zone!<br />Deleting Account!</h3>

        <form onSubmit={handleDelete}>
          <p>Once you delete your account, there is no going back, please be certain.</p>
          
          <button 
            type="submit" 
            className="btn btn-danger" 
          >
            Confirm
          </button>          
          <Link to="/account" className="btn btn-warning">
              Back
          </Link>
        </form>
      </div>
    </div>
  );
}

export default DeleteAccountAction;
