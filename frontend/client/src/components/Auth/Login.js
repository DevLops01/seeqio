import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import AppContext from "../../context/context";
import "./Auth.css";

function Login() {
  let history = useHistory();
  const { isSession, setIsSession } = useContext(AppContext);

  if (isSession.isAuth === "true") {
    history.push("/find-work");
  }

  const [error, setError] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginUser = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/user/login`,
        {
          email: login.email,
          password: login.password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          setIsSession({ type: "start", payload: res.data.user.type });
        }
      })
      .catch((e) => {
        console.log(e);
        setError("Invalid email / password combination.");
      });
  };

  return (
    <>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Login
                    </p>

                    <form className="mx-1 mx-md-4">
                      {/*Email*/}
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="flex-fill mb-0">
                          <input
                            type="email"
                            value={login.email}
                            name={"email"}
                            className="form-control"
                            placeholder={"Email"}
                            onChange={(e) => handleLogin(e)}
                          />
                        </div>
                      </div>

                      {/*Password*/}
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="flex-fill mb-0">
                          <input
                            type="password"
                            value={login.password}
                            name={"password"}
                            className="form-control"
                            placeholder={"Password"}
                            onChange={(e) => handleLogin(e)}
                          />
                        </div>
                      </div>

                      {error ? (
                        <div
                          className={"d-flex justify-content-center"}
                          style={{ color: "red" }}
                        >
                          {error}
                        </div>
                      ) : (
                        <></>
                      )}

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="button"
                          className="btn btn-primary btn-lg"
                          onClick={(e) => loginUser(e)}
                        >
                          Login
                        </button>
                      </div>
                    </form>
                    <div className={"d-flex justify-content-center"}>
                      <span>
                        Don't have an account?{" "}
                        <Link to={"/register"}>Sign up</Link>{" "}
                      </span>
                    </div>
                  </div>

                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-registration/draw1.png"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
