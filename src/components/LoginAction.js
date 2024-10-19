import { useState, useEffect } from "react";
import { login } from "../services/Authentication.service";

function LoginAction(props) {

  //var [response, setResponse] = "";  
  var [emailAddress, setEmailAddress] = useState('');
  var [password, setPassword] = useState('');
  var [inputType, setInputType] = useState('password');
  var [loginMessage, setLoginMessage] = useState('');  
  var [resetPwdMessage, setResetMessage] = useState('');
  
  //////////////////////////////////// Handle the fields ////////////////////////////////////
  function handleEmail(e) {
    e.preventDefault();
    setEmailAddress(e.target.value);
  }

  // handle password
  function handlePassword(e) {
    e.preventDefault();
    setPassword(e.target.value);
  }

  //////////////////////////////////// handle the "show/hide" password and confirm password ////////////////////////////////////
  
  // handle password
  function togglePasswordVisibility(e) {
    e.preventDefault();
    setInputType(inputType === 'password' ? 'text' : 'password');
  }

  //////////////////////////////////// Handles the Log In ////////////////////////////////////
  async function handleLogIn(e) {
    e.preventDefault();    

    try {
      await login(emailAddress, password);

      window.location.href="/"

  } catch (error) {
    if (error.response) {
      console.error("Erro on the request:", error.response.data);
    } else {
        console.error("Unknown Erro:", error.message);
    }
      alert('Error to login.');
    }
  }

  //////////////////////////////////// Handles the Log In message from the Account Creation ////////////////////////////////////
  useEffect(() => {
    // Executa a lógica após a página carregar
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
    <div className="">

      {/* Show the loginMessage only if it is not empty */}
      {loginMessage && <p>{loginMessage}</p>}

      {/* Show the loginMessage only if it is not empty */}
      {resetPwdMessage && <p>{resetPwdMessage}</p>}
      
      <hr />

      <label for="email">Email</label><br></br>
      <input type="email" id="email" name="email" value={emailAddress} onChange={handleEmail} /><br></br>      

      <label for="password">Password</label><br></br>
      <input type={inputType} id="password" name="password" value={password} onChange={handlePassword} /> 
      <button onClick={togglePasswordVisibility}>
        {inputType === 'password' ? 'Mostrar Senha' : 'Esconder Senha'}
      </button><br />

      <button onClick={handleLogIn}>Log In</button> <br />


      <a href="/forgot-password">Forget Password</a> <br />
      <a href="/resend-confirmation">Resend Confirmation Email</a><br />

      <hr />

    </div>
  );
}
  
  export default LoginAction;