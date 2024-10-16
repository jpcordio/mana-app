import axios from "axios";
import { useState, useEffect } from "react";

function LoginAction(props) {

  //var [response, setResponse] = "";  
  var [emailAddress, setEmailAddress] = useState('');
  var [password, setPassword] = useState('');
  var [inputType, setInputType] = useState('');
  var [loginMessage, setLoginMessage] = useState('');  // Move useState for loginMessage here


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
      const response = await axios.post('http://localhost:3000/api/auth/sign_in', {
      email: emailAddress,
      password: password
    });

    // Access to the headers
    const headers = response.headers;
    console.log("Headers: ", headers); 

    const accessToken = response.headers['access-token'];
    console.log("Access Token:", accessToken);
    const client = response.headers['client'];
    console.log("Client:", client);
    
    // comment it when the project is finished
    alert('Login is working!');

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
    const success = params.get('account_confirmation_success');
    
    if (success) {  // Only show message if the param exists
      // Operador ternário para definir a mensagem
      const message = success === 'true' ? 
        "Account confirmation was successful!" : 
        "Account confirmation failed.";
      
      setLoginMessage(message);
    }
  }, []);

  return (
    <div className="">

      {/* Show the loginMessage only if it is not empty */}
      {loginMessage && <p>{loginMessage}</p>}
      
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
      <a href="/resend-confirmation">Reset Password</a><br />

      <hr />

    </div>
  );
}
  
  export default LoginAction;