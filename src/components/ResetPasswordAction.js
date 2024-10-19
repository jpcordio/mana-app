import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function ResetPasswordAction(props) { 

  var [password, setPassword] = useState('');
  var [inputType, setInputType] = useState('password');

  var [confirmPassword, setConfirmPassword] = useState('');
  var [inputTypeConfirmPassword, setInputTypeConfirmPassword] = useState('password')

  const navigate = useNavigate();

  //////////////////////////////////// handle the fields  ////////////////////////////////////
//   function handleEmail(e) {
//     e.preventDefault();
//     setEmailAddress(e.target.value);
//   }

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

  ///////////////////////////////////// Handles the retrive of the parameters ////////////////////////////////////
  function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      accessToken: params.get('access-token'),
      uid: params.get('uid'),
      client: params.get('client'),
      token: params.get('token')
    };
  }

  ///////////////////////////////////// Handles the password reset ////////////////////////////////////

// on this process, we will need:  
  // access-token=G3ReIzm6tv_qrQSGV05EIw
  // client=qDTOBpDQs-u-46J5KWXRZA
  // token=G3ReIzm6tv_qrQSGV05EIw
  // uid = email adddress
// Those are generated by a link sent via email using the handleForgetPassword
async function handleResetPassword(e) {
    e.preventDefault();

    const { accessToken, uid, client, token } = getUrlParams();
  
    try {
      // Enviar a requisição de atualização (PUT)
      const response = await axios.put('http://localhost:3000/api/auth/password', {
            password: password, //this should be a new password value
            password_confirmation: confirmPassword //this should be a confirmation of the new password value
      }, {
        headers: {
          'access-token': accessToken,
          uid: uid,
          client: client,
          token: token
        }
      });
      
      // Redirect to /login with a code to handle the message
      navigate('/login?password_reset_success=true'); 

  
    } catch (error) {
      if (error.response) {
        // Erro na resposta da API
        console.error("Erro na requisição:", error.response.data);
      } else {
        // Erro desconhecido
        console.error("Erro desconhecido:", error.message);
      }
  
      alert('Erro ao resetar o password.');
    }
  }  

  
  return (
    <div className="">

        <label for="password">Password</label><br></br>
        <input type={inputType} id="password" name="password" value={password} onChange={handlePassword} /> 
        <button onClick={togglePasswordVisibility}>
        {inputType === 'password' ? 'Mostrar Senha' : 'Esconder Senha'}
        </button><br />

        <label for="confirmPassword">Confirm Password</label><br></br>
        <input type={inputTypeConfirmPassword} id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPassword} /> 
        <button onClick={toggleConfirmPasswordVisibility}>
        {inputTypeConfirmPassword === 'password' ? 'Mostrar Senha' : 'Esconder Senha'}
        </button><br /><br />

        <button onClick={handleResetPassword}>Reset Password</button>
      
    </div>
  );
}

export default ResetPasswordAction;