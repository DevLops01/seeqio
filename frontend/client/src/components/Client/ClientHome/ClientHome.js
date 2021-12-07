import React, { useState, useContext, useEffect } from "react";
import { Redirect, Route, useHistory, Link } from "react-router-dom";
import AppContext from "../../../context/context";
import "./ClientHome.css";
import axios from "axios";
import ClientListings from "../ClientListings/ClientListings";
import ClientDrafts from "../ClientDrafts/ClientDrafts";

function ClientHome() {
  const history = useHistory();
  const { isSession, user } = useContext(AppContext);

  useEffect(() => {
    if (isSession.isAuth === "false") {
      history.push("/login");
    }
  }, [isSession.isAuth]);

  return (
    <>
      <div className={"container client-home-wrapper"}>
        {/*Top Section*/}
        <div className={"top-banner-div"}>
          {/*Company Name*/}
          <div className={"company-name"}>
            <h4>
              {user.firstName} {user.lastName}
            </h4>
          </div>

          {/*Post Job Button*/}
          <div className={"post-btn"}>
            <Link to={"/client/listing/create"}>
              <button className={"post-button btn"}>Post A Job</button>
            </Link>
          </div>
        </div>

        <div className={"card my-listings-div"}>
          <div className={"container my-listings-header"}>
            <h4 className={"my-listings-header-title"}>My Listings</h4>
          </div>
          <ClientListings />
        </div>

        <div className={"card my-listings-div"}>
          <div className={"container my-listings-header"}>
            <h4 className={"my-listings-header-title"}>Drafts</h4>
          </div>
          <ClientDrafts />
        </div>
      </div>
    </>
  );
}

export default ClientHome;
