// Dependencies
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// All component import here
import { Navbar, Landing, Login, Register, Alert } from "./components/index";

// Stylings
import "./App.css";

const App = () => {
  return (
    <Router>
      <React.Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </section>
      </React.Fragment>
    </Router>
  );
};

export default App;
