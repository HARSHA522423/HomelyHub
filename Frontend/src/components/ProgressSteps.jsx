import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../css/ProgressSteps.css";

const ProgressSteps = () => {
  const location = useLocation();

  return (
    <div className="dashboard-nav-wrapper">
      <nav className="dashboard-tabs" aria-label="Account navigation">
        <NavLink
          to="/profile"
          className={`dashboard-tab-link ${
            location.pathname === "/profile" ? "active-tab" : ""
          }`}
        >
          <span className="material-symbols-outlined tab-icon">person</span>
          <span className="tab-text">My Profile</span>
        </NavLink>

        <NavLink
          to="/user/mybookings"
          className={`dashboard-tab-link ${
            location.pathname.startsWith("/user/mybookings") ? "active-tab" : ""
          }`}
        >
          <span className="material-symbols-outlined tab-icon">luggage</span>
          <span className="tab-text">My Bookings</span>
        </NavLink>

        <NavLink
          to="/accomodation"
          className={`dashboard-tab-link ${
            location.pathname === "/accomodation" ? "active-tab" : ""
          }`}
        >
          <span className="material-symbols-outlined tab-icon">holiday_village</span>
          <span className="tab-text">My Accommodations</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default ProgressSteps;
