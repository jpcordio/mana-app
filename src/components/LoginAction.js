import axios from "axios";
import { useState } from "react";

function LoginAction(props) {

  //var [response, setResponse] = "";  
  var [emailAddress, setEmailAddress] = useState('joaopaulo.customer@mana.com');
  var [password, setPassword] = useState('12345678');
  var [inputType, setInputType] = useState('password');


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

  return (
    <div className="">

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