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
  const { isSession, user, setUser, setIsSession } = useContext(AppContext);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (isSession.isAuth === "false") {
      history.push("/login");
    }
  }, [isSession.isAuth]);

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
        return;
      })
      .catch((e) => {
        if (e.response.status === 504) {
          setUser({});
          setIsSession({ type: "end" });
        }
      });
  }, [user.email]);

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

        <div className={"skills-left-div card"}>
          <div className={"skills-details"}>
            <div className={"skills-title"}>
              <h4>Filters</h4>
            </div>
            <span>Software Development</span>
          </div>
        </div>

        <div className={"card listings-middle-div"}>
          <JobListing page={page} />
          <div>
            <button
              className={"btn load-more"}
              onClick={() => setPage(page + 1)}
            >
              View more
            </button>
          </div>
        </div>

        <div className={"user-info-right-div"}>
          <div className={"right-info-items card"}>
            <div className={"right-item-inner-div"}>
              <span className={"view-profile-link"}>
                <Link to={`/freelancer/${user.uuid}`}>
                  <span>{AiFillEye()}</span>View Profile
                </Link>
              </span>
            </div>

            <div className={"right-item-inner-div"}>
              <Link to={""}>Available SEEQ: 75</Link>
            </div>

            <div className={"right-item-inner-div"}>
              <Link to={`/proposals`}>
                <span>Proposals</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FindWork;
