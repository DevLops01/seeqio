import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
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
  const { user, setUser, isSession, setIsSession } = useContext(AppContext);

  let history = useHistory();
  if (isSession.isAuth === "false") {
    history.push("/login");
  }

  const { id } = useParams();
  const [listing, setListing] = useState([]);
  const [proposalRate, setProposalRate] = useState(0);
  const [byMilestone, setByMilestone] = useState(true);
  const [coverLetter, setCoverLetter] = useState("");
  const [allFiles, setAllFiles] = useState([]);
  const [files, setFiles] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [milestones, setMilestones] = useState([
    {
      title: "",
      completionDate: "",
      amount: "",
      key: "default",
    },
  ]);

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
      })
      .catch((e) => {
        if (e.response.status === 504) {
          setUser({});
          setIsSession({ type: "end" });
        }
      });
  }, [user.email]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/listing/by-proposal/${user.uuid}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        res.data.listings.forEach((item) => {
          if (item.uuid === listing[0].uuid) {
            history.push(`/find-work/${listing[0].uuid}`);
          }
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [listing[0]]);

  // Handle submit button disabled if payType = fixed
  useEffect(() => {
    if (byMilestone && coverLetter.length > 100) {
      let allFieldsComplete = [];

      milestones.forEach((milestone) => {
        allFieldsComplete.push(
          Object.values(milestone).every((field) => field !== "")
        );
      });

      if (allFieldsComplete.includes(false)) return setSubmitDisabled(true);

      return setSubmitDisabled(false);
    }

    if (!byMilestone && proposalRate > 0 && coverLetter.length > 100) {
      return setSubmitDisabled(false);
    }

    return setSubmitDisabled(true);
  }, [byMilestone, proposalRate, milestones, coverLetter]);

  // Handle submit button disabled if payType = hourly
  useEffect(() => {
    if (
      listing[0].payType === "hourly" &&
      coverLetter.length > 100 &&
      proposalRate > 0
    ) {
      setSubmitDisabled(false);
    }
  }, [coverLetter, listing[0], proposalRate]);

  //

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
    setSubmitDisabled(true);

    files.map((upload) => {
      data.append("file", upload.file);
    });

    data.append("creator", user.uuid);
    data.append("listing", id);
    data.append("payType", listing[0].payType);
    data.append("coverLetter", coverLetter);

    if (byMilestone) {
      data.append("proposalRate", totalAmount);
    } else {
      data.append("proposalRate", proposalRate);
    }

    if (listing[0].payType === "hourly") {
      data.append("isByMilestone", false);
    } else if (listing[0].payType === "fixed") {
      data.append("isByMilestone", byMilestone);
    }

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
        history.push("/proposals");
        console.log(res.data);
      })
      .catch((e) => {
        setSubmitDisabled(false);
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
        setListing([res.data]);
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
                        <>
                          <Milestone
                            totalAmount={totalAmount}
                            setTotalAmount={setTotalAmount}
                            setProposalRate={setProposalRate}
                            proposalRate={proposalRate}
                            milestones={milestones}
                            setMilestones={setMilestones}
                            currentListing={currentListing}
                          />
                        </>
                      ) : (
                        <Completion
                          setProposalRate={setProposalRate}
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
            />
          </div>

          <div className={"sub-btn-div"}>
            <button
              disabled={submitDisabled}
              className={"btn sub-prop-btn "}
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </button>
          </div>
        </>
      ))}
    </>
  );
}

export default Proposal;
