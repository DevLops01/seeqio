import { useHistory } from "react-router-dom";
import AppContext from "../../context/context";
import { useContext } from "react";

export default function Home() {
  let history = useHistory();
  const { isSession } = useContext(AppContext);

  if (isSession.isAuth === "true") {
    history.push("/find-work");
  }

  return (
    <div>
      <div>
        <div></div>
      </div>
    </div>
  );
}
