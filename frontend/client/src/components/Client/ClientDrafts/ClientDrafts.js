import { React, useEffect, useState } from "react";
import "./ClientDrafts.css";
import axios from "axios";

function ClientDrafts() {
  const [draftListings, setDraftListings] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/listing/client/recent`, {
        withCredentials: true,
      })
      .then((res) => {
        setDraftListings(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [draftListings.length]);

  return (
    <>
      {draftListings ? (
        <>
          <div className={"card my-listings-div"}>
            <div className={"container my-listings-header"}>
              <h4 className={"my-listings-header-title"}>Drafts</h4>
            </div>
            <div className={"container display-listings-div"}>
              {draftListings.map((draft) =>
                draft.isDraft ? (
                  <div key={draft.uuid} className={"listing-item"}>
                    <span className={"listing-title btn"}>{draft.title}</span>
                  </div>
                ) : (
                  <></>
                )
              )}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default ClientDrafts;
