import { React, useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import AppContext from "../../context/context";

const FLRoute = ({ component: Component, ...props }) => {
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
        if (userType === "freelancer") {
          return <Component {...props} />;
        } else if (userType === "client") {
          return <Redirect to={"/client"} />;
        } else {
          setIsSession({ type: "end" });
        }
      }}
    />
  );
};

export default FLRoute;
