import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../context/context";
import "./Profile.css";
import { FiSettings } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Profile() {
  const { id } = useParams();
  const { isSession } = useContext(AppContext);
  const [profileInfo, setProfileInfo] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/user/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setProfileInfo(res.data);
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
                    <h3>
                      {profileInfo.firstName} {profileInfo.lastName}
                    </h3>
                  </span>
                  <span>Location: {profileInfo.country}</span>
                  <span>
                    Rating:{" "}
                    {profileInfo.rating ? profileInfo.rating : `No reviews`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
