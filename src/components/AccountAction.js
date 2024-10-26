import { useEffect, useState } from "react";
import { isCompany, isLogged, updatePassword } from "../services/Authentication.service";
import { deleteUser, updateUser } from "../services/User.service";
import { createProfile, getCompanyProfile, updateProfile } from "../services/Profile.service";

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
  //var [nickname, setNickname] = useState(localStorage.getItem("nickname"));

  // Variables to validate login
  let accessToken = localStorage.getItem("accessToken");
  let client = localStorage.getItem("client");
  let id = localStorage.getItem("userId");
  const [haveProfile, setHaveProfile] = useState(false);

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
  // function handleNickname(e) {
  //   e.preventDefault();
  //   setNickname(e.target.value);
  // }

  // handle haveProfile
  function handleHaveProfile(e) {
    e.preventDefault();
    setHaveProfile(e.target.value);
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

      const response = await updateUser(name);

      if(response){
        console.log("user updated.")
      }

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
//   ///////////////////////////////////// Check Validation + Get Profile data ////////////////////////////////////
//   useEffect(()=>{
//     if(!isLogged()){
//       window.location.href = "/login";
//     }
    
//     if(isCompany()){
//       async function callProfile() {
//         try {
//           const data = await getCompanyProfile(id);
    
//           if (data) {
              
//             // Atribuindo valores aos estados e localStorage
//             setAddress1(data.address1 ?? '');
//             setAddress2(data.address2 ?? '');
//             setCity(data.city ?? '');
//             setCounty(data.county ?? '');
//             setPostcode(data.postcode ?? '');
//             setCountry(data.country ?? '');
//             setPhone(data.phone ?? '');
//             setMobile(data.mobile ?? '');
//             setWebsite(data.website ?? '');
//             setEmailProfile(data.email ?? '');            
//           } 
//         } catch (error) {
//           if (error.response) {
//             console.error("Erro retrive profile data:", error.response.data);
//           } else if (error.request) {
//             console.error("No response:", error.request);
//           } else {
//             console.error("Unknown error:", error.message);
//           }

//           setAddress1('');
//           setAddress2('');
//           setCity('');
//           setCounty('');
//           setPostcode('');
//           setCountry('');
//           setPhone('');
//           setMobile('');
//           setWebsite('');
//           setEmailProfile('');
        
//         }
//       }  
//       callProfile();
//     }
  
//   }, [id]);

//     ///////////////////////////////////// Handles the Profile Update ////////////////////////////////////
//     async function handleProfileUpdate(e) {
//       e.preventDefault();
  
//       try {
  
//         const response = await updateProfile(id, 
//           address1, 
//           address2, 
//           city, 
//           county, 
//           postcode, 
//           country, 
//           phone, 
//           mobile, 
//           website, 
//           emailProfile);

//           console.error("Profile updated succefuly! " + response);
    
//       } catch (error) {
//         if (error.response) {
//           // Erro (status 4xx ou 5xx)
//           console.error("Erro to update the profile:", error.response.data);
//         } else if (error.request) {
//             // No reply from the server
//             console.error("No response:", error.request);
//         } else {
//             // Something else happened
//             console.error("Unknown error:", error.message);
//         }
//         alert('Erro while updating the profile.');
//       }
//     }

//   ///////////////////////////////////// Handles the Save Profile ////////////////////////////////////
//   async function handleProfileCreate(e) {
//     e.preventDefault();
  
//     try {

//       const response = await createProfile(id, 
//         address1, 
//         address2, 
//         city, 
//         county, 
//         postcode, 
//         country, 
//         phone, 
//         mobile, 
//         website, 
//         emailProfile);
      
//        if(response){
//         console.log("profile created.")
//         setHaveProfile(true);
//         console.log("haveProfile estado:", haveProfile)
//       }

//       //window.location.href = "/login";
  
//     } catch (error) {
//       if (error.response) {
//         // Erro na resposta da API
//         console.error("Erro on the request:", error.response.data);
//       } else {
//         // Erro desconhecido
//         console.error("Unkown Error:", error.message);
//       }
  
//       alert('Error when trying to create the profile.');
//     }
//   }

//   ///////////////////////////////////// Form ////////////////////////////////////
//   return (
//     <div className="">

//         <h1>User Settings</h1>

//         <div>

//             <h4>Personal Data</h4>

//             <label htmlFor="email">Email</label><br></br>
//             <input type="text" id="email" name="email" value={emailAddress} onChange={handleEmail} /><br></br>

//             <label htmlFor="name">Name</label><br></br>
//             <input type='text' id="name" name="name" value={name} onChange={handleName} /> <br></br>
            
//             {/* If you there is a need to update any other information of the User table, here is the place to add it */}
//             {/* <label htmlFor="Nickname">Nickname</label><br></br>
//             <input type='text' id="nickname" name="nickname" value={nickname} onChange={handleNickname} /> <br></br> */}
            
//             <br />
//             <button onClick={handleUpdate}>Update User</button>  <br />

//         </div>
        
//         {/* Show this option just if the user is a Company / Update companies table (the profile for a company) */}
//         { isCompany() &&(
//             <div>

//               <h4>Edit Profile</h4>

//               <label htmlFor="address1">Address 1</label><br></br>
//               <input type="text" id="address1" name="address1" value={address1} onChange={handleAddress1} /><br></br>

//               <label htmlFor="address2">Address 2</label><br></br>
//               <input type="text" id="address2" name="address2" value={address2} onChange={handleAddress2} /><br></br>

//               <label htmlFor="city">City</label><br></br>
//               <input type="text" id="city" name="city" value={city} onChange={handleCity} /><br></br>

//               <label htmlFor="county">County</label><br></br>
//               <input type="text" id="county" name="county" value={county} onChange={handleCounty} /><br></br>

//               <label htmlFor="postcode">Postcode</label><br></br>
//               <input type="text" id="postcode" name="postcode" value={postcode} onChange={handlePostcode} /><br></br>

//               <label htmlFor="country">Country</label><br></br>
//               <input type="text" id="Country" name="Country" value={country} onChange={handleCountry} /><br></br>

//               <label htmlFor="phone">Phone</label><br></br>
//               <input type="text" id="phone" name="phone" value={phone} onChange={handlePhone} /><br></br>

//               <label htmlFor="mobile">Mobile</label><br></br>
//               <input type="text" id="mobile" name="mobile" value={mobile} onChange={handleMobile} /><br></br>

//               <label htmlFor="website">Website</label><br></br>
//               <input type="text" id="website" name="website" value={website} onChange={handleWebsite} /><br></br>

//               <label htmlFor="emailprofile">Email</label><br></br>
//               <input type="email" id="emailprofile" name="emailprofile" value={emailProfile} onChange={handleEmailProfile} /><br></br>
                            
//               <br />
//               {!haveProfile ? (
//                   <div>                      
//                       <button onClick={handleProfileUpdate}>Update Profile</button>
//                   </div>
//               ) : (
//                   <div>                      
//                       <button onClick={handleProfileCreate}>Save</button>
//                   </div>
//               )}
              
//               <br />

//             </div>
//             )          
//         }
        
//         <div>

//             <h4>Change Password</h4>

//             <label htmlFor="currentpassword">Current Password</label><br></br>
//             <input type={inputTypeCurrentPassword} id="currentpassword" name="currentpassword" value={currentPassword} onChange={handleCurrentPassword} />
//             <button onClick={toggleCurrentPasswordVisibility}>
//                 {inputTypeCurrentPassword === 'password' ? 'Mostrar Senha' : 'Esconder Senha'}
//             </button><br />

//             <label htmlFor="password">Password</label><br></br>
//             <input type={inputType} id="password" name="password" value={password} onChange={handlePassword} />
//             <button onClick={togglePasswordVisibility}>
//                 {inputType === 'password' ? 'Mostrar Senha' : 'Esconder Senha'}
//             </button><br />

//             <label htmlFor="confirmPassword">Confirm Password</label><br></br>
//             <input type={inputTypeConfirmPassword} id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPassword} />
//             <button onClick={toggleConfirmPasswordVisibility}>
//                 {inputTypeConfirmPassword === 'password' ? 'Mostrar Senha' : 'Esconder Senha'}
//             </button><br /><br />

//             <button onClick={handleUpdatePassword}>Update Password</button> <br />

//         </div>
      

//         <div className="deleteaccount">

//             <h4>Delete Account</h4>

//             <p>Once you delete your account, there is no going back, pleae be certain.</p>

//             <button onClick={handleDelete}>Delete user</button>  <br />
//             <br />
//         </div>
                 
//     </div>
//   );
// }

// export default AccountAction;

    ///////////////////////////////////// Check Validation + Get Profile data ////////////////////////////////////
    useEffect(() => {
      if (!isLogged()) {
        window.location.href = "/login";
      }
      if (isCompany()) {
        async function callProfile() {
          try {
            const data = await getCompanyProfile(id);
            if (data) {
              setAddress1(data.address1 ?? '');
              setAddress2(data.address2 ?? '');
              setCity(data.city ?? '');
              setCounty(data.county ?? '');
              setPostcode(data.postcode ?? '');
              setCountry(data.country ?? '');
              setPhone(data.phone ?? '');
              setMobile(data.mobile ?? '');
              setWebsite(data.website ?? '');
              setEmailProfile(data.email ?? '');
            }
          } catch (error) {
            // ... (Tratamento de erro permanece o mesmo)
            setAddress1('');
            setAddress2('');
            setCity('');
            setCounty('');
            setPostcode('');
            setCountry('');
            setPhone('');
            setMobile('');
            setWebsite('');
            setEmailProfile('');
          }
        }
        callProfile();
      }
    }, [id]);
  
    ///////////////////////////////////// Handles the Profile Update ////////////////////////////////////
    async function handleProfileUpdate(e) {
      e.preventDefault();
      try {
        const response = await updateProfile(id, address1, address2, city, county, postcode, country, phone, mobile, website, emailProfile);
        console.error("Profile updated succefuly! " + response);
      } catch (error) {
        // ... (Tratamento de erro permanece o mesmo)
        alert('Erro while updating the profile.');
      }
    }
  
    ///////////////////////////////////// Handles the Save Profile ////////////////////////////////////
    async function handleProfileCreate(e) {
      e.preventDefault();
      try {
        const response = await createProfile(id, address1, address2, city, county, postcode, country, phone, mobile, website, emailProfile);
        if (response) {
          console.log("profile created.")
          setHaveProfile(true);
        }
      } catch (error) {
        // ... (Tratamento de erro permanece o mesmo)
        alert('Error when trying to create the profile.');
      }
    }
  
    ///////////////////////////////////// Form ////////////////////////////////////
    return (
      <div className="container mt-5">
        <h1>User Settings</h1>
  
        <div className="mb-4">
          <h4>Personal Data</h4>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" className="form-control" value={emailAddress} onChange={handleEmail} />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" className="form-control" value={name} onChange={handleName} />
          </div>
          <br />
          <button className="btn btn-primary" onClick={handleUpdate}>Update User</button>
        </div>
  
        {isCompany() && (
          <div className="mb-4">
            <h4>Edit Profile</h4>
            <div className="form-group">
              <label htmlFor="address1">Address 1</label>
              <input type="text" id="address1" name="address1" className="form-control" value={address1} onChange={handleAddress1} />
            </div>
            <div className="form-group">
              <label htmlFor="address2">Address 2</label>
              <input type="text" id="address2" name="address2" className="form-control" value={address2} onChange={handleAddress2} />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" className="form-control" value={city} onChange={handleCity} />
            </div>
            <div className="form-group">
              <label htmlFor="county">County</label>
              <input type="text" id="county" name="county" className="form-control" value={county} onChange={handleCounty} />
            </div>
            <div className="form-group">
              <label htmlFor="postcode">Postcode</label>
              <input type="text" id="postcode" name="postcode" className="form-control" value={postcode} onChange={handlePostcode} />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input type="text" id="country" name="country" className="form-control" value={country} onChange={handleCountry} />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input type="text" id="phone" name="phone" className="form-control" value={phone} onChange={handlePhone} />
            </div>
            <div className="form-group">
              <label htmlFor="mobile">Mobile</label>
              <input type="text" id="mobile" name="mobile" className="form-control" value={mobile} onChange={handleMobile} />
            </div>
            <div className="form-group">
              <label htmlFor="website">Website</label>
              <input type="text" id="website" name="website" className="form-control" value={website} onChange={handleWebsite} />
            </div>
            <div className="form-group">
              <label htmlFor="emailprofile">Email</label>
              <input type="email" id="emailprofile" name="emailprofile" className="form-control" value={emailProfile} onChange={handleEmailProfile} />
            </div>
            <br />
            <button className="btn btn-success" onClick={!haveProfile ? handleProfileUpdate : handleProfileCreate}>
              {!haveProfile ? "Update Profile" : "Create Profile"}
            </button>
          </div>
        )}
  
        <div className="mb-4">
          <h4>Update Password</h4>
          <div className="form-group">
            
            {/* <input type={inputTypeCurrentPassword} id="currentPassword" name="currentPassword" className="form-control" value={currentPassword} onChange={handleCurrentPassword} />
            <button className="btn btn-outline-secondary" onClick={() => setInputTypeCurrentPassword(inputTypeCurrentPassword === 'password' ? 'text' : 'password')}>{inputTypeCurrentPassword === 'password' ? 'Show' : 'Hide'}</button> */}
            <div className="form-group">
              <label htmlFor="currentPassword" style={{ color: "#143157" }}>Current Password</label>
              <div className="input-group">
                <input 
                  type={inputTypeCurrentPassword} 
                  id="currentPassword" 
                  name="currentPassword" 
                  className="form-control" 
                  value={currentPassword} 
                  onChange={handleCurrentPassword} 
                  required 
                />
                <div className="input-group-append">
                  <button 
                    type="button" 
                    className="btn" 
                    style={{ backgroundColor: "#ff6600", color: "#fff" }}
                    onClick={toggleCurrentPasswordVisibility}
                  >
                    {inputTypeCurrentPassword === 'password' ? 
                      <i className="fa fa-eye"></i> : 
                      <i className="fa fa-eye-slash"></i>}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">           
            {/* <input type={inputType} id="password" name="password" className="form-control" value={password} onChange={handlePassword} />
            <button className="btn btn-outline-secondary" onClick={() => setInputType(inputType === 'password' ? 'text' : 'password')}>{inputType === 'password' ? 'Show' : 'Hide'}</button> */}
            <div className="form-group">
              <label htmlFor="password" style={{ color: "#143157" }}>New Password</label>
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
          </div>
          <div className="form-group">
            {/* <label htmlFor="confirmPassword">Confirm New Password</label> */}
            {/* <input type={inputTypeConfirmPassword} id="confirmPassword" name="confirmPassword" className="form-control" value={confirmPassword} onChange={handleConfirmPassword} />
            <button className="btn btn-outline-secondary" onClick={() => setInputTypeConfirmPassword(inputTypeConfirmPassword === 'password' ? 'text' : 'password')}>{inputTypeConfirmPassword === 'password' ? 'Show' : 'Hide'}</button> */}
            <div className="form-group">           
            {/* <input type={inputType} id="password" name="password" className="form-control" value={password} onChange={handlePassword} />
            <button className="btn btn-outline-secondary" onClick={() => setInputType(inputType === 'password' ? 'text' : 'password')}>{inputType === 'password' ? 'Show' : 'Hide'}</button> */}
            <div className="form-group">
              <label htmlFor="confirmPassword" style={{ color: "#143157" }}>Confirm New Password</label>
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
          </div>
          </div>
          <br />
          <button className="btn btn-warning" onClick={handleUpdatePassword}>Update Password</button>
        </div>
  
        <div className="mb-4">
          <h4>Delete Account</h4>
          <p>Once you delete your account, there is no going back, pleae be certain.</p>
          <br />
          <button className="btn btn-danger" onClick={handleDelete}>Delete Account</button>          
        </div>
      </div>
    );
  }
  
  export default AccountAction;