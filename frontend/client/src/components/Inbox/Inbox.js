import { useHistory } from "react-router-dom";
import AppContext from "../../context/context";
import { useContext } from "react";
import "./Inbox.css";

export default function Inbox() {
  let history = useHistory();
  const { isSession } = useContext(AppContext);

  if (isSession.isAuth === "false") {
    history.push("/find-work");
  }

  return (
    <div>
      <div className={"inbox-wrapper container"}>
        <div className={"info-bar-left card "}>
          <div className={"left-bar-heading-div"}>
            <div className={"left-bar-heading"}>
              <span>Inbox</span>
            </div>
          </div>

          <div className={"left-bar-item "}>
            <div>
              <span>Inbox</span>
            </div>
          </div>

          <div className={"left-bar-item "}>
            <div>
              <span>Sent</span>
            </div>
          </div>

          <div className={"left-bar-item "}>
            <div>
              <span>Deleted</span>
            </div>
          </div>

          <div className={"left-bar-item "}>
            <div>
              <span>Archived</span>
            </div>
          </div>
        </div>
        <div className={"info-bar-middle  "}></div>
        <div className={"info-bar-right  "}></div>
      </div>
    </div>
  );
}
