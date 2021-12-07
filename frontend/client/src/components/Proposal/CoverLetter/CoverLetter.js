import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { MdAttachMoney, MdAttachFile, MdDelete } from "react-icons/md";
import "../Proposal.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import AppContext from "../../../context/context";
import "./CoverLetter.css";

function CoverLetter({
  files,
  allFiles,
  setFiles,
  setAllFiles,
  coverLetter,
  setCoverLetter,
  handleTextField,
}) {
  const docRef = React.useRef();

  const handleNewFile = async (e) => {
    const uploadedFiles = e.target.files;
    const uploads = [];

    // Gets all files if any and adds them to the uploads array
    allFiles.map((item) => {
      uploads.push(item);
    });

    // Loops through the newly added files and pushed them to the uploads array
    for (let i = 0; i < uploadedFiles.length; i++) {
      const fileObject = {};
      fileObject["name"] = uploadedFiles[i].name;
      fileObject["key"] = uuidv4();
      fileObject["file"] = uploadedFiles[i];

      uploads.push(fileObject);
    }

    // Sets the state of SetFiles to uploads (previously uploaded, and newly uploaded)
    setFiles(uploads);
    // Does the same for set all files
    setAllFiles(uploads);
  };

  const handleRemoveFile = async (key) => {
    // Filter through both states and remove a selected file
    setFiles(
      files.filter((item) => {
        return item.key !== key;
      })
    );

    setAllFiles(
      allFiles.filter((item) => {
        return item.key !== key;
      })
    );
  };

  return (
    <>
      <div className={"card proposal-coverLetter-div"}>
        <div className={"job-title"}>
          <h4>Supporting Documents</h4>
        </div>

        <div className={"cover-letter-body"}>
          <div className={"cover-letter-body-header"}>
            <span className={"rates"}>
              <span className={""}>Add Cover Letter</span>
            </span>
          </div>

          <div className={"cover-field-container"}>
            <textarea
              value={coverLetter}
              onChange={(e) => handleTextField(e)}
              className={"cover-letter-field"}
              rows={5}
            ></textarea>
          </div>

          <div className={"cover-letter-body-header"}>
            <span className={"rates"}>
              <span className={""}>Attachments</span>
            </span>
          </div>

          {/*Show currently uploaded files*/}
          <div className={"added-files-container"}>
            {files ? (
              files.map((doc, i) => (
                <div key={doc.key} className={"added-files"}>
                  <span>
                    {MdAttachFile()}
                    {doc.name}
                    <span
                      onClick={() => handleRemoveFile(doc.key)}
                      className={"delete-file"}
                    >
                      {MdDelete()}
                    </span>
                  </span>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>

          {/* Drop area for file uploads */}
          <div className={"upload-field-container"}>
            <input
              onChange={(e) => handleNewFile(e)}
              name={"file"}
              type="file"
              multiple={true}
              ref={docRef}
              className={"file-input-hidden"}
            />
            <span className={"upload-text"}>
              Drag and Drop Files Here. Or Click to Browse
            </span>
          </div>
        </div>
      </div>

      {/*<div className={"sub-btn-div"}>*/}
      {/*  <button className={"sub-prop-btn"} onClick={(e) => handleSubmit(e)}>*/}
      {/*    Submit*/}
      {/*  </button>*/}
      {/*</div>*/}
    </>
  );
}

export default CoverLetter;
