import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { resetPassword } from "../services/Authentication.service";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

function ResetPasswordAction(props) { 
  var [password, setPassword] = useState('');
  var [inputType, setInputType] = useState('password');
  var [confirmPassword, setConfirmPassword] = useState('');
  var [inputTypeConfirmPassword, setInputTypeConfirmPassword] = useState('password');
  const [returnMessage, setReturnMessage] = useState('');
  
  const navigate = useNavigate();

  // Handle password change
  function handlePassword(e) {
    e.preventDefault();
    setPassword(e.target.value);
  }

  // Handle confirmation password change
  function handleConfirmPassword(e) {
    e.preventDefault();
    setConfirmPassword(e.target.value);
  }

  // Toggle visibility of password
  function togglePasswordVisibility(e) {
    e.preventDefault();
    setInputType(inputType === 'password' ? 'text' : 'password');
  }

  // Toggle visibility of confirm password
  function toggleConfirmPasswordVisibility(e) {
    e.preventDefault();
    setInputTypeConfirmPassword(inputTypeConfirmPassword === 'password' ? 'text' : 'password');
  }

  // Retrieve URL parameters
  function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      accessToken: params.get('access-token'),
      uid: params.get('uid'),
      client: params.get('client'),
      token: params.get('token')
    };
  }

  // Handle password reset
  async function handleResetPassword(e) {
    e.preventDefault();
    const { accessToken, uid, client, token } = getUrlParams();

    try {
      const response = await resetPassword(password, confirmPassword, accessToken, uid, client, token);  
 
      if(response.status === true){        
         window.location.href = '/login?password_reset_success=true';
      }else{
        setReturnMessage(response.message);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error on the request:", error.response.data);
        if (error.response.data.errors && error.response.data.errors.full_messages) {          
          const errorMessages = error.response.data.errors.full_messages.join("<br />");
          setReturnMessage(errorMessages);
        } else {
          setReturnMessage("Unknow error! Please contact the support team.");
        }        
      } else {
        setReturnMessage("Unknow error! Please contact the support team.");
        setReturnMessage(error.message);
      }
    }
  }  

  return (
    <div className="container mt-5">      
      <div className="card p-4 shadow-lg" style={{ maxWidth: "500px", margin: "auto" }}>
        <form>
          <h2 className="text-center" style={{ color: "#143157" }}>Reset Your Password</h2>
          {returnMessage && (
            <div
              className="alert alert-warning text-center"
              dangerouslySetInnerHTML={{ __html: returnMessage }}
            ></div>
          )}
          <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
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

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <div className="input-group">
                <input 
                  type={inputTypeConfirmPassword} 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  className="form-control" 
                  value={confirmPassword} 
                  onChange={handleConfirmPassword} 
                  required 
                />
                <div className="input-group-append">
                  <button 
                    type="button" 
                    className="btn" 
                    style={{ backgroundColor: "#ff6600", color: "#fff" }}
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {inputTypeConfirmPassword === 'password' ? 
                      <i className="fa fa-eye"></i> : 
                      <i className="fa fa-eye-slash"></i>}
                  </button>
                </div>
              </div>
            </div>

          {/* <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
              type={inputType} 
              id="password" 
              name="password" 
              value={password} 
              onChange={handlePassword} 
              className="form-control" 
            /> 
            <button onClick={togglePasswordVisibility} className="btn btn-link">
              {inputType === 'password' ? 'Show Password' : 'Hide Password'}
            </button>
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input 
              type={inputTypeConfirmPassword} 
              id="confirmPassword" 
              name="confirmPassword" 
              value={confirmPassword} 
              onChange={handleConfirmPassword} 
              className="form-control" 
            /> 
            <button onClick={toggleConfirmPasswordVisibility} className="btn btn-link">
              {inputTypeConfirmPassword === 'password' ? 'Show Password' : 'Hide Password'}
            </button>
          </div> */}

          <button onClick={handleResetPassword} className="btn" style={{ backgroundColor: "#ff6600", color: "#fff", width: "100%" }}>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordAction;
