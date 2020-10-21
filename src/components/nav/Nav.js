import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Searchbar from "../searchbar/SearchBar";
import { getUser, logoutUser } from "../../redux/reducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

function Nav(props) {
  const [isDown, setDropdown] = useState(false);

  const handleDropdown = () => {
    setDropdown(!isDown);
    document.addEventListener("click", closeMenu);
  };

  const handleMouseDown = (e) => {
    handleDropdown();
    e.stopPropagation();
  };

  const closeMenu = () => {
    setDropdown(false);
    document.removeEventListener("click", closeMenu);
  };

  const logout = () => {
    axios
      .delete("/auth/logout")
      .then((res) => {
        props.logoutUser();
        props.history.push("/");
      })
      .catch((err) => console.log(err));
  };

  let visibility = "hide";
  if (isDown === true) {
    visibility = "show";
  }

  return (
    <div className="nav-main">
      <nav className="nav-content">
        <div className="dropdown">
          <button
            className="fas fa-bars hamburger"
            onClick={handleMouseDown}
          ></button>
          <div id="flyoutMenu" className={visibility}>
            <ul className="dropdown-box">
              <li onClick={() => setDropdown(false)}>
                <Link className="dropdown-btn" to={"/"}>
                  Home
                </Link>
              </li>
              <li onClick={() => setDropdown(false)}>
                <Link className="dropdown-btn" to={"/about"}>
                  About
                </Link>
              </li>
              <li onClick={() => setDropdown(false)}>
                <Link className="dropdown-btn" to={"/profile"}>
                  Profile
                </Link>
              </li>
              {props.userId === 0 ? (
                <li onClick={() => setDropdown(false)}>
                  <Link className="dropdown-btn" to={"/login"}>
                    Login
                  </Link>
                </li>
              ) : (
                <li onClick={() => setDropdown(false)}>
                  <i className="logout dropdown-btn" onClick={logout}>
                    Logout
                  </i>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { logoutUser, getUser })(
  withRouter(Nav)
);
