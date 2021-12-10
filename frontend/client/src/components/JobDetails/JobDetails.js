import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { MdAttachMoney, MdDateRange, MdSchool, MdWork } from "react-icons/md";
import "./JobDetails.css";
import TimeAgo from "../TimeAgo/TimeAgo";
import axios from "axios";
import AppContext from "../../context/context";

function JobDetails() {
  const { user, setUser, setIsSession } = useContext(AppContext);
  const [listing, setListing] = useState([]);
  const [hasProposed, setHasProposed] = useState(false);
  const { id } = useParams();

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
      .get(`${process.env.REACT_APP_BASE_URL}/api/listing/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setListing([res.data]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/listing/by-proposal/${user.uuid}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        res.data.listings.forEach((item) => {
          if (listing[0] && item.uuid === listing[0].uuid) {
            setHasProposed(true);
          }
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [listing[0]]);

  return (
    <>
      {listing.map((currentListing, i) => (
        <div key={i} className={"container MainContainer"}>
          <div className={"ContainerItems TopBar"}>
            <span>Job Description</span>
          </div>
          <div className={"ContainerItems LeftBar card"}>
            <div className={"ContainerItems"}>
              <h4>{currentListing.title}</h4>
              {currentListing.funded ? (
                <span style={{ color: "green" }}>Funded</span>
              ) : (
                <span>Unfunded</span>
              )}
              <div className={"details-header"}>
                <div className={""}>
                  Proposals:
                  <span className={"font-weight-bold"}>
                    {" "}
                    {currentListing.proposals.length}
                  </span>{" "}
                  | Posted:{" "}
                  <span className={"font-weight-bold"}>
                    <TimeAgo
                      currentDate={Date.now()}
                      beginDate={Date.parse(currentListing.createdAt)}
                    />
                  </span>
                </div>
              </div>
              <hr />
              <div className={"details-body"}>
                <p>{currentListing.description}</p>
              </div>
            </div>
          </div>
          <div className={"ContainerItems RightBar card"}>
            <div className={"right-bar-header"}>
              <div>
                {hasProposed ? (
                  <Link to={`/proposal/view/${id}`}>
                    <button className={"prop-btn btn"}>View Proposal</button>
                  </Link>
                ) : (
                  <Link to={`/proposal/create/${id}`}>
                    <button className={"prop-btn btn"}>Submit Proposal</button>
                  </Link>
                )}
              </div>
            </div>

            <div className={"right-bar-body"}>
              <div className={"right-bar-items"}>
                {/**/}

                <div className={"item-wrap"}>
                  <span className={"right-bar-icon"}>{MdAttachMoney()}</span>
                  <div className={"right-details-stacked"}>
                    <span className={"item-title"}>Pay Rate </span>
                    <span>
                      {currentListing.payRate}.00 {currentListing.payType}
                    </span>
                  </div>
                </div>

                {/**/}

                {/*<div className={"item-wrap"}>*/}
                {/*  <span className={"right-bar-icon"}>{MdDateRange()}</span>*/}
                {/*  <div className={"right-details-stacked"}>*/}
                {/*    <span className={"item-title"}>Start Date</span>*/}
                {/*    <span>*/}
                {/*      {new Date(currentListing.startDate).toLocaleDateString()}*/}
                {/*    </span>*/}
                {/*  </div>*/}
                {/*</div>*/}

                {/**/}

                {/*<div className={"item-wrap"}>*/}
                {/*  <span className={"right-bar-icon"}>{MdDateRange()}</span>*/}
                {/*  <div className={"right-details-stacked"}>*/}
                {/*    <span className={"item-title"}>End Date</span>*/}
                {/*    <span>*/}
                {/*      {new Date(currentListing.endDate).toLocaleDateString()}*/}
                {/*    </span>*/}
                {/*  </div>*/}
                {/*</div>*/}

                {/**/}

                <div className={"item-wrap"}>
                  <span className={"right-bar-icon"}>{MdWork()}</span>
                  <div className={"right-details-stacked"}>
                    <span className={"item-title"}>Skill Level</span>
                    <span>{currentListing.experienceLevel}</span>
                  </div>
                </div>

                {/**/}

                <div className={"item-wrap"}>
                  <span className={"right-bar-icon"}>{MdSchool()}</span>
                  <div className={"right-details-stacked"}>
                    <span className={"item-title"}>Required Skills</span>
                    <div className={"right-details-stacked-skills"}>
                      {currentListing.requiredSkills.length > 3
                        ? currentListing.requiredSkills
                            .slice(0, 3)
                            .map((skill, i) => (
                              <span
                                className={"right-details-stacked-span"}
                                key={i}
                              >
                                {skill}
                              </span>
                            ))
                        : currentListing.requiredSkills.map((skill, i) => (
                            <span
                              className={"right-details-stacked-span"}
                              key={i}
                            >
                              {skill}
                            </span>
                          ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default JobDetails;
