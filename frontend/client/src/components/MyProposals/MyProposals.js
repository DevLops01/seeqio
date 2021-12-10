import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../context/context";
import "./MyProposal.css";
import { FiSettings } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import { Link, Redirect, useParams } from "react-router-dom";
import axios from "axios";

function MyProposals() {
  const { user, setUser, isSession, setIsSession } = useContext(AppContext);
  const [listings, setListings] = useState([]);

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
          setUser({});
          setIsSession({ type: "end" });
        }
      });
  }, [user.email]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/listing/by-proposal/${user.uuid}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setListings(res.data.listings);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <div className={"container"}>
        <div className={"profile-wrapper"}>
          <div className={"card profile-card-body"}>
            <div className={"profile-card-body-header"}>
              <div className={""}>
                <div className={"user-profile-info"}>
                  <span>
                    <h3>Proposals</h3>
                  </span>
                </div>
              </div>
            </div>

            <span>
              {listings ? (
                <>
                  <div className={"prop-row-div"}>
                    <div className={"prop-row"}>
                      <div className={"prop-heading"}>
                        <span>Title</span>
                      </div>
                      <div className={"prop-heading"}>
                        <span>Status</span>
                      </div>
                      <div className={"prop-heading"}>
                        <span>Date</span>
                      </div>
                      <div className={"prop-heading"}>
                        <span>Withdraw</span>
                      </div>
                    </div>
                  </div>
                  {listings.map((prop) => (
                    <div key={prop.listingId} className={"sub-prop-div"}>
                      <div className={"sub-prop-inner-div"}>
                        <span className={"sub-prop-item"}>
                          <Link to={`/find-work/${prop.listingId}`}>
                            {prop.title}
                          </Link>
                        </span>

                        <span className={"sub-prop-item"}>
                          {prop.propData.withdrawn ? (
                            <span>Withdrawn</span>
                          ) : (
                            <span>Submitted</span>
                          )}
                        </span>

                        <span className={"sub-prop-item"}>
                          {new Date(
                            prop.propData.submitted
                          ).toLocaleDateString()}
                        </span>

                        <span className={"sub-prop-item"}>
                          {prop.listingTitle}
                        </span>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <></>
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyProposals;
