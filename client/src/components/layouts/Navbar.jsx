import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOutUser } from "../../actions/auth";
import PropTypes from "prop-types";

const Navbar = ({ auth: { isAuthenticated, isLoading }, logOutUser }) => {
  // Create authentication links - Links only be visible when user is logged in
  const authLinks = (
    <ul>
      <li>
        <a href="#!" onClick={logOutUser}>
          <i className="fas fa-sign-out-alt"></i>
          <span className="hide-sm"> Logout</span>
        </a>
      </li>
    </ul>
  );

  // Create Guest links - Links only be visisble when user is not logged in
  const guestLinks = (
    <ul>
      <li>
        <a href="#!">Developers</a>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {!isLoading && isAuthenticated ? authLinks : guestLinks}
    </nav>
  );
};

Navbar.prototype = {
  auth: PropTypes.object.isRequired,
  logOutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logOutUser })(Navbar);
