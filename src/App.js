import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./views/Home";
import Login from "./views/Login";
import CreateAccount from "./views/CreateAccount";

function App() {
  return (
    <div className="app">
      
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="create-account" element={<CreateAccount />}></Route>
        </Routes>

      </Router>
    </div>
  );
}

export default App;
