import React, { useState, useContext, useEffect, useRef } from "react";
import { Redirect, Route, useHistory, Link, useParams } from "react-router-dom";
import AppContext from "../../../context/context";
import { MdDelete, MdAttachFile, MdPerson } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import axios from "axios";
import "./ClientCreateListing.css";
import { v4 as uuidv4 } from "uuid";

function ClientCreateListing() {
  let history = useHistory();
  const { id } = useParams();
  const fileInput = useRef();

  const { user } = useContext(AppContext);

  // if (isSession.isAuth === "false") {
  //   history.push("/login");
  // }

  const [isMuted, setIsMuted] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [scale, setScale] = useState("");
  const [length, setLength] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState([]);
  const [files, setFiles] = useState([]);
  const [payTypeChoice, setPayTypeChoice] = useState("hourly");
  const [listingData, setListingData] = useState({
    title: "",
    description: "",
    category: "",
    skills: [],
    payType: payTypeChoice,
    openings: "",
    budget: "",
  });

  useEffect(() => {
    if (
      selectedCategory &&
      selectedSkills &&
      scale &&
      length &&
      experience &&
      skills &&
      payTypeChoice &&
      listingData.title &&
      listingData.openings &&
      listingData.description &&
      listingData.category &&
      listingData.skills !== [] &&
      listingData.payType &&
      listingData.budget
    ) {
      setIsMuted(false);
    } else {
      setIsMuted(true);
    }
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

  const handleFileAdd = (e) => {
    const insertedFile = e.target.files;
    const newFiles = [];

    // Gets all files if any and adds them to the uploads array
    files.map((item) => {
      newFiles.push(item);
    });

    // Loops through the newly added files and pushed them to the uploads array
    for (let i = 0; i < insertedFile.length; i++) {
      const fileObject = {};
      fileObject["name"] = insertedFile[i].name;
      fileObject["key"] = uuidv4();
      fileObject["file"] = insertedFile[i];

      newFiles.push(fileObject);
    }

    // Sets the state of SetFiles to uploads (previously uploaded, and newly uploaded)
    setFiles(newFiles);
  };

  const handleRemoveFile = (id) => {
    setFiles(files.filter((file) => file.key !== id));
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

  const handlePayTypeChoice = (e) => {
    setPayTypeChoice(e.target.value);
    setListingData({ ...listingData, ["payType"]: e.target.value });
    console.log(listingData);
  };

  const handleListingData = (e) => {
    if (e.target.name === "budget" && isNaN(e.target.value)) {
      return;
    } else if (e.target.name === "openings" && isNaN(e.target.value)) {
      return;
    }

    setListingData({ ...listingData, [e.target.name]: e.target.value });
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

  const handleSubmit = async () => {
    let data = new FormData();
    files.map((upload) => {
      data.append("file", upload.file);
    });

    data.append("creator", user.uuid);
    data.append("title", listingData.title);
    data.append("description", listingData.description);
    data.append("category", listingData.category);
    data.append("skills", listingData.skills);
    data.append("payType", listingData.payType);
    data.append("budget", listingData.budget);
    data.append("scale", scale);
    data.append("length", length);
    data.append("experience", experience);

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/listing/create`, data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

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
                  <span className={"description"}>
                    Add a title to your project.
                  </span>
                </div>

                <input
                  name={"title"}
                  value={listingData.title}
                  className={"section-input"}
                  type="text"
                  onChange={(e) => handleListingData(e)}
                />
              </div>

              {/*Description*/}
              <div className={"review-card-body-section"}>
                <div className={"section-name"}>
                  <span className={"section-name-label"}>Description</span>
                  <span className={"description"}>
                    Give a detailed description so freelancers can know more
                    about your job.
                  </span>
                </div>

                <textarea
                  name={"description"}
                  value={listingData.description}
                  rows={5}
                  className={"section-text-field"}
                  onChange={(e) => handleListingData(e)}
                />

                <div className={"section-attach-files"}>
                  <button
                    className={"attach-button btn"}
                    onClick={() => handleFileUpload()}
                    onChange={(e) => handleFileAdd(e)}
                  >
                    <span>{MdAttachFile()} Attach File</span>
                    <input
                      className={"attach-input"}
                      type="file"
                      ref={fileInput}
                      multiple={true}
                    />
                  </button>
                </div>

                {files ? (
                  files.map((file) => (
                    <>
                      <div className={"fileItems"}>
                        <span className={"card fileItem-text"}>
                          {file.name}
                        </span>
                        <span
                          style={{
                            color: "red",
                            fontSize: "15px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleRemoveFile(file.key)}
                        >
                          {TiDelete()}
                        </span>
                      </div>
                    </>
                  ))
                ) : (
                  <></>
                )}
              </div>

              {/*Category & Skills*/}
              <div className={"review-card-body-section"}>
                <div className={"section-name"}>
                  <span className={"section-name-label"}>Category</span>
                  <span className={"description"}>
                    Choose a category that best fits your jobs requirements.
                  </span>
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
                  <span className={"description"}>
                    Click on skills to add them to your job requirements.
                  </span>
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
                            type="radio"
                            checked={scale === "small"}
                            onChange={(e) => handleScale(e)}
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
                            type="radio"
                            checked={scale === "medium"}
                            onChange={(e) => handleScale(e)}
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
                            type="radio"
                            checked={scale === "large"}
                            onChange={(e) => handleScale(e)}
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
                            type="radio"
                            checked={length === "1 to 3 months"}
                            onChange={(e) => handleLength(e)}
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
                            type="radio"
                            checked={length === "3 to 6 months"}
                            onChange={(e) => handleLength(e)}
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
                            type="radio"
                            checked={length === "6 or more months"}
                            onChange={(e) => handleLength(e)}
                          />
                          <span className={"choice"}>6 or more months</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*Experience*/}
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
                            type="radio"
                            checked={experience === "Entry Level"}
                            onChange={(e) => handleExperience(e)}
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
                            type="radio"
                            checked={experience === "Intermediate"}
                            onChange={(e) => handleExperience(e)}
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
                            type="radio"
                            checked={experience === "Expert"}
                            onChange={(e) => handleExperience(e)}
                          />

                          <span className={"choice"}>Expert</span>
                        </div>

                        <span className={"description"}>Description</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={"section-multiple-item"}>
                  <div className={"section-name"}>
                    <span className={"section-name-label"}>Openings</span>
                    <span className={"description"}>
                      Number of freelancers required for this listing.
                    </span>
                  </div>
                  <div></div>

                  <div className={"check-item"}>
                    <div className={"check-item-inner"}>
                      <div>
                        <span className={"hourly-fixed-text"}>
                          {MdPerson()}
                          <input
                            name={"openings"}
                            value={listingData.openings}
                            onChange={(e) => handleListingData(e)}
                            type="text"
                            className={"form-control form-control-sm"}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/*End openings*/}

                {/*Budget*/}
                <div className={"section-multiple-item"}>
                  <div className={"section-name"}>
                    <span className={"section-name-label"}>Budget</span>
                    <span className={"description"}>
                      Set a budget amount and pay type for this listing.
                    </span>
                  </div>

                  <div className={"check-item"}>
                    <div className={"check-item-inner"}>
                      <div>
                        <input
                          value={"hourly"}
                          type="radio"
                          checked={payTypeChoice === "hourly"}
                          onChange={(e) => handlePayTypeChoice(e)}
                        />
                        <span className={"choice choice-budget"}>Hourly</span>

                        <input
                          value={"fixed"}
                          type="radio"
                          checked={payTypeChoice === "fixed"}
                          onChange={(e) => handlePayTypeChoice(e)}
                        />

                        <span className={"choice choice-budget"}>Fixed</span>
                      </div>

                      <div>
                        <span className={"hourly-fixed-text"}>
                          {FaDollarSign()}
                          <input
                            name={"budget"}
                            value={listingData.budget}
                            onChange={(e) => handleListingData(e)}
                            type="text"
                            className={"form-control form-control-sm"}
                          />{" "}
                          {payTypeChoice === "hourly" ? "/hr" : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Budget*/}
                <div className={"submit-btn-div"}>
                  <button
                    disabled={isMuted}
                    onClick={(e) => handleSubmit(e)}
                    className={"btn sub-draft"}
                  >
                    Submit
                  </button>
                  <button className={"btn btn-primary"}>Save as Draft</button>
                </div>
              </div>
            </div>
          </div>
        </span>
      </div>
    </>
  );
}

export default ClientCreateListing;
