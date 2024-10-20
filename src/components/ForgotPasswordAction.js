import { useState } from "react";
import { forgetPassword } from "../services/Authentication.service";

function ForgotPasswordAction(props) { 
  
  var [emailAddress, setEmailAddress] = useState('');

  //////////////////////////////////// handle the field  ////////////////////////////////////

  function handleEmail(e) {
    e.preventDefault();
    setEmailAddress(e.target.value);
  }

  ///////////////////////////////////// Handles Forget Password ////////////////////////////////////

  //this one will send an email, on this email will have a link that clicking will give an URL such as:
  // http://localhost:3001/reset-password?access-token=G3ReIzm6tv_qrQSGV05EIw&client=qDTOBpDQs-u-46J5KWXRZA&client_id=qDTOBpDQs-u-46J5KWXRZA&config=default&expiry=1730319371&reset_password=true&token=G3ReIzm6tv_qrQSGV05EIw&uid=nath.customer%40mana.com
  // from this url we need the following to handle the password change:
  // access-token=G3ReIzm6tv_qrQSGV05EIw
  // client=qDTOBpDQs-u-46J5KWXRZA
  // token=G3ReIzm6tv_qrQSGV05EIw
  // uid = email adddress
  // file on ...\mana_api\tmp\letter_opener
  /////////////
  async function handleForgetPassword(e) {
    e.preventDefault();

    try {

        const response = await forgetPassword(emailAddress);
              
        alert(response);

        window.location.href = "/login";

    } catch (error) {
      if (error.response) {
        console.error("Error on the request:", error.response.data);
      } else {
        console.error("Unknown Erro:", error.message);
      }

      alert('Error to request a new password.');
    }

  }

  ///////////////////////////////////// Form  ////////////////////////////////////
  return (
    <div className="">

      <label for="email">Email</label><br></br>
      <input type="text" id="email" name="email" value={emailAddress} onChange={handleEmail} /><br></br>

      <button onClick={handleForgetPassword}>Forget Password</button> <br />
      
      
    </div>
  );
}

export default ForgotPasswordAction;