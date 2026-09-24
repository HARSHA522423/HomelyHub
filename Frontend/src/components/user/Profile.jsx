import React from "react";
import ProgressSteps from "../ProgressSteps";
import { Link } from "react-router-dom";
import "../../css/Profile.css";
import { useSelector } from "react-redux";
import LoadingSpinner from "../LoadingSpinner";
import moment from "moment";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.user);

  return (
    <div className="dashboard-page-container">
      {/* Dashboard Tabs */}
      <ProgressSteps profile />

      {loading && (
        <div className="dashboard-loading-wrap">
          <LoadingSpinner />
        </div>
      )}

      {user && !loading && (
        <div className="profile-dashboard-content">
          {/* Profile Hero Header Card */}
          <div className="profile-header-card">
            <div className="profile-hero-left">
              <div className="profile-avatar-wrapper">
                {user.avatar?.url ? (
                  <img
                    className="profile-avatar-img"
                    src={user.avatar.url}
                    alt={user.name}
                  />
                ) : (
                  <div className="profile-avatar-fallback">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                )}
                <span className="profile-status-indicator" title="Active Account" />
              </div>

              <div className="profile-hero-info">
                <span className="profile-role-badge">Verified HomelyHub Member</span>
                <h1 className="profile-user-name">{user.name}</h1>
                <div className="profile-hero-meta">
                  <span className="meta-item">
                    <span className="material-symbols-outlined">mail</span>
                    {user.email}
                  </span>
                  <span className="meta-item">
                    <span className="material-symbols-outlined">calendar_today</span>
                    Joined {moment(user.createdAt || Date.now()).format("MMMM YYYY")}
                  </span>
                </div>
              </div>
            </div>

            <div className="profile-hero-actions">
              <Link to="/editprofile" id="edit_profile" className="profile-action-btn edit-btn">
                <span className="material-symbols-outlined">edit</span>
                <span>Edit Profile</span>
              </Link>
              <Link to="/user/updatepassword" className="profile-action-btn security-btn">
                <span className="material-symbols-outlined">lock_reset</span>
                <span>Change Password</span>
              </Link>
            </div>
          </div>

          {/* Cards Grid: Details & Quick Actions */}
          <div className="profile-cards-grid">
            {/* Account Details Card */}
            <div className="profile-card">
              <div className="profile-card-header">
                <span className="material-symbols-outlined card-header-icon">badge</span>
                <h3>Personal Information</h3>
              </div>
              <div className="profile-info-list">
                <div className="profile-info-row">
                  <span className="info-label">Full Name</span>
                  <span className="info-value">{user.name}</span>
                </div>
                <div className="profile-info-row">
                  <span className="info-label">Email Address</span>
                  <span className="info-value">{user.email}</span>
                </div>
                <div className="profile-info-row">
                  <span className="info-label">Phone Number</span>
                  <span className="info-value">{user.phoneNumber || "Not provided"}</span>
                </div>
                <div className="profile-info-row">
                  <span className="info-label">Account Joined</span>
                  <span className="info-value">
                    {moment(user.createdAt || Date.now()).format("MMMM Do, YYYY")}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions & Navigation Card */}
            <div className="profile-card">
              <div className="profile-card-header">
                <span className="material-symbols-outlined card-header-icon">explore</span>
                <h3>Travel & Stays Hub</h3>
              </div>
              <div className="profile-quick-links">
                <Link to="/user/mybookings" className="quick-link-box">
                  <div className="quick-link-icon-wrap">
                    <span className="material-symbols-outlined">luggage</span>
                  </div>
                  <div className="quick-link-text">
                    <h4>My Bookings</h4>
                    <p>View confirmed reservations and past stays</p>
                  </div>
                  <span className="material-symbols-outlined chevron">chevron_right</span>
                </Link>

                <Link to="/accomodation" className="quick-link-box">
                  <div className="quick-link-icon-wrap">
                    <span className="material-symbols-outlined">holiday_village</span>
                  </div>
                  <div className="quick-link-text">
                    <h4>My Accommodations</h4>
                    <p>Manage your listings or list a new stay</p>
                  </div>
                  <span className="material-symbols-outlined chevron">chevron_right</span>
                </Link>

                <Link to="/ai-trip-planner" className="quick-link-box">
                  <div className="quick-link-icon-wrap">
                    <span className="material-symbols-outlined">auto_awesome</span>
                  </div>
                  <div className="quick-link-text">
                    <h4>Trip Genie AI</h4>
                    <p>Generate custom day-by-day itineraries</p>
                  </div>
                  <span className="material-symbols-outlined chevron">chevron_right</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
