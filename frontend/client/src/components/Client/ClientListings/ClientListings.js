import { React, useEffect, useState } from "react";
import "./ClientListings.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";

function ClientListings() {
  const [listings, setListings] = useState([]);

  const history = useHistory();

  const handleEdit = (id) => {
    history.push(`/client/listing/edit/${id}`);
  };

  //history.push(`/client/listing/edit/${res.data.id}`);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/listing/client/recent/3`, {
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
      {listings ? (
        <>
          {listings.map((listing) =>
            !listing.isDraft ? (
              <div className={"display-listings-div"}>
                <div key={listing.uuid} className={"listing-item"}>
                  <span className={"listing-title"}>{listing.title}</span>
                  <div className={"edit-delete-listing"}>
                    <span
                      onClick={() => handleEdit(listing.uuid)}
                      className={"ed-inner"}
                    >
                      {MdEdit()}
                    </span>
                    <span className={"ed-inner"}>{MdDelete()}</span>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default ClientListings;
