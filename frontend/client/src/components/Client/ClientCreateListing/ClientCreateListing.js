import { React, useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import AppContext from "../../../context/context";
import "./ClientCreateListing.css";

function ClientCreateListing() {
  return (
    <>
      <div className={"container client-create-wrapper"}>
        <h4>Create A Listing</h4>
      </div>
    </>
  );
}

export default ClientCreateListing;
