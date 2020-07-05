// Dependencies
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { setAuthToken } from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import { TOKEN } from "./constants/constant";

// All component import here
import {
  Navbar,
  Landing,
  Login,
  Register,
  Alert,
  Dashboard,
  PrivateRoute,
} from "./components/index";
import store from "./store/store";

// Stylings
import "./App.css";

if (localStorage.getItem(TOKEN)) {
  setAuthToken(localStorage.getItem(TOKEN));
}

const App = () => {
  // useEffect - to run only once when component is mounted to load the user if token exists
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

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
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </section>
      </React.Fragment>
    </Router>
  );
};

export default App;
