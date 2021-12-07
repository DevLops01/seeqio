import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { MdAttachMoney, MdAttachFile, MdDelete } from "react-icons/md";
import "../Proposal.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import AppContext from "../../../context/context";

function Completion({
  currentListing,
  proposalRate,
  handleProposalRate,
  validateTerms,
  setProposalRate,
}) {
  useEffect(() => {
    if (isNaN(proposalRate)) {
      setProposalRate(currentListing.payRate);
    }
  });

  return (
    <>
      <div className={"client-freelancer-rate"}>
        <span className={"rates"}>
          <span className={"bold-title"}>Client's budget:</span>$
          {currentListing.payRate.toFixed(2)}
        </span>
      </div>

      <div className={"terms-input"}>
        {/* User by project bid*/}
        <div className={"hourly-input"}>
          <span>
            <span className={"bold-title"}>My Bid</span>{" "}
            <span className={"info-text muted"}>
              - Bid to complete this entire job
            </span>
          </span>

          {/* User Pay by project bid*/}
          <div className={"money"}>
            <span className={"dollar-icon"}>{MdAttachMoney()}</span>
            <input
              // onMouseLeave={() => validateTerms()}
              value={proposalRate}
              onClick={() => setProposalRate("")}
              onChange={(e) => handleProposalRate(e)}
              className={"hourly-input-field"}
              placeholder={`0.00`}
            />
          </div>
        </div>
      </div>

      {/*User pay by project potential earnings*/}
      <div className={"terms-input"}>
        <div className={"hourly-input"}>
          <span>
            <span className={"bold-title"}>You'll Earn</span>{" "}
            <span className={"info-text muted"}>- After 5% Service Fee</span>
          </span>

          <div className={"money"}>
            <span className={"dollar-icon"}>{MdAttachMoney()}</span>
            <input
              type={"string"}
              disabled={true}
              value={
                isNaN(parseFloat(proposalRate - proposalRate * 0.05).toFixed(2))
                  ? 0
                  : parseFloat(proposalRate - proposalRate * 0.05).toFixed(2)
              }
              // value={{ isNaN(parseFloat(proposalRate - proposalRate * 0.05).toFixed(2)) ? 0}}
              onChange={(e) => handleProposalRate(e)}
              className={"hourly-service-fee"}
              placeholder={`0.00`}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Completion;
