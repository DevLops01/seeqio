import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import AppContext from "../../context/context";
import axios from "axios";

function Register() {
  let history = useHistory();
  const { isSession, setIsSession } = useContext(AppContext);

  if (isSession.isAuth === "true") {
    history.push("/find-work");
  }

  const [error, setError] = useState("");
  const [register, setRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = async (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const registerUser = (e) => {
    e.preventDefault();

    if (
      !register.firstName ||
      !register.lastName ||
      !register.email ||
      !register.password ||
      !register.confirmPassword
    ) {
      return setError((error) => "All fields are required.");
    } else if (register.password !== register.confirmPassword) {
      return setError((error) => "Passwords do not match.");
    }
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/user/register`, {
        firstName: register.firstName,
        lastName: register.lastName,
        email: register.email,
        password: register.password,
        confirmPassword: register.confirmPassword,
        accountType: e.target.value,
      })
      .then((res) => {
        setIsSession({ type: "start" });
      })
      .catch((e) => {
        console.log(e);
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
                      Sign up
                    </p>

                    {/*Name*/}
                    <form className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        {/*First Name*/}
                        <i className="fas fa-user fa-lg me-3 fa-fw" />
                        <div className="flex-fill ms-1 mb-0">
                          <input
                            type="text"
                            value={register.firstName}
                            name={"firstName"}
                            className="form-control"
                            placeholder={"First Name"}
                            onChange={(e) => handleRegister(e)}
                          />
                        </div>

                        {/*Last Name*/}
                        <div className="flex-fill ms-3">
                          <input
                            type="text"
                            value={register.lastName}
                            name={"lastName"}
                            className="form-control"
                            placeholder={"Last Name"}
                            onChange={(e) => handleRegister(e)}
                          />
                        </div>
                      </div>

                      {/*Email*/}
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="flex-fill mb-0">
                          <input
                            type="email"
                            name={"email"}
                            value={register.email}
                            className="form-control"
                            placeholder={"Email"}
                            onChange={(e) => handleRegister(e)}
                          />
                        </div>
                      </div>

                      {/*Password*/}
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="flex-fill mb-0">
                          <input
                            type="password"
                            name={"password"}
                            value={register.password}
                            className="form-control"
                            placeholder={"Password"}
                            onChange={(e) => handleRegister(e)}
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-3">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="flex-fill mb-0">
                          <input
                            type="password"
                            name={"confirmPassword"}
                            value={register.confirmPassword}
                            className="form-control"
                            placeholder={"Confirm Password"}
                            onChange={(e) => handleRegister(e)}
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

                      {/*Select register type*/}
                      <div className="d-flex flex-fill justify-content-center flex-row mb-2">
                        <div className={""}>I want to...</div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="button"
                          value={"isClient"}
                          className="btn m-1 btn-primary btn-md"
                          onClick={(e) => registerUser(e)}
                        >
                          Hire a freelancer
                        </button>
                        <button
                          type="button"
                          value={"isFreelancer"}
                          className="btn m-1 btn-primary btn-md"
                          onClick={(e) => registerUser(e)}
                        >
                          Work as a freelancer
                        </button>
                      </div>
                    </form>
                    <div className={"d-flex justify-content-center"}>
                      <span>
                        Already have an account?{" "}
                        <Link to={"/login"}>Login</Link>{" "}
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

export default Register;
