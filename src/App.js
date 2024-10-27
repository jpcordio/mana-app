import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Login from "./views/Login";
import CreateAccount from "./views/CreateAccount";
import ForgotPassword from "./views/ForgotPassword";
import ResetPassword from "./views/ResetPassword";
import ResendConfirmation from "./views/ResendConfirmation";
import Account from "./views/Account";
import DeleteAccount from './views/DeleteAccount';
import Logout from "./components/Logout";
import CreateArticle from "./views/CreateArticle";
import Article from "./views/Article";
import EditArticle from "./views/EditArticle";
import Company from "./views/Company";
import Profile from "./views/Profile";
import CompaniesList from "./views/CompaniesList";
import ArticleFeed from "./views/ArticleFeed";
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

function App() {
  return (
    <div className="wrapper">
      <Router>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="create-account" element={<CreateAccount />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="resend-confirmation" element={<ResendConfirmation />} />
            <Route path="logout" element={<Logout />} />
            <Route path="account" element={<Account />} />
            <Route path="delete-account" element={<DeleteAccount />} />
            <Route path="profile" element={<Profile />} />
            <Route path="posts" element={<Article />} />
            <Route path="posts-feed" element={<ArticleFeed />} />
            <Route path="create-post" element={<CreateArticle />} />
            <Route path="edit-post" element={<EditArticle />} />
            <Route path="company" element={<Company />} />
            <Route path="companies-list" element={<CompaniesList />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;