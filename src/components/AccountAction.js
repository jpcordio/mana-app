import { useEffect, useState } from "react";
import { isCompany, isLogged, updatePassword } from "../services/Authentication.service";
import { deleteUser, updateUser } from "../services/User.service";
import { createProfile, getCompanyProfile, updateProfile } from "../services/Profile.service";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

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


  var [alertType, setAlertType] = useState('success');
  var [returnUpdateUserMessage, setReturnUpdateUserMessage] = useState('');
  var [returnUpdateProfileMessage, setReturnUpdateProfileMessage] = useState('');
  var [returnCreateProfileMessage, setReturnCreateProfileMessage] = useState('');
  var [returnUpdatePassword, setReturnUpdatePassword] = useState('');
  
  

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
      if (response) {
          setAlertType('success');
          setReturnUpdateUserMessage("User updated successfully.");
      } else {
          // Se a resposta não for válida, trate o caso
          setReturnUpdateUserMessage("Update failed.");
      }
  } catch (error) {
      if (error.response) {
          console.error("Erro na requisição:", error.response.data);
          
          // Verifica se a resposta contém erros
          if (error.response.data.errors) {
              // Acessa as mensagens de erro completas
              const errorMessages = error.response.data.errors.full_messages || ["Unknown error."];
              
              // Define a mensagem para o estado
              setReturnUpdateUserMessage(errorMessages.join(", "));
          } else {
              // Mensagem padrão se não houver mensagens específicas
              setReturnUpdateUserMessage("Unknown error.");
          }
      } else {
          // Para erros desconhecidos
          console.error("Erro desconhecido:", error.message);
          setReturnUpdateUserMessage(error.message); // Assegure-se que seja uma string
      }
  }
}

  ///////////////////////////////////// Handles the Update Password ////////////////////////////////////
  async function handleUpdatePassword(e) {
    e.preventDefault();
      
    try {

      const response = await updatePassword(currentPassword, password, confirmPassword);

      setReturnUpdatePassword("Password updated successfully!");
        setAlertType('success');
  
    } catch (error) {
      if (error.response) {
        setReturnUpdatePassword(error.response.data.errors.full_messages[0]);
        setAlertType('warning');
      } 
    }
  }

  // This one was moved to "DeleteAccountAction" as two step delete process
  // ///////////////////////////////////// Handles the Delete of an User ////////////////////////////////////
  // async function handleDelete(e) {
  //   e.preventDefault();

  //   try {

  //     const response = await deleteUser(accessToken, emailAddress, client);

  //     alert(response);

  //     window.location.href = "/login";
  
  //   } catch (error) {
  //     if (error.response) {
  //       // Erro (status 4xx ou 5xx)
  //       console.error("Erro to delete the user:", error.response.data);
  //     } else if (error.request) {
  //         // No reply from the server
  //         console.error("No response:", error.request);
  //     } else {
  //         // Something else happened
  //         console.error("Unknown error:", error.message);
  //     }
  //     alert('Erro while deleting the user.');
  //   }
  // }

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
              setHaveProfile(true);
            }
          } catch (error) {
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
            setHaveProfile(false);
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
        setReturnUpdateProfileMessage("Profile updated succefuly!");
      } catch (error) {
        setReturnUpdateProfileMessage("Erro while updating the profile.");
        setAlertType('warning');
      }
    }
  
    ///////////////////////////////////// Handles the Save Profile ////////////////////////////////////
    async function handleProfileCreate(e) {
      e.preventDefault();
      try {
        const response = await createProfile(id, address1, address2, city, county, postcode, country, phone, mobile, website, emailProfile);
        if (response) {
          setReturnUpdateProfileMessage("Profile created succefuly!");
          setHaveProfile(true);
        }
      } catch (error) {        
        setReturnUpdateProfileMessage("Error when trying to create the profile.");
        setAlertType('warning');
      }
    }
  
    ///////////////////////////////////// Form ////////////////////////////////////
    return (
      
      <Container className="mt-5 mb-5">
        <div className="text-center">
          <h1>User Settings</h1>
        </div>       
        <Container>
          <Row>
            <Col md={12}>
              <h4>Personal Data</h4>
              {returnUpdateUserMessage && <div className={`alert alert-${alertType} text-center`}>{returnUpdateUserMessage}</div>}
              <Form onSubmit={handleUpdate}>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    value={emailAddress}
                    readOnly
                    onChange={handleEmail}
                  />
                </Form.Group>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={handleName}
                    required 
                    isInvalid={!name}
                  />
                </Form.Group>
                <div className="text-center mt-3">
                <Button type="submit" className="btn btn-primary">
                  Update User
                </Button>
                </div>
              </Form>
            </Col>   
          </Row> 
        </Container>
        {isCompany() && (
          <Container className="mt-5 mb-5">
          <Row>
            <Col md={12}>
              <h4>Edit Profile</h4>
              {returnUpdateProfileMessage && <div className={`alert alert-${alertType} text-center`}>{returnUpdateProfileMessage}</div>}
              {returnCreateProfileMessage && <div className={`alert alert-${alertType} text-center`}>{returnCreateProfileMessage}</div>}
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="address1">
                <Form.Label>Address 1</Form.Label>
                <Form.Control
                  type="text"
                  name="address1"
                  value={address1}
                  onChange={handleAddress1}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="address2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control
                  type="text"
                  name="address2"
                  value={address2}
                  onChange={handleAddress2}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={city}
                  onChange={handleCity}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="county">
                <Form.Label>County</Form.Label>
                <Form.Control
                  type="text"
                  name="county"
                  value={county}
                  onChange={handleCounty}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="postcode">
                <Form.Label>Postcode</Form.Label>
                <Form.Control
                  type="text"
                  name="postcode"
                  value={postcode}
                  onChange={handlePostcode}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  value={country}
                  onChange={handleCountry}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={handlePhone}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="mobile">
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  type="text"
                  name="mobile"
                  value={mobile}
                  onChange={handleMobile}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="website">
                <Form.Label>Website</Form.Label>
                <Form.Control
                  type="text"
                  name="website"
                  value={website}
                  onChange={handleWebsite}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="emailprofile">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="emailprofile"
                  value={emailProfile}
                  onChange={handleEmailProfile}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="text-center mt-3">
              <Button
                variant="success"
                onClick={haveProfile ? handleProfileUpdate : handleProfileCreate}
              >
                {haveProfile ? "Update Profile" : "Create Profile"}
              </Button>
            </Col>
          </Row>
        </Container>         
        )}
        
        
        <Container className="mt-5 mb-5">
          <Row className="mb-4">
            <Col>
              <h4>Update Password</h4>
              {returnUpdatePassword && <div className={`alert alert-${alertType} text-center`}>{returnUpdatePassword}</div>}
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Form.Group controlId="currentPassword">
                <Form.Label style={{ color: "#143157" }}>Current Password</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type={inputTypeCurrentPassword}
                    value={currentPassword}
                    onChange={handleCurrentPassword}
                    required
                  />
                  <div className="input-group-append">
                    <Button
                      type="button"                      
                      className = "eye-button" 
                      onClick={toggleCurrentPasswordVisibility}
                    >
                      {inputTypeCurrentPassword === 'password' ? (
                        <i className="fa fa-eye"></i>
                      ) : (
                        <i className="fa fa-eye-slash"></i>
                      )}
                    </Button>
                  </div>
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="password">
                <Form.Label style={{ color: "#143157" }}>New Password</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type={inputType}
                    value={password}
                    onChange={handlePassword}
                    required
                  />
                  <div className="input-group-append">
                    <Button
                      type="button"
                      className = "eye-button"
                      onClick={togglePasswordVisibility}
                    >
                      {inputType === 'password' ? (
                        <i className="fa fa-eye"></i>
                      ) : (
                        <i className="fa fa-eye-slash"></i>
                      )}
                    </Button>
                  </div>
                </div>
              </Form.Group>
            </Col>
          
            <Col md={6}>
              <Form.Group controlId="confirmPassword">
                <Form.Label style={{ color: "#143157" }}>Confirm New Password</Form.Label>                
                <div className="input-group">
                  <Form.Control
                    type={inputTypeConfirmPassword}
                    value={confirmPassword}
                    onChange={handleConfirmPassword}
                    required
                  />
                  <div className="input-group-append">
                    <Button
                      type="button"
                      className = "eye-button" 
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {inputTypeConfirmPassword === 'password' ? (
                        <i className="fa fa-eye"></i>
                      ) : (
                        <i className="fa fa-eye-slash"></i>
                      )}
                    </Button>
                  </div>
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col className="text-center mt-3">
              <Button variant="warning" onClick={handleUpdatePassword}>
                Update Password
              </Button>
            </Col>
          </Row>
        </Container>

        <Container className="mt-5 mb-5">
          <Row>
            <Col md={12} className="mb-4">
              <h4>Delete Account</h4>
              <p>Once you delete your account, there is no going back, please be certain.</p>
              <div className="text-center mt-3">
                {/* Link para exclusão de conta */}
                <Link to="/delete-account" className="btn btn-danger">
                  Delete Account
                </Link>
              </div>
            </Col>
          </Row>
        </Container>

      </Container>
    );
  }
  
  export default AccountAction;