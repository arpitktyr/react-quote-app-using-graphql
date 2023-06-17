import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <nav>
      <div className="nav-wrapper deep-purple">
        <Link to="/" className="brand-logo left hide-on-med-and-down">
          Quote App
        </Link>
        <Link
          to="/"
          className="brand-logo mob-icon left hide-on-large-only show-on-small"
        >
          <img
            className="logo"
            src="./quote.png"
            alt="Quote Icon"
            width={100}
          />
        </Link>

        <ul id="nav-mobile" className="right">
          <li>
            <Link to="/"> Home </Link>
          </li>
          {token ? (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/create">Create</Link>
              </li>
              <li>
                <button
                  className="btn white black-text"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
