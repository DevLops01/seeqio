import React, { useState, useReducer, useEffect } from "react";
import axios from "axios";
import AppContext from "../context/context";
import { Redirect } from "react-router-dom";
import { sessionReducer } from "../reducers/reducers";
import { sessionState } from "../reducers/states";

const AppState = (props) => {
  const [isSession, setIsSession] = useReducer(sessionReducer, sessionState);
  const [user, setUser] = useState({});
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/user`,
        {},
        { withCredentials: true }
      )
      .then(async (res) => {
        if (res.status === 200) {
          setUser(res.data);
        }
      })
      .catch((e) => {
        if (e.response.status === 504) {
          setTimedOut(!timedOut);
          setIsSession({ type: "end" });
          <Redirect to={"/login"} />;
        }
      });
  }, [user.email]);

  return (
    <AppContext.Provider
      value={{
        isSession,
        setIsSession,
        user,
        setUser,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
