import { useState } from "react";
import { createUser } from "../services/User.service";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'; // Make sure to import Font Awesome CSS

function CreateAccountAction(props) { 
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [inputType, setInputType] = useState('password');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [inputTypeConfirmPassword, setInputTypeConfirmPassword] = useState('password');
  const [typeRegistration, setTypeRegistration] = useState(false); // false for "Customer", true for "Business"

  const handleRegistrationType = (event) => {
    setTypeRegistration(event.target.value === "true");
  };

  function handleEmail(e) {
    e.preventDefault();
    setEmailAddress(e.target.value);
  }

  function handlePassword(e) {
    e.preventDefault();
    setPassword(e.target.value);
  }

  function handleConfirmPassword(e) {
    e.preventDefault();
    setConfirmPassword(e.target.value);
  }

  function handleName(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleNickname(e) {
    e.preventDefault();
    setNickname(e.target.value);
  }

  function togglePasswordVisibility(e) {
    e.preventDefault();
    setInputType(inputType === 'password' ? 'text' : 'password');
  }

  function toggleConfirmPasswordVisibility(e) {
    e.preventDefault();
    setInputTypeConfirmPassword(inputTypeConfirmPassword === 'password' ? 'text' : 'password');
  }

  async function handleRegister(e) {
    e.preventDefault();
    try {
      await createUser(emailAddress, password, confirmPassword, name, typeRegistration);
      window.location.href = "/login";
    } catch (error) {
      if (error.response) {
        console.error("Error on the request:", error.response.data);
      } else {
        console.error("Unknown error:", error.message);
      }
      alert('Error while registering the new user.');
    }
  }

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "500px", margin: "auto" }}>
        <h3 className="mb-4" style={{ color: "#143157" }}>Create Account</h3>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
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

          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              className="form-control" 
              value={name} 
              onChange={handleName} 
              required 
            />
          </div>

          {/* <div className="mb-3">
            <label htmlFor="nickname" className="form-label">Nickname</label>
            <input 
              type="text" 
              id="nickname" 
              name="nickname" 
              className="form-control" 
              value={nickname} 
              onChange={handleNickname} 
            />
          </div> */}

          <div className="mb-3">
            <p>Are you:</p>
            <div className="form-check">
              <input
                type="radio"
                id="business"
                name="registration_type"
                value={true}
                checked={typeRegistration === true}
                onChange={handleRegistrationType}
                className="form-check-input"
              />
              <label htmlFor="business" className="form-check-label">Business</label>
            </div>

            <div className="form-check">
              <input
                type="radio"
                id="customer"
                name="registration_type"
                value={false}
                checked={typeRegistration === false}
                onChange={handleRegistrationType}
                className="form-check-input"
              />
              <label htmlFor="customer" className="form-check-label">Customer</label>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-block" 
            style={{ backgroundColor: "#ff6600", color: "#fff" }}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAccountAction;
