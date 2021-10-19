import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { MdAttachMoney, MdAttachFile, MdDelete } from "react-icons/md";
import "../Proposal.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import AppContext from "../../../context/context";

function Hourly({ currentListing, proposalRate, handleProposalRate }) {
  const { user } = useContext(AppContext);

  return (
    <>
      <div className={"client-freelancer-rate"}>
        <span className={"rates"}>
          <span className={"bold-title"}>My Hourly Rate:</span> $
          {user.hourlyRate}
        </span>

        {/*Hourly Client budget*/}
        <span className={"rates"}>
          <span className={"bold-title"}>Client's budget:</span> $
          {currentListing.payRate}
          .00/hr
        </span>
      </div>

      <div className={"terms-input"}>
        <div className={"hourly-input"}>
          <span>
            <span className={"bold-title"}>Hourly Rate</span>{" "}
            <span className={"info-text muted"}>- Rate for this job.</span>
          </span>

          {/*Hourly set rate */}
          <div className={"money"}>
            <span className={"dollar-icon"}>{MdAttachMoney()}</span>
            <input
              value={proposalRate}
              onChange={(e) => handleProposalRate(e)}
              className={"hourly-input-field"}
              placeholder={`${user.hourlyRate}`}
            />
            <span className={"anHour muted"}>/hr</span>
          </div>
        </div>
      </div>

      <div className={"terms-input"}>
        <div className={"hourly-input"}>
          <span>
            <span className={"bold-title"}>You'll Earn</span>{" "}
            <span className={"info-text muted"}>- After 5% Service Fee</span>
          </span>

          {/*Hourly potential earnings*/}
          <div className={"money"}>
            <span className={"dollar-icon"}>{MdAttachMoney()}</span>
            <input
              disabled={true}
              value={parseFloat(proposalRate - proposalRate * 0.05).toFixed(2)}
              onChange={(e) => handleProposalRate(e)}
              className={"hourly-service-fee"}
              placeholder={`${user.hourlyRate * 0.05}`}
            />
            <span className={"anHour muted"}>/hr</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hourly;
