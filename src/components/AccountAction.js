import axios from "axios";
import { useEffect, useState } from "react";
import { isLogged, updatePassword } from "../services/Authentication.service";
import { deleteUser, updateUser } from "../services/User.service";

function AccountAction(props) { 

  //////////////////////////////////// Variables ////////////////////////////////////
  var [emailAddress, setEmailAddress] = useState(localStorage.getItem("uid"));

  var [currentPassword, setCurrentPassword] = useState('');
  var [inputTypeCurrentPassword, setInputTypeCurrentPassword] = useState('password');

  var [password, setPassword] = useState('');
  var [inputType, setInputType] = useState('password');

  var [confirmPassword, setConfirmPassword] = useState('');
  var [inputTypeConfirmPassword, setInputTypeConfirmPassword] = useState('password')

  var [name, setName] = useState(localStorage.getItem("name"));
  var [nickname, setNickname] = useState(localStorage.getItem("nickname"));

  var [accessToken, setAccessToken] = localStorage.getItem("accessToken");
  var [client, setClient] = localStorage.getItem("client");

  //////////////////////////////////// Set Functions ////////////////////////////////////
  // handle Email
  function handleEmail(e) {
    e.preventDefault();
    setEmailAddress(e.target.value);
  }

  // handle current password
  function handleCurrentPassword(e) {
      e.preventDefault();
      setCurrentPassword(e.target.value);
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
  function toggleCurrentPasswordVisibility(e) {
    e.preventDefault();
    setInputTypeCurrentPassword(inputTypeCurrentPassword === 'password' ? 'text' : 'password');
  }

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

  ///////////////////////////////////// Handles the Update of an User ////////////////////////////////////
  async function handleUpdate(e) {
    e.preventDefault();
  
    try {

      const response = await updateUser(name, nickname);

      //alert(response);

      //window.location.href = "/login";
  
    } catch (error) {
      if (error.response) {
        // Erro na resposta da API
        console.error("Erro na requisição:", error.response.data);
      } else {
        // Erro desconhecido
        console.error("Erro desconhecido:", error.message);
      }
  
      alert('Erro ao atualizar o usuário.');
    }
  }

  ///////////////////////////////////// Handles the Update Password ////////////////////////////////////
  async function handleUpdatePassword(e) {
    e.preventDefault();
      
    try {

      const response = await updatePassword(currentPassword, password, confirmPassword);

      alert(response);

      //window.location.href = "/login";
  
    } catch (error) {
      if (error.response) {
        // Erro na resposta da API
        console.error("Erro na requisição:", error.response.data);
      } else {
        // Erro desconhecido
        console.error("Erro desconhecido:", error.message);
      }
    }
  }

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

  ///////////////////////////////////// Check Validation ////////////////////////////////////
  useEffect(()=>{
    if(!isLogged()){
      window.location.href = "/login";
    }
  });

  ///////////////////////////////////// Form for testing ////////////////////////////////////
  return (
    <div className="">

        <h1>User Settings</h1>

        <div style={{ backgroundcolor: 'grey'}}>

            <h4>Personal Data</h4>

            <label htmlFor="email">Email</label><br></br>
            <input type="text" id="email" name="email" value={emailAddress} onChange={handleEmail} /><br></br>

            <label htmlFor="name">Name</label><br></br>
            <input type='text' id="name" name="name" value={name} onChange={handleName} /> <br></br>
            
            <label htmlFor="Nickname">Nickname</label><br></br>
            <input type='text' id="nickname" name="nickname" value={nickname} onChange={handleNickname} /> <br></br>
            <br />

            <button onClick={handleUpdate}>Update User</button>  <br />

        </div>
        
        <div style={{ backgroundcolor: 'light-green'}}>

            <h4>Change Password</h4>

            <label htmlFor="currentpassword">Current Password</label><br></br>
            <input type={inputTypeCurrentPassword} id="currentpassword" name="currentpassword" value={currentPassword} onChange={handleCurrentPassword} />
            <button onClick={toggleCurrentPasswordVisibility}>
                {inputTypeCurrentPassword === 'password' ? 'Mostrar Senha' : 'Esconder Senha'}
            </button><br />

            <label htmlFor="password">Password</label><br></br>
            <input type={inputType} id="password" name="password" value={password} onChange={handlePassword} />
            <button onClick={togglePasswordVisibility}>
                {inputType === 'password' ? 'Mostrar Senha' : 'Esconder Senha'}
            </button><br />

            <label htmlFor="confirmPassword">Confirm Password</label><br></br>
            <input type={inputTypeConfirmPassword} id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPassword} />
            <button onClick={toggleConfirmPasswordVisibility}>
                {inputTypeConfirmPassword === 'password' ? 'Mostrar Senha' : 'Esconder Senha'}
            </button><br /><br />

            <button onClick={handleUpdatePassword}>Update Password</button> <br />

        </div>
      

        <div className="deleteaccount" style={{ backgroundcolor: 'light-red'}}>

            <h4>Delete Account</h4>

            <p>Once you delete your account, there is no going back, pleae be certain.</p>

            <button onClick={handleDelete}>Delete user</button>  <br />

        </div>
                 
    </div>
  );
}

export default AccountAction;