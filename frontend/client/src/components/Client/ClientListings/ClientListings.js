import { React, useEffect, useState } from "react";
import "./ClientListings.css";
import axios from "axios";

function ClientListings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/listing/client/recent`, {
        withCredentials: true,
      })
      .then((res) => {
        setListings(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [listings.length]);

  return (
    <>
      <div className={"container display-listings-div"}>
        {listings ? (
          <>
            {listings.map((listing) => (
              <div key={listing.uuid} className={"listing-item"}>
                <span>{listing.title}</span>
              </div>
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default ClientListings;
