import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { MdAttachMoney, MdAttachFile, MdDelete } from "react-icons/md";
import "../Proposal.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import AppContext from "../../../context/context";

function Fixed({ byMilestone, setByMilestone }) {
  const { user } = useContext(AppContext);

  return (
    <>
      <span>How would you like to be paid?</span>

      <div className={"fixed-price-container"}>
        {/*Radio options select*/}

        {/*Get paid by milestone*/}
        <div className={"radio-options-div"}>
          <input
            onChange={() => setByMilestone(!byMilestone)}
            value={byMilestone}
            checked={byMilestone}
            type="radio"
          />
          <span>By Milestone</span>
        </div>

        {/*Get paid by project*/}
        <div className={"radio-options-div"}>
          <input
            onChange={() => setByMilestone(false)}
            value={!byMilestone}
            checked={!byMilestone}
            type="radio"
          />{" "}
          <span>On Completion</span>
        </div>
      </div>
    </>
  );
}

export default Fixed;
