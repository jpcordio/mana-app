import { useEffect, useState } from "react";
import { isCompany, isLogged, updatePassword } from "../services/Authentication.service";
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

  // Variables to update User Table
  var [name, setName] = useState(localStorage.getItem("name"));
  var [nickname, setNickname] = useState(localStorage.getItem("nickname"));

  // Variables to validate login
  var [accessToken, setAccessToken] = localStorage.getItem("accessToken");
  var [client, setClient] = localStorage.getItem("client");

  // Variables to Profile
  var [address1, setAddress1] = useState(localStorage.getItem("address1") || "");
  var [address2, setAddress2] = useState(localStorage.getItem("address2") || "");
  var [city, setCity] = useState(localStorage.getItem("city") || "");
  var [county, setCounty] = useState(localStorage.getItem("county") || "");
  var [postcode, setPostcode] = useState(localStorage.getItem("postcode") || "");
  var [country, setCountry] = useState(localStorage.getItem("country") || "");
  var [phone, setPhone] = useState(localStorage.getItem("phone") || "");
  var [mobile, setMobile] = useState(localStorage.getItem("mobile") || "");
  var [website, setWebsite] = useState(localStorage.getItem("website") || "");
  var [emailProfile, setEmailProfile] = useState(localStorage.getItem("emailProfile") || "");

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

  // handle address1
  function handleAddress1(e) {
    e.preventDefault();
    setAddress1(e.target.value);
  }

  // handle address2
  function handleAddress2(e) {
    e.preventDefault();
    setAddress2(e.target.value);
  }

    // handle City
    function handleCity(e) {
      e.preventDefault();
      setCity(e.target.value);
    }
  
    // handle County
    function handleCounty(e) {
      e.preventDefault();
      setCounty(e.target.value);
    }

    // handle Postcode
    function handlePostcode(e) {
      e.preventDefault();
      setPostcode(e.target.value);
    }
  
    // handle Country
    function handleCountry(e) {
      e.preventDefault();
      setCountry(e.target.value);
    }

    // handle Phone
    function handlePhone(e) {
      e.preventDefault();
      setPhone(e.target.value);
    }

    // handle Mobile
    function handleMobile(e) {
      e.preventDefault();
      setMobile(e.target.value);
    }

    // handle Website
    function handleWebsite(e) {
      e.preventDefault();
      setWebsite(e.target.value);
    }

    // handle Emailprofile
    function handleEmailProfile(e) {
      e.preventDefault();
      setEmailProfile(e.target.value);
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

  ///////////////////////////////////// Form ////////////////////////////////////
  return (
    <div className="">

        <h1>User Settings</h1>

        <div>

            <h4>Personal Data</h4>

            <label htmlFor="email">Email</label><br></br>
            <input type="text" id="email" name="email" value={emailAddress} onChange={handleEmail} /><br></br>

            <label htmlFor="name">Name</label><br></br>
            <input type='text' id="name" name="name" value={name} onChange={handleName} /> <br></br>
            
            {/* If you there is a need to update any other information of the User table, here is the place to add it */}
            {/* <label htmlFor="Nickname">Nickname</label><br></br>
            <input type='text' id="nickname" name="nickname" value={nickname} onChange={handleNickname} /> <br></br> */}
            
            <br />
            <button onClick={handleUpdate}>Update User</button>  <br />

        </div>
        
        {/* Show this option just if the user is a Company / Update companies table (the profile for a company) */}
        { isCompany() &&(
            <div>

              <h4>Edit Profile</h4>

              <label htmlFor="address1">Address 1</label><br></br>
              <input type="text" id="address1" name="address1" value={address1} onChange={handleAddress1} /><br></br>

              <label htmlFor="address2">Address 2</label><br></br>
              <input type="text" id="address2" name="address2" value={address2} onChange={handleAddress2} /><br></br>

              <label htmlFor="city">City</label><br></br>
              <input type="text" id="city" name="city" value={city} onChange={handleCity} /><br></br>

              <label htmlFor="county">County</label><br></br>
              <input type="text" id="county" name="county" value={county} onChange={handleCounty} /><br></br>

              <label htmlFor="postcode">Postcode</label><br></br>
              <input type="text" id="postcode" name="postcode" value={postcode} onChange={handlePostcode} /><br></br>

              <label htmlFor="country">Country</label><br></br>
              <input type="text" id="Country" name="Country" value={country} onChange={handleCountry} /><br></br>

              <label htmlFor="phone">Phone</label><br></br>
              <input type="text" id="phone" name="phone" value={phone} onChange={handlePhone} /><br></br>

              <label htmlFor="mobile">Mobile</label><br></br>
              <input type="text" id="mobile" name="mobile" value={mobile} onChange={handleMobile} /><br></br>

              <label htmlFor="website">Website</label><br></br>
              <input type="text" id="website" name="website" value={website} onChange={handleWebsite} /><br></br>

              <label htmlFor="emailprofile">Email</label><br></br>
              <input type="email" id="emailprofile" name="emailprofile" value={emailProfile} onChange={handleEmailProfile} /><br></br>
                            
                            
              <br />
              <button>Update Profile</button>  <br />

            </div>
            )          
        }
        
        <div>

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
      

        <div className="deleteaccount">

            <h4>Delete Account</h4>

            <p>Once you delete your account, there is no going back, pleae be certain.</p>

            <button onClick={handleDelete}>Delete user</button>  <br />

        </div>
                 
    </div>
  );
}

export default AccountAction;