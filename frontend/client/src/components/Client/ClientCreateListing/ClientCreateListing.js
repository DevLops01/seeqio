import { React, useContext, useEffect, useState } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import AppContext from "../../../context/context";
import "./ClientCreateListing.css";
import axios from "axios";
import loading from "../../../assets/loading.gif";
import { v4 as uuidv4 } from "uuid";

function ClientCreateListing() {
  const { user, isSession } = useContext(AppContext);

  let history = useHistory();

  if (isSession.isAuth === "false") {
    history.push("/login");
  }

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [step, setStep] = useState(1);
  const [showLoading, setShowLoading] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(true);
  const [listingData, setListingData] = useState({
    title: "",
    description: "",
    category: "",
    skills: [],
    payType: "",
    budget: "",
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/static/categories`, {
        withCredentials: true,
      })
      .then((res) => {
        setCategories(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const onSelectCategory = async (categoryId) => {
    setSelectedCategory(categoryId);

    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/static/skills/${categoryId}`,
        { withCredentials: true }
      )
      .then((res) => setSkills(res.data))
      .catch((e) => console.log(e));

    setListingData({ ...listingData, category: categoryId, skills: [] });
    setSelectedSkills([]);
  };

  const handleSelectSkill = async (id) => {
    switch (true) {
      case selectedSkills.includes(id):
        const filteredSkills = selectedSkills.filter((selected) => {
          return selected !== id;
        });

        setSelectedSkills(filteredSkills);
        setListingData({ ...listingData, ["skills"]: filteredSkills });
        return;

      case !selectedSkills.includes(id):
        const allSkills = [];

        allSkills.push(id);

        selectedSkills.forEach((item) => {
          allSkills.push(item);
        });

        setListingData({ ...listingData, ["skills"]: allSkills });
        setSelectedSkills((selectedSkills) => [...selectedSkills, id]);
        return;

      default:
        break;
    }
  };

  const handleStep = async (e) => {
    if (parseInt(e.target.value) === 0 && step > 1) {
      await setShowLoading(true);

      setTimeout(() => {
        setShowLoading(false);
      }, 250);
      setStep(step - 1);
    }

    if (parseInt(e.target.value) === 1 && step < 5) {
      setNextDisabled(true);

      switch (true) {
        case step === 1 && !listingData.title:
          console.log("Title is required.");
          return;

        case step === 2 && !listingData.description:
          console.log("Description is required.");
          return;

        case (step === 3 && listingData.category.length < 1) ||
          (step === 3 && listingData.skills.length < 1):
          console.log("Category & Skills are required.");
          return;

        case step === 4 && !listingData.payType:
          console.log("Pay Type is required.");
          return;

        case step === 5 && !listingData.budget:
          console.log("Budget is required.");
          return;
      }

      await setShowLoading(true);

      setTimeout(() => {
        setShowLoading(false);
      }, 250);

      setStep(step + 1);
    }
  };

  const handleUpdate = (e) => {
    const name = e.target.name;

    if (
      name === "description" &&
      listingData.description.length >= 5000 &&
      e.nativeEvent.inputType !== "deleteContentBackward"
    ) {
      return;
    }

    setListingData({ ...listingData, [e.target.name]: e.target.value });
  };

  const handleSubmitReview = async () => {
    const isEmptyField = Object.values(listingData).some(
      (item) => item === null || item === ""
    );

    if (isEmptyField === false) {
      let data = new FormData();

      data.append("creator", user.uuid);
      data.append("title", listingData.title);
      data.append("description", listingData.description);
      data.append("category", listingData.category);
      data.append("skills", listingData.skills);
      data.append("payType", listingData.payType);
      data.append("budget", listingData.budget);

      axios
        .post(`${process.env.REACT_APP_BASE_URL}/api/listing/draft`, data, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data.id);
            history.push(`/client/listing/create/review/${res.data.id}`);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  useEffect(() => {
    switch (true) {
      case step === 1 && listingData.title.length > 0:
        setNextDisabled(false);
        return;

      case step === 2 &&
        listingData.description.length > 1 &&
        listingData.description.length <= 5000:
        setNextDisabled(false);
        return;

      case step === 3 &&
        listingData.category.length > 0 &&
        listingData.skills.length > 0:
        setNextDisabled(false);
        return;

      case step === 4 && listingData.payType.length > 0:
        setNextDisabled(false);
        return;

      case step === 5 && listingData.budget:
        setNextDisabled(false);
        return;

      default: {
        setNextDisabled(true);
        return;
      }
    }
  }, [listingData]);

  return (
    <>
      <div className={"container client-create-wrapper"}>
        <div className={"container client-create-body"}>
          <div className={""}>
            <h4>Create A Job Listing</h4>
          </div>

          <span>
            <p>Step {step} / 5</p>
          </span>

          {step === 1 ? (
            <>
              {showLoading ? (
                <div className={"card section-div"}>
                  <div className={"section-header"}></div>

                  <div className={"section-inner"}>
                    <div className={"loading-gif"}>
                      <img src={loading} alt="" />{" "}
                    </div>
                  </div>
                </div>
              ) : (
                /* Title section*/
                <div className={"card section-div"}>
                  <div className={"section-header"}>
                    <h4>Title</h4>
                  </div>

                  <div className={"section-inner"}>
                    <p>
                      Help candidates better understand your project by adding a
                      descriptive title.
                    </p>
                    <input
                      name={"title"}
                      value={listingData.title}
                      onChange={(e) => handleUpdate(e)}
                      className={"create-form-field form-control"}
                      type="text"
                      placeholder={"Give your job a title"}
                    />
                  </div>
                </div>
                /* End Title section*/
              )}
            </>
          ) : (
            <></>
          )}

          {step === 2 ? (
            <>
              {showLoading ? (
                <div className={"card section-div"}>
                  <div className={"section-header"}></div>

                  <div className={"section-inner"}>
                    <div className={"loading-gif"}>
                      <img src={loading} alt="" />{" "}
                    </div>
                  </div>
                </div>
              ) : (
                /* Description */
                <div className={"card section-div"}>
                  <div className={"section-header"}>
                    <h4>Description</h4>
                  </div>

                  <div className={"section-inner"}>
                    <p>
                      Let your potential freelancer know a little bit about your
                      project's needs.
                    </p>
                    <textarea
                      name={"description"}
                      value={listingData.description}
                      onChange={(e) => handleUpdate(e)}
                      className={"cover-letter-field"}
                      rows={5}
                    ></textarea>
                  </div>
                  <span className={"max-char"}>
                    {listingData.description.length} / 5000
                  </span>
                </div>
                /* End Description */
              )}
            </>
          ) : (
            <></>
          )}

          {step === 3 ? (
            <>
              {showLoading ? (
                <div className={"card section-div"}>
                  <div className={"section-header"}></div>

                  <div className={"section-inner"}>
                    <div className={"loading-gif"}>
                      <img src={loading} alt="" />{" "}
                    </div>
                  </div>
                </div>
              ) : (
                /* Category & Skills section*/
                <div className={"card section-div"}>
                  <div className={"section-header"}>
                    <h4>Category & Skills </h4>
                  </div>

                  <div className={"section-inner"}>
                    <p>Choose a Category</p>
                    <select
                      defaultValue={""}
                      onChange={(e) => onSelectCategory(e.target.value)}
                      value={selectedCategory}
                      className="form-control"
                    >
                      <option key={uuidv4()} hidden={true} value={""}>
                        {"SELECT"}
                      </option>

                      {categories ? (
                        categories.map((cat) => (
                          <>
                            <option value={cat.uuid} key={cat.uuid}>
                              {cat.title.charAt(0).toUpperCase() +
                                cat.title.slice(1)}
                            </option>
                          </>
                        ))
                      ) : (
                        <>Loading Categories</>
                      )}
                    </select>

                    <div className={"skills-div"}>
                      {skills ? (
                        skills.map((skill) => (
                          <span
                            className={"skill-select"}
                            value={skill.uuid}
                            key={skill.uuid}
                            style={
                              selectedSkills.includes(skill.uuid)
                                ? { backgroundColor: "#59b001", color: "white" }
                                : { backgroundColor: "#e3e3e3" }
                            }
                            onClick={() => handleSelectSkill(skill.uuid)}
                          >
                            {skill.title.toUpperCase()}
                          </span>
                        ))
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
                /* End Category & Skills section*/
              )}
            </>
          ) : (
            <></>
          )}

          {step === 4 ? (
            <>
              {showLoading ? (
                <div className={"card section-div"}>
                  <div className={"section-header"}></div>

                  <div className={"section-inner"}>
                    <div className={"loading-gif"}>
                      <img src={loading} alt="" />{" "}
                    </div>
                  </div>
                </div>
              ) : (
                /* Hourly or Fixed*/
                <div className={"card section-div"}>
                  <div className={"section-header"}>
                    <h4>Pay Type </h4>
                  </div>

                  <div className={"section-inner"}>
                    <p>
                      Would you like to pay by the hour or set a fixed Price?
                    </p>
                    <select
                      className="form-control"
                      name={"payType"}
                      value={listingData.payType}
                      onChange={(e) => handleUpdate(e)}
                    >
                      <option>Hourly</option>
                      <option>Fixed</option>
                    </select>
                  </div>
                </div>
                /* End hourly or fixed */
              )}
            </>
          ) : (
            <></>
          )}
          {step === 5 ? (
            <>
              {showLoading ? (
                <div className={"card section-div"}>
                  <div className={"section-header"}></div>

                  <div className={"section-inner"}>
                    <div className={"loading-gif"}>
                      <img src={loading} alt="" />{" "}
                    </div>
                  </div>
                </div>
              ) : (
                /* Budget */
                <div className={"card section-div"}>
                  <div className={"section-header"}>
                    <h4>Budget</h4>
                  </div>

                  <div className={"section-inner"}>
                    <p>How much will you pay for this job</p>
                    <input
                      type={"number"}
                      className="form-control"
                      name={"budget"}
                      value={listingData.budget}
                      onChange={(e) => handleUpdate(e)}
                      placeholder={"Budget"}
                    />
                  </div>
                </div>
                /* End Budget */
              )}
            </>
          ) : (
            <></>
          )}

          {/* Next / Previous Buttons*/}
          {step === 1 && !showLoading ? (
            <div className={"prev-next-btn-div"}>
              <button
                className={"btn"}
                value={0}
                onClick={(e) => handleStep(e)}
                disabled={true}
              >
                Previous
              </button>

              <button
                className={"btn"}
                value={1}
                onClick={(e) => handleStep(e)}
                disabled={nextDisabled}
              >
                Next
              </button>
            </div>
          ) : (
            <>
              {step > 1 && step < 5 ? (
                <div className={"prev-next-btn-div"}>
                  <button
                    className={"btn"}
                    value={0}
                    onClick={(e) => handleStep(e)}
                  >
                    Previous
                  </button>
                  <button
                    className={"btn"}
                    value={1}
                    onClick={(e) => handleStep(e)}
                    disabled={nextDisabled}
                  >
                    Next
                  </button>
                </div>
              ) : (
                <>
                  <div className={"prev-next-btn-div"}>
                    <button
                      className={"btn"}
                      value={0}
                      onClick={(e) => handleStep(e)}
                    >
                      Previous
                    </button>
                    <button
                      className={"btn"}
                      value={1}
                      onClick={(e) => handleSubmitReview(e)}
                    >
                      Review
                    </button>
                  </div>
                </>
              )}
            </>
          )}

          {/* End Next / Previous Buttons*/}
        </div>
      </div>
    </>
  );
}

export default ClientCreateListing;
