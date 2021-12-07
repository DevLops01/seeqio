import { React, useEffect, useState, useContext } from "react";
import axios from "axios";
import { Redirect, Route, useHistory, Link } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import AppContext from "../../../context/context";

function ClientDrafts() {
  const history = useHistory();
  const [draftListings, setDraftListings] = useState([]);

  const handleEdit = (id) => {
    history.push(`/client/listing/edit/${id}`);
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/listing/client/recent/drafts/3`,
        {
          withCredentials: true,
        }
      )
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
          {draftListings.map((draft) =>
            draft.isDraft ? (
              <div className={"display-listings-div"}>
                <div key={draft.uuid} className={"listing-item"}>
                  <span className={"listing-title"}>{draft.title}</span>
                  <div className={"edit-delete-listing"}>
                    <span
                      onClick={() => handleEdit(draft.uuid)}
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

export default ClientDrafts;
