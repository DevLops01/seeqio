import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { MdAttachFile, MdDelete } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";
import "../Proposal.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import AppContext from "../../../context/context";

function Milestone({
  milestones,
  setMilestones,
  currentListing,
  proposalRate,
  setProposalRate,
  totalAmount,
  setTotalAmount,
}) {
  const { user } = useContext(AppContext);

  const handleMilestoneChange = (e, i) => {
    if (e.target.name === "amount" && isNaN(e.target.value)) {
      return;
    }
    const inputs = [...milestones];
    inputs[i][e.target.name] = e.target.value;

    setMilestones(inputs);
  };

  const handleRemoveMilestone = async (key) => {
    setMilestones(
      milestones.filter((milestone) => {
        return milestone.key !== key;
      })
    );
  };

  useEffect(() => {
    let total = 0;

    milestones.forEach((ms) => {
      total = parseFloat(total);
      total += parseFloat(ms.amount);
    });

    if (isNaN(total)) {
      return;
    }

    setTotalAmount(parseFloat(total).toFixed(2));
  }, [milestones]);

  const addMileStoneInput = async () => {
    setMilestones([
      ...milestones,
      {
        title: "",
        completionDate: "",
        amount: "",
        key: uuidv4(),
      },
    ]);
  };

  return (
    <>
      {/*If get Paid by Milsetone*/}
      <div className={"client-freelancer-rate"}>
        <span className={"rates"}>
          <span className={"bold-title"}>Client's budget:</span>$
          {currentListing.payRate.toFixed(2)}
        </span>
      </div>

      <div className={"paid-by-milestone-container"}>
        {milestones ? (
          milestones.map((milestone, i) => (
            <div key={milestone.key} className={"milestone"}>
              <div className={"milestone-item"}>
                <span className={"input-label "}>Description</span>

                <input
                  name={"title"}
                  value={milestone.title}
                  onChange={(e) => handleMilestoneChange(e, i)}
                  className={"milestone-input desc-input"}
                  type="text"
                />
              </div>

              <div className={"milestone-item"}>
                <span className={"input-label"}>Date</span>
                <input
                  name={"completionDate"}
                  value={milestone.completionDate}
                  onChange={(e) => handleMilestoneChange(e, i)}
                  className={"milestone-input"}
                  type="date"
                />
              </div>

              <div className={"milestone-item"}>
                {/* Remove Milestone Button*/}
                {milestone.key !== "default" ? (
                  <>
                    <span className={"input-label"}>Amount</span>

                    <input
                      name={"amount"}
                      value={milestone.amount}
                      onChange={(e) => handleMilestoneChange(e, i)}
                      className={"milestone-input"}
                      type="text"
                    />

                    <span
                      onClick={() => handleRemoveMilestone(milestone.key)}
                      className={"delete-file"}
                    >
                      {MdDelete()}
                    </span>
                  </>
                ) : (
                  <>
                    {/* Default amount input design*/}
                    <span className={"input-label"}>Amount</span>

                    <input
                      name={"amount"}
                      value={milestone.amount}
                      onChange={(e) => handleMilestoneChange(e, i)}
                      className={"milestone-input default"}
                      type="text"
                    />
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <></>
        )}

        {/*Add additional milestone link*/}
        <span className={"add-milestone"} onClick={() => addMileStoneInput()}>
          Add Milestone
        </span>

        <div className={"bid-total-div"}>
          <div className={"bid-total"}>
            Total Bid: {FaDollarSign()} {totalAmount}
          </div>
        </div>
      </div>
    </>
  );
}

export default Milestone;
