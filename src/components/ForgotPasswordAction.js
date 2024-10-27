import { useState } from "react";
import { forgetPassword } from "../services/Authentication.service";
import 'bootstrap/dist/css/bootstrap.min.css';

function ForgotPasswordAction(props) { 
  const [emailAddress, setEmailAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleEmail(e) {
    e.preventDefault();
    setEmailAddress(e.target.value);
  }

  async function handleForgetPassword(e) {
    e.preventDefault();

    try {
      const response = await forgetPassword(emailAddress);

      if(response.status === true){
        window.location.href = `/login?response=${response.message}`;
      }else{
        setErrorMessage(response.message);
      }
      
    } catch (error) {
      if (error.response) {
        console.error("Error on the request:", error.response.data);
        //errorMessage = error.response;
        setErrorMessage(errorMessage);

      } else {
        console.error("Unknown Error:", error.message);
        //errorMessage = error.response;
        setErrorMessage(errorMessage);
      }      
    }
  }

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", margin: "auto" }}>
        <h3 className="mb-4" style={{ color: "#143157" }}>Forgot Password</h3>
        {errorMessage && <div className="alert alert-warning text-center">{errorMessage}</div>}
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
