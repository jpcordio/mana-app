import { useState, useEffect } from "react";
import { login } from "../services/Authentication.service";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome CSS

function LoginAction(props) {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [inputType, setInputType] = useState('password');
  const [loginMessage, setLoginMessage] = useState('');  
  const [resetPwdMessage, setResetMessage] = useState('');

  function handleEmail(e) {
    e.preventDefault();
    setEmailAddress(e.target.value);
  }

  function handlePassword(e) {
    e.preventDefault();
    setPassword(e.target.value);
  }

  function togglePasswordVisibility(e) {
    e.preventDefault();
    setInputType(inputType === 'password' ? 'text' : 'password');
  }

  async function handleLogIn(e) {
    e.preventDefault();    

    try {
      await login(emailAddress, password);
      window.location.href="/"
    } catch (error) {
      if (error.response) {
        console.error("Error on the request:", error.response.data);
      } else {
        console.error("Unknown Error:", error.message);
      }
      alert(error.response.data.errors[0]);
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accountConfirmationMessage = params.get('account_confirmation_success');
    const resetPasswordMessage = params.get('password_reset_success');
    
    if (accountConfirmationMessage) { 
      const confirmationMessage = accountConfirmationMessage === 'true' ? 
        "Account confirmation was successful!" : 
        "Account confirmation failed.";
      
      setLoginMessage(confirmationMessage);
    }

    if (resetPasswordMessage) {  
      const resetMessage = resetPasswordMessage === 'true' ? 
        "Your password has been successfully updated." : 
        "Password change failed!";
      
      setResetMessage(resetMessage);
    }   

  }, []);

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", margin: "auto" }}>
        <h2 className="text-center mb-4" style={{ color: "#143157" }}>Login</h2>

        {loginMessage && <div className="alert alert-success text-center">{loginMessage}</div>}
        {resetPwdMessage && <div className="alert alert-info text-center">{resetPwdMessage}</div>}
        
        <form onSubmit={handleLogIn}>
          <div className="form-group">
            <label htmlFor="email" style={{ color: "#143157" }}>Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              className="form-control" 
              value={emailAddress} 
              onChange={handleEmail} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" style={{ color: "#143157" }}>Password</label>
            <div className="input-group">
              <input 
                type={inputType} 
                id="password" 
                name="password" 
                className="form-control" 
                value={password} 
                onChange={handlePassword} 
                required 
              />
              <div className="input-group-append">
                <button 
                  type="button" 
                  className="btn" 
                  style={{ backgroundColor: "#ff6600", color: "#fff" }}
                  onClick={togglePasswordVisibility}
                >
                  {inputType === 'password' ? 
                    <i className="fa fa-eye"></i> : 
                    <i className="fa fa-eye-slash"></i>}
                </button>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-block mt-3" 
            style={{ backgroundColor: "#143157", color: "#fff" }}
          >
            Log In
          </button>
        </form>

        <div className="text-center mt-4">
          <a href="/forgot-password" style={{ color: "#ff6600" }}>Forgot Password?</a><br />
          <a href="/resend-confirmation" style={{ color: "#ff6600" }}>Resend Confirmation Email</a><br />
          <a href="/create-account" style={{ color: "#143157", fontWeight: "bold" }}>Sign Up</a>
        </div>
      </div>
    </div>
  );
}

export default LoginAction;
