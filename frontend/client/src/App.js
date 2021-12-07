import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Home from "./components/Home/Home";
import FindWork from "./components/FindWork/FindWork";
import JobDetails from "./components/JobDetails/JobDetails";
import Proposal from "./components/Proposal/Proposal";
import ClientHome from "./components/Client/ClientHome/ClientHome";
import CLRoute from "./components/Auth/ClientRoute";
import FLRoute from "./components/Auth/FreelancerRoute";
import ClientCreateListing from "./components/Client/ClientCreateListing/ClientCreateListing";
import ClientReviewListing from "./components/Client/ClientReviewListing/ClientReviewListing";
import ClientEdit from "./components/Client/ClientEdit/ClientEdit";
import Profile from "./components/Profile/Profile";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/login"} component={Login} />
        <Route exact path={"/register"} component={Register} />
        <Route exact path={"/freelancer/:id"} component={Profile} />
        <FLRoute exact path={"/find-work"} component={FindWork} />
        <FLRoute exact path={"/find-work/:id"} component={JobDetails} />
        <FLRoute exact path={"/proposal/create/:id"} component={Proposal} />
        <CLRoute exact path={"/client"} component={ClientHome} />
        <CLRoute
          exact
          path={"/client/listing/create"}
          component={ClientCreateListing}
        />
        {/*<CLRoute*/}
        {/*  exact*/}
        {/*  path={"/client/listing/create/review/:id"}*/}
        {/*  component={ClientReviewListing}*/}
        {/*/>*/}
        <CLRoute
          exact
          path={"/client/listing/edit/:id"}
          component={ClientEdit}
        />
      </Switch>
    </Router>
  );
}

export default App;
