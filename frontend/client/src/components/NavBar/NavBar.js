import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../context/context";
import "./NavBar.css";
import { FiSettings } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import seeqioLogo from "../../assets/seeqioLogo.png";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

function NavBar() {
  const { isSession, setIsSession, user, setUser } = useContext(AppContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notification, setNotifications] = useState(8);

  const toggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async () => {
    await setUser({});
    setIsSession({ type: "end" });
  };

  return (
    <>
      <nav className="Nav navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="NavLogo navbar-brand me-2" to="/">
            <img className={"logo-image"} src={seeqioLogo} alt="" />
            Seeqio
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarButtonsExample"
            aria-controls="navbarButtonsExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarButtonsExample">
            <ul className="navbar-nav ms-auto me-auto mb-2 mb-lg-0">
              {isSession.isAuth === "true" ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/find-work">
                      Find Work
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/my-jobs">
                      My Jobs
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/reports">
                      Reports
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/inbox">
                      Messages
                    </Link>
                  </li>
                </>
              ) : (
                <></>
              )}
            </ul>

            {isSession.isAuth === "true" ? (
              <>
                <ul className={"navbar-nav ms-auto me-4 mb-2 mb-lg-0"}>
                  <li>
                    <Link className="nav-link" to={""}>
                      <span style={{ fontSize: "20px" }}>{FaBell()}</span>
                      <span className={"Notifications"}>{notification}</span>
                    </Link>
                  </li>
                </ul>

                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                  <DropdownToggle
                    tag="span"
                    data-toggle="dropdown"
                    aria-expanded={dropdownOpen}
                  >
                    <img
                      className={"NavImage"}
                      src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg"
                      alt=""
                    />
                  </DropdownToggle>

                  <DropdownMenu>
                    <DropdownItem>
                      <Link to={`/freelancer/${user.uuid}`}>Profile</Link>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>{FiSettings()} Settings</DropdownItem>
                    <DropdownItem onClick={() => handleLogout()}>
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                  {/* End Dropdown */}
                </Dropdown>
              </>
            ) : (
              <>
                <div className="d-flex align-items-center">
                  <Link to={"/login"}>
                    <button type="button" className="btn btn-link px-3 me-2">
                      Login
                    </button>
                  </Link>

                  <Link to={"/register"}>
                    <button type="button" className="btn SignUpBtn me-3">
                      Sign Up For Free
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
      <div className={"mb-8"}>
        <hr />
      </div>
    </>
  );
}

export default NavBar;
