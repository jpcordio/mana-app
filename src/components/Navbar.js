import { Link } from "react-router-dom";
import { isCompany, isLogged } from "../services/Authentication.service";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faGear, faUserPlus  } from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#143157" }}>
      <div className="container-fluid">
        <span className="navbar-brand orange">MANA</span>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white">Home</Link>
            </li>

            <li className="nav-item">
              {isLogged() ? (
                isCompany() ? (
                  <Link to="/posts" className="nav-link text-white">Posts</Link>
                ) : (
                  <Link to="/posts-feed" className="nav-link text-white">Posts</Link>
                )
              ) : null} {/* Render nothing if not logged in */}
            </li>

            {(!isCompany() && isLogged()) && (
              <li className="nav-item">
                <Link to="/company" className="nav-link text-white">Companies</Link>
              </li>
            )}

            {/* {isLogged() && (
              <li className="nav-item">
                <Link to="/account" className="nav-link text-white">Account</Link>
              </li>
            )} */}


          </ul>
        </div>

        {/* Welcome Message and Buttons */}
        <div className="d-flex align-items-center ms-auto text-white">
        {isLogged() && (
          <>
            <span className="me-2">
              Welcome {localStorage.getItem("name")}!
            </span>
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id="settings-tooltip">
                  Settings
                </Tooltip>
              }
            >
              <Link to="/account" className="nav-link text-white ms-3">
                <FontAwesomeIcon icon={faGear} />
              </Link>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id="logout-tooltip">
                  Logout
                </Tooltip>
              }
            >
              <Link to="/logout" className="nav-link text-white ms-3">
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </Link>
            </OverlayTrigger>
          </>
        )}
        {!isLogged() && (
          <div className="d-flex align-items-center">
            
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id="logout-tooltip">
                  Sing Up
                </Tooltip>
              }
            >
              <Link to="/create-account" className="d-flex align-items-center me-3">
              <FontAwesomeIcon icon={faUserPlus} className="text-white me-1" /> 
              </Link>
            </OverlayTrigger>

            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id="logout-tooltip">
                  Login
                </Tooltip>
              }
            >
              <Link to="/login" className="nav-link text-white">
                Login
              </Link>
            </OverlayTrigger>
          </div>
        )}
      </div>
            </div>
          </nav>
        );
      }

export default Navbar;
