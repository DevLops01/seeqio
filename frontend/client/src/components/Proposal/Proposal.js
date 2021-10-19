import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { MdAttachMoney, MdAttachFile, MdDelete } from "react-icons/md";
import AppContext from "../../context/context";
import "./Proposal.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Details from "./Details/Details";
import Hourly from "./Hourly/Hourly";
import Fixed from "./Fixed/Fixed";
import Milestone from "./Milestone/Milsetone";
import Completion from "./Completion/Completion";
import CoverLetter from "./CoverLetter/CoverLetter";

function Proposal() {
  const { user, isSession } = useContext(AppContext);

  let history = useHistory();
  if (isSession.isAuth === "false") {
    history.push("/login");
  }

  const { id } = useParams();
  const [listing, setListing] = useState([]);
  const [proposalRate, setProposalRate] = useState(user.hourlyRate);
  const [byMilestone, setByMilestone] = useState(true);
  const [coverLetter, setCoverLetter] = useState("");
  const [allFiles, setAllFiles] = useState([]);
  const [files, setFiles] = useState([]);

  const [milestones, setMilestones] = useState([
    {
      title: "",
      completionDate: "",
      amount: "",
      key: "default",
    },
  ]);

  const handleProposalRate = async (e) => {
    if (!isNaN(e.target.value)) {
      setProposalRate((proposalRate) => e.target.value);
    }
  };

  const handleTextField = async (e) => {
    setCoverLetter((coverLetter) => e.target.value);
  };

  const validateTerms = async () => {
    const decPropRate = parseFloat(proposalRate).toFixed(2);
    const filtered = decPropRate.replace(/[-+^$%]/g, "");
    setProposalRate(filtered);
  };

  const handleSubmit = async () => {
    let data = new FormData();
    files.map((upload) => {
      data.append("file", upload.file);
    });

    data.append("creator", user.uuid);
    data.append("listing", id);
    data.append("isByMilestone", byMilestone);
    data.append("payType", listing[0].payType);
    data.append("proposalRate", proposalRate);
    data.append("coverLetter", coverLetter);

    milestones.map((milestone) => {
      const milestoneData = {
        title: milestone.title,
        completionDate: milestone.completionDate,
        amount: milestone.amount,
      };
      data.append("milestones", JSON.stringify(milestoneData));
    });

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/proposal/create`, data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Get current listing
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/listing/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setListing(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      {listing.map((currentListing) => (
        <>
          <div className={"container main-proposal-container"}>
            <Details currentListing={currentListing} />

            <div className={"card proposal-terms-div"}>
              <div className={"job-title"}>
                <h4>Set Terms</h4>
              </div>

              <div className={"set-terms-body"}>
                <div className={"hourlyRate"}>
                  {currentListing.payType.toLowerCase() === "hourly" ? (
                    <Hourly
                      currentListing={currentListing}
                      proposalRate={proposalRate}
                      handleProposalRate={handleProposalRate}
                    />
                  ) : (
                    <>
                      <Fixed
                        byMilestone={byMilestone}
                        setByMilestone={setByMilestone}
                      />

                      {byMilestone ? (
                        <Milestone
                          milestones={milestones}
                          setMilestones={setMilestones}
                        />
                      ) : (
                        <Completion
                          proposalRate={proposalRate}
                          currentListing={currentListing}
                          handleProposalRate={handleProposalRate}
                          validateTerms={validateTerms}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <CoverLetter
              coverLetter={coverLetter}
              setCoverLetter={setCoverLetter}
              allFiles={allFiles}
              setAllFiles={setAllFiles}
              files={files}
              setFiles={setFiles}
              handleTextField={handleTextField}
              handleSubmit={handleSubmit}
            />
          </div>
        </>
      ))}
    </>
  );
}

export default Proposal;
