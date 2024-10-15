import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./views/Home";
import Login from "./views/Login";

function App() {
  return (
    <div className="app">
      
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="login" element={<Login />}></Route>
        </Routes>

      </Router>
    </div>
  );
}

export default App;
