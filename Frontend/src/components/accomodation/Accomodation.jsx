import React, { useEffect } from "react";
import "../../css/Accomodation.css";
import ProgressSteps from "../ProgressSteps";
import MyAccomodation from "./MyAccomodation";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllAccomodation } from "../../store/Accomodation/Accomodation-action";
import LoadingSpinner from "../LoadingSpinner";

const Accomodation = () => {
  const dispatch = useDispatch();
  const { accomodation = [], loading } = useSelector((state) => state.accomodation);

  useEffect(() => {
    dispatch(getAllAccomodation());
  }, [dispatch]);

  return (
    <div className="dashboard-page-container">
      <ProgressSteps accomodation />

      <div className="accom-dashboard-content">
        {/* Header Action Bar */}
        <div className="accom-header-bar">
          <div>
            <h1 className="dashboard-page-title">My Accommodations</h1>
            <p className="dashboard-page-desc">
              Manage your listed properties, check guest capacities, and add new stays
            </p>
          </div>

          <Link to="/accomodationform" className="add-place-cta-btn">
            <span className="material-symbols-outlined">add</span>
            <span>Add New Place</span>
          </Link>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="dashboard-loading-wrap">
            <LoadingSpinner />
          </div>
        )}

        {/* Empty State */}
        {!loading && accomodation.length === 0 && (
          <div className="hh-empty-state">
            <div className="hh-empty-icon">
              <span className="material-symbols-outlined">holiday_village</span>
            </div>
            <h2 className="hh-empty-title">No accommodations yet</h2>
            <p className="hh-empty-desc">
              You haven't listed any properties yet. Become a host on HomelyHub and start welcoming guests to your home, villa, or apartment!
            </p>
            <Link to="/accomodationform" className="hh-empty-btn">
              <span className="material-symbols-outlined">add_business</span>
              <span>List Your Property</span>
            </Link>
          </div>
        )}

        {/* Accommodations List */}
        {!loading && accomodation.length > 0 && (
          <MyAccomodation accomodation={accomodation} />
        )}
      </div>
    </div>
  );
};

export default Accomodation;
