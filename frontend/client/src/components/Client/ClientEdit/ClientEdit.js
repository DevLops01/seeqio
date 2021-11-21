import React, { useState, useContext, useEffect } from "react";
import { Redirect, Route, useHistory, Link, useParams } from "react-router-dom";
import AppContext from "../../../context/context";
import axios from "axios";

function ClientEdit() {
  const { id } = useParams();
  const [listing, setListing] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/listing/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setListing(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [listing.length]);

  return (
    <>
      <div className={"container"}>
        <span>Edit</span>

        {listing ? <h4>{listing.title}</h4> : <></>}
      </div>
    </>
  );
}

export default ClientEdit;
