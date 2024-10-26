import { useState } from "react";
import { resendVerificationEmail } from "../services/Email.service";
import 'bootstrap/dist/css/bootstrap.min.css';

function ResendConfirmationAction(props) { 
  const [emailAddress, setEmailAddress] = useState('');

  function handleEmail(e) {
    e.preventDefault();
    setEmailAddress(e.target.value);
  }

  async function handleResend(e) {
    e.preventDefault();
    try {
      await resendVerificationEmail(emailAddress);
      alert("Verification email sent!");
      // Você pode redirecionar o usuário ou limpar o campo de entrada aqui, se desejar.
    } catch (error) {
      if (error.response) {
        console.error("Erro na requisição:", error.response.data);
      } else {
        console.error("Erro desconhecido:", error.message);
      }
      alert('Erro ao enviar email.');
    }
  }

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", margin: "auto" }}>
        <h3 className="mb-4" style={{ color: "#143157" }}>Resend Email Confirmation</h3>

        <form onSubmit={handleResend}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input 
              type="text" 
              id="email" 
              name="email" 
              className="form-control" 
              value={emailAddress} 
              onChange={handleEmail} 
              required 
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-block" 
            style={{ backgroundColor: "#ff6600", color: "#fff" }}
          >
            Resend Email Confirmation
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResendConfirmationAction;
