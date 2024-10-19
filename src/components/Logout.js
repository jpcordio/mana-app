import { logout } from "../services/Authentication.service";

function Logout(props) { 
  
  ///////////////////////////////////// Handles the Sign Out ////////////////////////////////////
  async function handleSignOut() { 
    try {

      const isLogout = await logout();

      if(isLogout){
        window.location.href = "/login"
      }

    } catch (error) {
      if (error.response) {
        console.error("Erro na requisição:", error.response.data);
      } else {
        console.error("Erro desconhecido:", error.message);
      }

    }  
  }



  ///////////////////////////////////// Form ////////////////////////////////////

  return (
    <div className="">
      
      <button onClick={handleSignOut}>Log off - auth serice</button><br />
      
    </div>
  );
}

export default Logout;