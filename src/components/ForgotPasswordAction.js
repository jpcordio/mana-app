import { useState } from "react";
import { forgetPassword } from "../services/Authentication.service";
import 'bootstrap/dist/css/bootstrap.min.css';

function ForgotPasswordAction(props) { 
  const [emailAddress, setEmailAddress] = useState('');

  function handleEmail(e) {
    e.preventDefault();
    setEmailAddress(e.target.value);
  }

  async function handleForgetPassword(e) {
    e.preventDefault();

    try {
      const response = await forgetPassword(emailAddress);
      alert(response);
      window.location.href = "/login";
    } catch (error) {
      if (error.response) {
        console.error("Error on the request:", error.response.data);
      } else {
        console.error("Unknown Error:", error.message);
      }
      alert('Error to request a new password.');
    }
  }

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", margin: "auto" }}>
        <h3 className="mb-4" style={{ color: "#143157" }}>Forgot Password</h3>

        <form onSubmit={handleForgetPassword}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input 
              type="text" 
              id="email" 
              name="email" 
              className="form-control" 
              value={emailAddress} 
              onChange={handleEmail} 
              required 
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-block" 
            style={{ backgroundColor: "#ff6600", color: "#fff" }}
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordAction;
