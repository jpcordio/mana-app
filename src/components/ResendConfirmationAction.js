import { useState } from "react";
import { resendVerificationEmail } from "../services/Email.service";

function ResendConfirmationAction(props) { 

    var [emailAddress, setEmailAddress] = useState('');


    //////////////////////////////////// handle the field  ////////////////////////////////////

    function handleEmail(e) {
        e.preventDefault();
        setEmailAddress(e.target.value);
    }

    ///////////////////////////////////// Handles the re-send email verification ////////////////////////////////////
    async function handleResend(e) {
        e.preventDefault();
        try {
            
          await resendVerificationEmail(emailAddress);

        } catch (error) {
            if (error.response) {
            console.error("Erro na requisição:", error.response.data);
            } else {
            console.error("Erro desconhecido:", error.message);
            }
            alert('Erro ao enviar email.');
        }
    }


  ///////////////////////////////////// Form ////////////////////////////////////

  return (
    <div className="">

      <label for="email">Email</label><br></br>
      <input type="text" id="email" name="email" value={emailAddress} onChange={handleEmail} /><br></br>

      <button onClick={handleResend}>Resend Email Confirmation</button> <br /> <br />
      
    </div>
  );
}

export default ResendConfirmationAction;