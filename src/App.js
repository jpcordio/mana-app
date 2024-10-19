import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./views/Home";
import Login from "./views/Login";
import CreateAccount from "./views/CreateAccount";
import ForgotPassword from "./views/ForgotPassword";
import ResetPassword from "./views/ResetPassword";
import ResendConfirmation from "./views/ResendConfirmation";
import Account from "./views/Account";
import Logout from "./components/Logout";

function App() {
  return (
    <div className="app">
      
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="create-account" element={<CreateAccount />}></Route>
          <Route path="forgot-password" element={<ForgotPassword />}></Route>
          <Route path="reset-password" element={<ResetPassword />}></Route>
          <Route path="resend-confirmation" element={<ResendConfirmation />}></Route>
          <Route path="logout" element={<Logout />}></Route>
          <Route path="account" element={<Account />}></Route>
        </Routes>

      </Router>
    </div>
  );
}

export default App;
