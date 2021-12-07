import { React, useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import AppContext from "../../context/context";

const CLRoute = ({ component: Component, ...props }) => {
  const { user, setUser, setIsSession } = useContext(AppContext);
  const userType = localStorage.getItem("userType");
  const isAuth = localStorage.getItem("isAuth");

  useEffect(() => {
    if (user.type && user.type !== userType) {
      setIsSession(false);
      localStorage.setItem("isAuth", false);
    }
  }, [user]);

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
