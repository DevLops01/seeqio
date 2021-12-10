import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./JobListing.css";
import Stars from "../Stars/Stars";
import AppContext from "../../context/context";
import TimeAgo from "../TimeAgo/TimeAgo";
import axios from "axios";

function JobListing({ page }) {
  const [jobListings, setListings] = useState([]);
  const [maxLength, setMaxLength] = useState(250);
  const [viewMore, setViewMore] = useState(false);
  const [viewMoreKey, setViewMoreKey] = useState(false);

  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/listing/recent`,
        { page },
        { withCredentials: true }
      )
      .then((res) => {
        setListings(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [jobListings.length, page]);

  const handleViewMore = (id) => {
    setViewMore(true);
    setViewMoreKey(id);
  };

  return (
    <>
      {jobListings.map((job) => (
        <div
          key={job.uuid}
          className="listingCard container flexbox-container card"
        >
          <div className="card-body">
            <Link to={`/find-work/${job.uuid}`}>
              <h5 className="card-title">{job.title}</h5>
            </Link>
            {/*Job Details*/}
            <div className={"detailsDiv"}>
              <div className={"detailsText"}>
                <p>
                  {job.payType}:{" "}
                  <span style={{ color: "green" }}>${job.payRate}</span> -{" "}
                  {job.experienceLevel} - Job Duration: {job.jobDuration}
                </p>
              </div>
            </div>

            {/*Job Information paragraph*/}
            <p className="card-text">
              {job.description.length > maxLength && !viewMore ? (
                <>
                  {`${job.description.substring(0, maxLength)}... `}
                  <span
                    className={"view-more-less"}
                    onClick={() => handleViewMore(job.uuid)}
                  >
                    show more
                  </span>
                </>
              ) : job.description.length > maxLength &&
                viewMore &&
                viewMoreKey === job.uuid ? (
                <>
                  {job.description.substring(0, job.description.length)}{" "}
                  <span
                    className={"view-more-less"}
                    onClick={() => setViewMore(false)}
                  >
                    show less
                  </span>
                </>
              ) : (
                <>
                  {`${job.description.substring(0, maxLength)}... `}
                  <span
                    className={"view-more-less"}
                    onClick={() => handleViewMore(job.uuid)}
                  >
                    show more
                  </span>
                </>
              )}
            </p>

            <div className={"submittedApps"}>
              <p>Openings: {job.openings}</p>
              <p>Proposals: {job.proposals.length}</p>
            </div>
            <div className="creatorDetails">
              <span style={{ color: job.funded ? "green" : "grey" }}>
                {job.funded ? "Funded" : "Unfunded"}
              </span>
              <span>
                Posted:{" "}
                <TimeAgo
                  currentDate={Date.now()}
                  beginDate={Date.parse(job.createdAt)}
                />
              </span>
            </div>
            <span>
              <Stars rating={job.clientRating} />
            </span>
          </div>
        </div>
      ))}
    </>
  );
}

export default JobListing;
