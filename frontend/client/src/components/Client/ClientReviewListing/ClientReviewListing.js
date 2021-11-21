import React, { useState, useContext, useEffect, useRef } from "react";
import { Redirect, Route, useHistory, Link, useParams } from "react-router-dom";
import AppContext from "../../../context/context";
import { MdDelete, MdAttachFile } from "react-icons/md";
import axios from "axios";
import "./ClientReviewListing.css";
import { v4 as uuidv4 } from "uuid";

function ClientReviewListing() {
  let history = useHistory();
  const { id } = useParams();
  const fileInput = useRef();

  // if (isSession.isAuth === "false") {
  //   history.push("/login");
  // }

  const [listing, setListing] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [scale, setScale] = useState("");
  const [length, setLength] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState([]);
  const [listingData, setListingData] = useState({
    title: "",
    description: "",
    category: "",
    skills: [],
    payType: "",
    budget: "",
  });

  const onSelectCategory = async (categoryId) => {
    setSelectedCategory(categoryId);
    console.log(categoryId);
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

  const handleFileUpload = () => {
    fileInput.current.click();
  };

  const handleScale = (e) => {
    setScale(e.target.value);
  };

  const handleLength = (e) => {
    setLength(e.target.value);
  };

  const handleExperience = (e) => {
    setExperience(e.target.value);
  };

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

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_BASE_URL}/api/listing/draft/${id}`, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       setListing(res.data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }, [id]);

  return (
    <>
      <div className={"container"}>
        <span>
          <div className={"review-wrapper"}>
            {/*Header*/}
            <div className={"card review-card-body"}>
              <div className={"review-card-body-header"}>
                <span className={"header-text"}>
                  <h2>Post Your Job</h2>
                </span>
              </div>

              {/*Title*/}
              <div className={"review-card-body-section"}>
                <div className={"section-name"}>
                  <span className={"section-name-label"}>Title</span>
                </div>

                <input
                  value={listing.title}
                  className={"section-input"}
                  type="text"
                />
              </div>

              {/*Description*/}
              <div className={"review-card-body-section"}>
                <div className={"section-name"}>
                  <span className={"section-name-label"}>Description</span>
                </div>

                <textarea
                  value={listing.description}
                  rows={5}
                  className={"section-text-field"}
                />

                <div className={"section-attach-files"}>
                  <button
                    className={"attach-button btn"}
                    onClick={() => handleFileUpload()}
                  >
                    <span>{MdAttachFile()} Attach File</span>
                    <input
                      className={"attach-input"}
                      type="file"
                      ref={fileInput}
                    />
                  </button>
                </div>
              </div>

              {/*Category & Skills*/}
              <div className={"review-card-body-section"}>
                <div className={"section-name"}>
                  <span className={"section-name-label"}>Category</span>
                </div>

                <select
                  onChange={(e) => onSelectCategory(e.target.value)}
                  value={selectedCategory}
                  className="section-select"
                >
                  <option
                    key={"disabled"}
                    hidden={true}
                    value={"Choose Category"}
                  >
                    Choose Category
                  </option>

                  {categories ? (
                    categories.map((cat) => (
                      <>
                        <option value={cat.title} key={cat.uuid}>
                          {cat.title}
                        </option>
                      </>
                    ))
                  ) : (
                    <>Loading Categories</>
                  )}
                </select>

                {/*Skills*/}
                <div className={"section-name"}>
                  <span className={"section-name-label"}>Skills</span>
                </div>

                <div className={"skills-div"}>
                  {skills[0] ? (
                    skills.map((skill) => (
                      <span
                        className={"skill-select"}
                        value={skill.title}
                        key={skill.uuid}
                        style={
                          selectedSkills.includes(skill.title)
                            ? { backgroundColor: "#59b001", color: "white" }
                            : { backgroundColor: "#e3e3e3" }
                        }
                        onClick={() => handleSelectSkill(skill.title)}
                      >
                        {skill.title}
                      </span>
                    ))
                  ) : (
                    <>
                      <p>Please select a category to populate skills.</p>
                    </>
                  )}
                </div>
                {/*  End Skills*/}
              </div>
              {/*  End Category & Skills */}

              {/*Job Scope*/}
              <div className={"review-card-body-section"}>
                <div className={"section-name"}>
                  <span className={"section-name-label"}>
                    <h4>Job Specifications</h4>
                  </span>
                </div>

                {/*Scale*/}
                <div className={"section-multiple"}>
                  <div className={"section-multiple-item"}>
                    <div className={"section-name"}>
                      <span className={"section-name-label"}>Scale</span>
                    </div>

                    <div className={"check-item"}>
                      <div className={"check-item-inner"}>
                        <div>
                          <input
                            value={"small"}
                            type="checkbox"
                            checked={scale === "small"}
                            onClick={(e) => handleScale(e)}
                          />
                          <span className={"choice"}>Small</span>
                        </div>

                        <span className={"description"}>
                          Simple non-complex projects or tasks.
                        </span>
                      </div>
                    </div>

                    <div className={"check-item"}>
                      <div className={"check-item-inner"}>
                        <div>
                          <input
                            value={"medium"}
                            type="checkbox"
                            checked={scale === "medium"}
                            onClick={(e) => handleScale(e)}
                          />
                          <span className={"choice"}>Medium</span>
                        </div>

                        <span className={"description"}>
                          Detailed projects or tasks.
                        </span>
                      </div>
                    </div>

                    <div className={"check-item"}>
                      <div className={"check-item-inner"}>
                        <div>
                          <input
                            value={"large"}
                            type="checkbox"
                            checked={scale === "large"}
                            onClick={(e) => handleScale(e)}
                          />
                          <span className={"choice"}>Large</span>
                        </div>

                        <span className={"description"}>
                          Robust projects or tasks.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/*Length*/}
                  <div className={"section-multiple-item"}>
                    <div className={"section-name"}>
                      <span className={"section-name-label"}>
                        Expected Length
                      </span>
                    </div>

                    <div className={"check-item"}>
                      <div className={"check-item-inner"}>
                        <div>
                          <input
                            value={"1 to 3 months"}
                            type="checkbox"
                            checked={length === "1 to 3 months"}
                            onClick={(e) => handleLength(e)}
                          />
                          <span className={"choice"}>1 to 3 months</span>
                        </div>
                      </div>
                    </div>

                    <div className={"check-item"}>
                      <div className={"check-item-inner"}>
                        <div>
                          <input
                            value={"3 to 6 months"}
                            type="checkbox"
                            checked={length === "3 to 6 months"}
                            onClick={(e) => handleLength(e)}
                          />
                          <span className={"choice"}>3 to 6 months</span>
                        </div>
                      </div>
                    </div>

                    <div className={"check-item"}>
                      <div className={"check-item-inner"}>
                        <div>
                          <input
                            value={"6 or more months"}
                            type="checkbox"
                            checked={length === "6 or more months"}
                            onClick={(e) => handleLength(e)}
                          />
                          <span className={"choice"}>6 or more months</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={"section-multiple-item"}>
                    <div className={"section-name"}>
                      <span className={"section-name-label"}>
                        Experience Level
                      </span>
                    </div>

                    <div className={"check-item"}>
                      <div className={"check-item-inner"}>
                        <div>
                          <input
                            value={"Entry Level"}
                            type="checkbox"
                            checked={experience === "Entry Level"}
                            onClick={(e) => handleExperience(e)}
                          />
                          <span className={"choice"}>Entry Level</span>
                        </div>

                        <span className={"description"}>Description</span>
                      </div>
                    </div>

                    <div className={"check-item"}>
                      <div className={"check-item-inner"}>
                        <div>
                          <input
                            value={"Intermediate"}
                            type="checkbox"
                            checked={experience === "Intermediate"}
                            onClick={(e) => handleExperience(e)}
                          />
                          <span className={"choice"}>Intermediate</span>
                        </div>

                        <span className={"description"}>Description</span>
                      </div>
                    </div>

                    <div className={"check-item"}>
                      <div className={"check-item-inner"}>
                        <div>
                          <input
                            value={"Expert"}
                            type="checkbox"
                            checked={experience === "Expert"}
                            onClick={(e) => handleExperience(e)}
                          />

                          <span className={"choice"}>Expert</span>
                        </div>

                        <span className={"description"}>Description</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/**/}
              </div>
            </div>
          </div>
        </span>
      </div>
    </>
  );
}

export default ClientReviewListing;
