import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { MdAttachMoney, MdAttachFile, MdDelete } from "react-icons/md";
import "../Proposal.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function Details({ currentListing }) {
  return (
    <>
      <div className={"card proposal-details-div"}>
        <div className={"job-title"}>
          <h4>Job Details</h4>
        </div>

        <div className={"job-body"}>
          <h4>{currentListing.title}</h4>
          <p>{currentListing.description}</p>
          <p>This job requires {currentListing.tokensRequired} Beacons</p>
        </div>

        <div className={"job-reqs"}>
          <span className={"skill-label"}>Experience Level</span>
          <span>{currentListing.experienceLevel} </span>
          <span className={"skill-label"}>Pay Rate</span>
          <span>${currentListing.payRate}.00</span>
          <span className={"skill-label"}>Pay Type</span>
          <span>{currentListing.payType}</span>
          <span className={"skill-label"}>Job Duration</span>
          <span>{currentListing.jobDuration}</span>
        </div>

        <div className={"job-skills"}>
          {currentListing.requiredSkills.map((skill, i) => (
            <span key={i} className={"job-skill-item"}>
              {skill}
            </span>
          ))}
        </div>
        {/*TODO add proposals, hires, and openings*/}
      </div>
    </>
  );
}

export default Details;
