import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getUser, isLoggedIn, logout, saveUser } from "../utils/auth.js";

const NavBar = () => {
  const user = getUser();

  // Modal states
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Login form
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginAlert, setLoginAlert] = useState(null);

  // Register form
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "JOB_SEEKER",
  });
  const [registerAlert, setRegisterAlert] = useState(null);

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  // === Login Logic ===
  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        loginForm
      );
      saveUser(response.data);
      setLoginAlert({
        type: "success",
        message: `Welcome, ${response.data.name}`,
      });
      setTimeout(() => {
        setShowLogin(false);
        window.location.reload();
      }, 1000);
    } catch (error) {
      setLoginAlert({
        type: "danger",
        message: error.response?.data?.message || "Login failed!",
      });
    }
  };

  // === Register Logic ===
  const handleRegisterChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signup",
        registerForm
      );
      saveUser(response.data);
      setRegisterAlert({
        type: "success",
        message: `Registered as ${response.data.name}`,
      });
      setTimeout(() => {
        setShowRegister(false);
        window.location.reload();
      }, 1000);
    } catch (error) {
      setRegisterAlert({
        type: "danger",
        message: error.response?.data?.message || "Registration failed!",
      });
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold text-uppercase" to="/">
            🏠 Job Portal
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/application">
                  Application
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  data-bs-toggle="dropdown"
                >
                  Sort Applications
                </a>
                <ul className="dropdown-menu">
                  {isLoggedIn() && user.role === "EMPLOYER" && (
                    <li>
                      <Link className="dropdown-item" to="/job-posting">
                        Add Application
                      </Link>
                    </li>
                  )}

                  <li>
                    <Link className="dropdown-item" to="#">
                      Old Application
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Recent Application
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/about">
                  About
                </Link>
              </li>
            </ul>

            {/* 👤 User Dropdown */}
            <div className="dropdown ms-3">
              <button
                className="btn btn-outline-light dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
              >
                👤
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                {isLoggedIn() ? (
                  <>
                    <li>
                      <span className="dropdown-item-text fw-bold">
                        <Link className="nav-link active" to="/profile">
                          {user.name}
                        </Link>
                      </span>
                    </li>
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => setShowLogin(true)}
                      >
                        Login
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => setShowRegister(true)}
                      >
                        Register
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* === LOGIN MODAL === */}
      {showLogin && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Login</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowLogin(false)}
                ></button>
              </div>
              <div className="modal-body">
                {loginAlert && (
                  <div className={`alert alert-${loginAlert.type}`}>
                    {loginAlert.message}
                  </div>
                )}

                <form onSubmit={handleLoginSubmit}>
                  <div className="mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={loginForm.email}
                      onChange={handleLoginChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={loginForm.password}
                      onChange={handleLoginChange}
                      required
                    />
                  </div>
                  <button className="btn btn-primary w-100" type="submit">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* === REGISTER MODAL === */}
      {showRegister && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Register</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowRegister(false)}
                ></button>
              </div>
              <div className="modal-body">
                {registerAlert && (
                  <div className={`alert alert-${registerAlert.type}`}>
                    {registerAlert.message}
                  </div>
                )}

                <form onSubmit={handleRegisterSubmit}>
                  <div className="mb-3">
                    <label>Name</label>
                    <input
                      name="name"
                      className="form-control"
                      value={registerForm.name}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label>Email</label>
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      value={registerForm.email}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label>Password</label>
                    <input
                      name="password"
                      type="password"
                      className="form-control"
                      value={registerForm.password}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label>Role</label>
                    <select
                      name="role"
                      className="form-select"
                      value={registerForm.role}
                      onChange={handleRegisterChange}
                    >
                      <option value="JOB_SEEKER">Job Seeker</option>
                      <option value="EMPLOYER">Job Provider</option>
                    </select>
                  </div>
                  <button className="btn btn-success w-100" type="submit">
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
