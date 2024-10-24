import { useState } from "react";
import { createUser } from "../services/User.service";

function CreateAccountAction(props) { 

  var [emailAddress, setEmailAddress] = useState('');

  var [password, setPassword] = useState('');
  var [inputType, setInputType] = useState('password');

  var [name, setName] = useState('');
  var [nickname, setNickname] = useState('');

  var [confirmPassword, setConfirmPassword] = useState('');
  var [inputTypeConfirmPassword, setInputTypeConfirmPassword] = useState('password')

  var [typeRegistration, setTypeRegistration] = useState(false); // false for "Customer", true for "Business"
    
  //////////////////////////////////// handle the field  ////////////////////////////////////

  // "registration type (false for "Customer", true for "Business")
  const handleRegistrationType = (event) => {
    setTypeRegistration(event.target.value === "true");
  };

  function handleEmail(e) {
    e.preventDefault();
    setEmailAddress(e.target.value);
  }

  // handle password
  function handlePassword(e) {
    e.preventDefault();
    setPassword(e.target.value);
  }

  // handle confirmation password
  function handleConfirmPassword(e) {
    e.preventDefault();
    setConfirmPassword(e.target.value)
  }

  // handle name
  function handleName(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  // handle nickname
  function handleNickname(e) {
    e.preventDefault();
    setNickname(e.target.value);
  }

  //////////////////////////////////// handle the "show/hide" password and confirm password ////////////////////////////////////
  
  // handle password
  function togglePasswordVisibility(e) {
    e.preventDefault();
    setInputType(inputType === 'password' ? 'text' : 'password');
  }

  // handle confirmation password
  function toggleConfirmPasswordVisibility(e) {
    e.preventDefault();
    setInputTypeConfirmPassword(inputTypeConfirmPassword === 'password' ? 'text' : 'password');
  }

  ///////////////////////////////////// Handles the Registration of a new user ////////////////////////////////////
  async function handleRegister(e) {
    e.preventDefault();

    try {

      await createUser(emailAddress, password, confirmPassword, name, typeRegistration);

      window.location.href="/login"

    } catch (error) {
      if (error.response) {
        console.error("Erro on the request:", error.response.data);
      } else {
        console.error("Unknown Erro:", error.message);
      }

      alert('Erro while registering the new user.');
    }
  }

  

  ///////////////////////////////////// Form ////////////////////////////////////
  return (
    <div className="">

      <label for="email">Email</label><br></br>
      <input type="email" id="email" name="email" value={emailAddress} onChange={handleEmail} required /><br></br>
      

      <label for="password">Password</label><br></br>
      <input type={inputType} id="password" name="password" value={password} onChange={handlePassword} required />
      <button onClick={togglePasswordVisibility}>
        {inputType === 'password' ? 'Mostrar Senha' : 'Esconder Senha'}
      </button><br />

      <label for="confirmPassword">Confirm Password</label><br></br>
      <input type={inputTypeConfirmPassword} id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPassword} required /> 
      <button onClick={toggleConfirmPasswordVisibility}>
        {inputTypeConfirmPassword === 'password' ? 'Mostrar Senha' : 'Esconder Senha'}
      </button><br />
      
      <label for="name">Name</label><br></br>
      <input type='text' id="name" name="name" value={name} onChange={handleName} required /> <br></br>
      
      {/* <label for="Nickname">Nickname</label><br></br>
      <input type='text' id="nickname" name="nickname" value={nickname} onChange={handleNickname} /> <br></br> */}

      <p>Are you:</p>
      <input
        type="radio"
        id="business"
        name="registration_type"
        value={true}
        checked={typeRegistration === true}
        onChange={handleRegistrationType}
      />
      <label htmlFor="business">Business</label>

      <input
        type="radio"
        id="customer"
        name="registration_type"
        value={false}
        checked={typeRegistration === false}
        onChange={handleRegistrationType}
      />
      <label htmlFor="customer">Customer</label>
      <br /><br />
      
      <button onClick={handleRegister}>Sign Up</button>  <br />     
      
    </div>
  );
}

export default CreateAccountAction;