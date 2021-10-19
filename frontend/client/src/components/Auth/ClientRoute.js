import { React, useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import AppContext from "../../context/context";

const CLRoute = ({ component: Component, ...props }) => {
  const { setIsSession } = useContext(AppContext);
  const userType = localStorage.getItem("userType");
  const isAuth = localStorage.getItem("isAuth");

  return (
    <Route
      {...props}
      render={(props) => {
        if (!isAuth || isAuth === "false") {
          return <Redirect to={"/login"} />;
        }
        if (userType === "client") {
          return <Component {...props} />;
        } else if (userType === "freelancer") {
          return <Redirect to={"/find-work"} />;
        } else {
          setIsSession({ type: "end" });
        }
      }}
    />
  );
};

export default CLRoute;
