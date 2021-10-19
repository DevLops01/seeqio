import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import AppContext from "../../context/context";
import axios from "axios";
import "./FindWork.css";
import JobListing from "../JobListing/JobListing";
import { BiSearchAlt2 } from "react-icons/bi";
import { AiFillEye } from "react-icons/ai";

function FindWork() {
  const history = useHistory();
  const { isSession, user } = useContext(AppContext);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (isSession.isAuth === "false") {
      history.push("/login");
    }
  }, [isSession.isAuth]);

  // useEffect(() => {
  //   if (user.type !== "freelancer") {
  //     history.push("/client");
  //   }
  // }, [user.type]);

  return (
    <>
      <div className={"container listings-layout-container"}>
        <div className={"search-input-div"}>
          <div>
            <input
              className={"search-input-field"}
              type="search"
              placeholder={"Find Work"}
            />
            <button className={"btn search-btn"}>{BiSearchAlt2()}</button>
          </div>
        </div>

        <div className={"skills-left-div"}>
          <div className={"skills-details"}>
            <div className={"skills-title"}>
              <h4>My Skills</h4>
            </div>
            <span>Software Development</span>
          </div>
        </div>

        <div className={"card listings-middle-div"}>
          <JobListing page={page} />
          <div>
            <button className={"load-more"} onClick={() => setPage(page + 1)}>
              View more
            </button>
          </div>
        </div>

        <div className={"user-info-right-div"}>
          <span className={"view-profile-link"}>
            <Link to={""}>{AiFillEye()} View Profile</Link>
          </span>
          <Link to={""}>75 Available Seeqs</Link>
        </div>
      </div>
    </>
  );
}

export default FindWork;
