import axios from "axios";
import { useState } from "react";
import Logout from "./Logout";

function Access(props) { 
  var [response, setResponse] = "";  
  var [emailAddress, setEmailAddress] = useState('nath.customer@mana.com');

  var [newEmailAddress, setNewEmailAddress] = useState('');

  var [password, setPassword] = useState('12345678');
  var [inputType, setInputType] = useState('password');

  var [name, setName] = useState('');
  var [nickname, setNickname] = useState('');

  var [confirmPassword, setConfirmPassword] = useState('12345678');
  var [inputTypeConfirmPassword, setInputTypeConfirmPassword] = useState('password')

  var [typeRegistration, setTypeRegistration] = useState(false); // false for "Customer", true for "Business"
    
  var [accessToken, setAccessToken] = useState('j8k8EhIIZR8t1lr4l-NpEQ');
  var [client, setClient] = useState('uv6QlbiTjjiB0J6CORh7SA');

  //////////////////////////////////// handle the field  ////////////////////////////////////

  // "registration type (false for "Customer", true for "Business")
  const handleRegistrationType = (event) => {
    setTypeRegistration(event.target.value === "true");
  };

  function handleEmail(e) {
    e.preventDefault();
    setEmailAddress(e.target.value);
  }

  // handle new email address
  function handleNewEmailAddress(e) {
    e.preventDefault();
    setNewEmailAddress(e.target.value);
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


  
  //////////////////////////////////// Handles the Log In ////////////////////////////////////
  async function handleLogIn(e) {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/auth/sign_in', {
        email: emailAddress,
        password: password
      });

      // Acess to the headers
      const headers = response.headers;
      //console.log("Headers da resposta:", headers); 

      const accessToken = response.headers['access-token'];
      console.log("Access Token:", accessToken);
      const client = response.headers['client'];
      console.log("Client:", client);
      
      alert('Login realizado com sucesso!');

    } catch (error) {
      if (error.response) {
        console.error("Erro na requisição:", error.response.data);
      } else {
        console.error("Erro desconhecido:", error.message);
      }

      alert('Erro ao fazer login.');
    }
  }

  ///////////////////////////////////// Handles the Sign Out ////////////////////////////////////
  async function handleSignOut(e) {
    e.preventDefault();  
    try {
      const response = await axios.delete('http://localhost:3000/api/auth/sign_out', {
        headers: {
          'access-token': accessToken,
          uid: emailAddress,
          client: client
        }
      });

      const headers = response.headers;
      console.log("Headers da resposta:", headers);

      alert('Logoff realizado com sucesso!');

    } catch (error) {
      if (error.response) {
        console.error("Erro na requisição:", error.response.data);
      } else {
        console.error("Erro desconhecido:", error.message);
      }

      alert('Erro ao fazer logoff.');
    }  
  }

  ///////////////////////////////////// Handles the Registration of a new user ////////////////////////////////////
  async function handleRegister(e) {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth', {
        email: emailAddress,
        password: password,
        password_confirmation: confirmPassword,
        role: typeRegistration
      });

      // Acess to the headers
      const headers = response.headers;
      console.log("Headers da resposta:", headers); 

      const accessToken = response.headers['access-token'];
      console.log("Access Token:", accessToken);
      
      alert('Usuario registrado com sucesso!');

    } catch (error) {
      if (error.response) {
        console.error("Erro na requisição:", error.response.data);
      } else {
        console.error("Erro desconhecido:", error.message);
      }

      alert('Erro ao registrar novo usuario.');
    }
  }

  ///////////////////////////////////// Handles the Update of an User ////////////////////////////////////
  async function handleUpdate(e) {
    e.preventDefault();
  
    try {
      // Enviar a requisição de atualização (PUT)
      const response = await axios.put('http://localhost:3000/api/auth', {
        name: name,
        nickname: nickname
      }, {
        headers: {
          'access-token': accessToken,
          uid: emailAddress,
          client: client
        }
      });
  
      // Acessar os headers da resposta, que podem conter novos tokens
      const headers = response.headers;
      console.log("Headers da resposta:", headers); 
  
      const newAccessToken = response.headers['access-token'];
      console.log("Novo Access Token:", newAccessToken);
      
      const newClient = response.headers['client'];
      console.log("Novo Client:", newClient);
      
      alert('Usuário atualizado com sucesso!');
  
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

  ///////////////////////////////////// Handles the Update the email address of an user ////////////////////////////////////
  async function handleUpdateEmailAddress(e) {
    e.preventDefault();
  
    try {
      // Enviar a requisição de atualização (PUT)
      const response = await axios.put('http://localhost:3000/api/auth', {
        email: newEmailAddress
      }, {
        headers: {
          'access-token': accessToken,
          uid: emailAddress,
          client: client
        }
      });
  
      // Acessar os headers da resposta, que podem conter novos tokens
      const headers = response.headers;
      console.log("Headers da resposta:", headers); 
  
      const newAccessToken = response.headers['access-token'];
      console.log("Novo Access Token:", newAccessToken);
      
      const newClient = response.headers['client'];
      console.log("Novo Client:", newClient);
      
      alert('Email do Usuário atualizado com sucesso!');
  
    } catch (error) {
      if (error.response) {
        // Erro na resposta da API
        console.error("Erro na requisição:", error.response.data);
      } else {
        // Erro desconhecido
        console.error("Erro desconhecido:", error.message);
      }
  
      alert('Erro ao atualizar o Email do Usuário.');
    }
  }  


  ///////////////////////////////////// Handles the Delete of an User ////////////////////////////////////
  async function handleDelete(e) {
    e.preventDefault();

    try {
      const response = await axios.delete('http://localhost:3000/api/auth', {
        params: {
          'access-token': accessToken,
          uid: emailAddress,
          client: client
        }
      });
      
      console.log(response.data); 
      alert('Usuário deletado com sucesso!'); 
  
    } catch (error) {
      if (error.response) {
        // O servidor retornou uma resposta de erro (status 4xx ou 5xx)
        console.error("Erro ao deletar o usuário:", error.response.data);
        alert('Erro ao deletar o usuário.'); 
      } else if (error.request) {
        // A requisição foi feita, mas não houve resposta do servidor
        console.error("Nenhuma resposta recebida:", error.request);
        alert('Nenhuma resposta do servidor.');
      } else {
        // Outro tipo de erro aconteceu ao configurar a requisição
        console.error("Erro desconhecido:", error.message);
        alert('Erro ao deletar o token.');
      }
    }
  }


  ///////////////////////////////////// Handles the Validation ////////////////////////////////////
  async function handleValidate(e) {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:3000/api/auth/validate_token', {
        params: {
          'access-token': accessToken,
          uid: emailAddress,
          client: client
        }
      });
      console.log(response.data); 
      alert('Token validado com sucesso!'); 

    } catch (error) {
      if(response){
        
        console.log(response);
      }else{
        response = "sem url";
        console.log(response);
      }
      
      console.error("Erro ao validar o token:", error);
      alert('Erro ao validar o token.'); 
    }
  }

  ///////////////////////////////////// Handles the re-send email verification ////////////////////////////////////
  async function handleResend(e) {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/confirmation', {
        email: emailAddress
      });
      
      alert('Email enviado com sucesso!');

    } catch (error) {
      if (error.response) {
        console.error("Erro na requisição:", error.response.data);
      } else {
        console.error("Erro desconhecido:", error.message);
      }

      alert('Erro ao enviar email.');
    }
  }

  ///////////////////////////////////// Handles Forget Password ////////////////////////////////////

  //this one will send an email, on this email will have a link that clicking will give an URL such as:
  // http://localhost:3001/reset-password?access-token=G3ReIzm6tv_qrQSGV05EIw&client=qDTOBpDQs-u-46J5KWXRZA&client_id=qDTOBpDQs-u-46J5KWXRZA&config=default&expiry=1730319371&reset_password=true&token=G3ReIzm6tv_qrQSGV05EIw&uid=nath.customer%40mana.com
  // from this url we need the following to handle the password change:
  // access-token=G3ReIzm6tv_qrQSGV05EIw
  // client=qDTOBpDQs-u-46J5KWXRZA
  // token=G3ReIzm6tv_qrQSGV05EIw
  // uid = email adddress
  async function handleForgetPassword(e) {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/password', {
        email: emailAddress
      });
      
      alert('Email sent to' + { emailAddress } + '!');

    } catch (error) {
      if (error.response) {
        console.error("Erro na requisição:", error.response.data);
      } else {
        console.error("Erro desconhecido:", error.message);
      }

      alert('Erro ao registrar novo usuario.');
    }
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

  try {
    // Enviar a requisição de atualização (PUT)
    const response = await axios.put('http://localhost:3000/api/auth/password', {
        password: password, //this should be a new password value
      	password_confirmation: confirmPassword //this should be a confirmation of the new password value
    }, {
      headers: {
        'access-token': accessToken,
        uid: emailAddress,
        client: client,
        token: "G3ReIzm6tv_qrQSGV05EIw"
      }
    });

    // Acessar os headers da resposta, que podem conter novos tokens
    const headers = response.headers;
    console.log("Headers da resposta:", headers); 

    const newAccessToken = response.headers['access-token'];
    console.log("Novo Access Token:", newAccessToken);
    
    const newClient = response.headers['client'];
    console.log("Novo Client:", newClient);
    
    alert('Password have been updated!');

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

  ///////////////////////////////////// Handles the Update Password ////////////////////////////////////
  async function handleUpdatePassword(e) {
    e.preventDefault();
  
    try {
      // Enviar a requisição de atualização (PUT)
      const response = await axios.put('http://localhost:3000/api/auth', {
        current_password: password,
        password: password,
        password_confirmation: password
      }, {
        headers: {
          'access-token': accessToken,
          uid: emailAddress,
          client: client
        }
      });
  
      // Acessar os headers da resposta, que podem conter novos tokens
      const headers = response.headers;
      console.log("Headers da resposta:", headers); 
  
      const newAccessToken = response.headers['access-token'];
      console.log("Novo Access Token:", newAccessToken);
      
      const newClient = response.headers['client'];
      console.log("Novo Client:", newClient);

      alert('Password atualizado com sucesso!');
  
    } catch (error) {
      if (error.response) {
        // Erro na resposta da API
        console.error("Erro na requisição:", error.response.data);
      } else {
        // Erro desconhecido
        console.error("Erro desconhecido:", error.message);
      }
  
      alert('Erro ao atualizar o Password do Usuário.');
    }
  }












  ///////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////// Form for testing ////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="">

      <label for="email">EMAIL</label><br></br>
      <input type="text" id="email" name="email" value={emailAddress} onChange={handleEmail} /><br></br>
      

      <label for="password">Password</label><br></br>
      <input type={inputType} id="password" name="password" value={password} onChange={handlePassword} /> <br></br>
      <button onClick={togglePasswordVisibility}>
        {inputType === 'password' ? 'Mostrar Senha' : 'Esconder Senha'}
      </button><br />

      <label for="confirmPassword">Confirm Password</label><br></br>
      <input type={inputTypeConfirmPassword} id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPassword} /> <br></br>
      <button onClick={toggleConfirmPasswordVisibility}>
        {inputTypeConfirmPassword === 'password' ? 'Mostrar Senha' : 'Esconder Senha'}
      </button><br /><br />
      
      <label for="name">Name</label><br></br>
      <input type='text' id="name" name="name" value={name} onChange={handleName} /> <br></br>
      <br />
      
      <label for="Nickname">Nickname</label><br></br>
      <input type='text' id="nickname" name="nickname" value={nickname} onChange={handleNickname} /> <br></br>
      <br /><br />

      <label for="newemail">New Email Address</label><br></br>
      <input type='text' id="newemail" name="newemail" value={newEmailAddress} onChange={handleNewEmailAddress} /> <br></br>
      <br /><br />

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
      
      <br></br>
      {/* <input onClick={handleValidate} type="submit" value="Validate"></input><br />
      <input onClick={handleRegister} type="submit" value="Register"></input><br /> */}

      <h4>User</h4>
      <button onClick={handleRegister}>Sign Up (register)</button>  <br />
      <button onClick={handleUpdate}>Update User</button>  <br />
      <button onClick={handleUpdateEmailAddress}>Update User Email Address</button>  <br />
      <button onClick={handleDelete}>Delete user</button>  <br /><br /><br />
      
      <h4>Session</h4>
      <button onClick={handleLogIn}>Log In</button> <br />
      <button onClick={handleSignOut}>Log off</button><br />

      <h4>Validation</h4>
      <button onClick={handleValidate}>Validate</button>  <br />

      <h4>Confirmation</h4>
      <button onClick={handleResend}>Resend Email Confirmation</button> <br /> <br />

      <h4>Password</h4>
      <button onClick={handleUpdatePassword}>Update Password</button> <br /> 
      <button onClick={handleForgetPassword}>Forget Password</button> <br />
      <button onClick={handleResetPassword}>Reset Password (need to run forget before)</button> <br /> <br />

      <h4>Jon</h4>
      <Logout />
      <br /> <br />
    </div>
  );
}

export default Access;