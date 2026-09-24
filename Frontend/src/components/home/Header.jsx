import React, { useState, useRef, useEffect } from "react";
import Search from "./Search";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Filter from "./Filter";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/User/user-action";
import toast from "react-hot-toast";
import { propertyAction } from "../../store/Property/property-slice";
import { getAllProperties } from "../../store/Property/property-action";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false);
  }, [location.pathname]);

  const logoutUser = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    setDropdownOpen(false);
    navigate("/");
  };

  const refreshFunction = () => {
    dispatch(propertyAction.updateSearchParams({}));
    dispatch(getAllProperties());
  };

  return (
    <header className="header sticky-top">
      <div className="header-inner">
        <div className="header-brand-group">
          {/* Brand Logo */}
          <Link to="/" className="brand-logo-link" onClick={refreshFunction}>
            <img
              src="/assets/logo.png"
              alt="HomelyHub Logo"
              className="logo"
            />
          </Link>

          {isHomePage && <span className="header-slogan">Stay. Explore. Belong.</span>}
        </div>

        {/* Center Search & Filters (On Home Page) */}
        {isHomePage && (
          <div className="search_filter">
            <Search />
            <Filter />
            <Link to="/ai-trip-planner" className="ai-trip-link" title="AI Trip Planner">
              <span className="material-symbols-outlined trip-genie-icon">auto_awesome</span>
              <span className="trip-genie-label">Trip Genie</span>
            </Link>
          </div>
        )}

        {/* Right Navigation & User Controls */}
        <div className="header-right-actions">
          {!isHomePage && (
            <Link to="/ai-trip-planner" className="header-secondary-link">
              <span className="material-symbols-outlined">auto_awesome</span>
              <span>Trip Genie</span>
            </Link>
          )}

          {!isAuthenticated && !user ? (
            <Link to="/login" className="header-login-btn">
              <span className="material-symbols-outlined">account_circle</span>
              <span className="login-text">Sign In</span>
            </Link>
          ) : (
            <div className="user-dropdown-container" ref={dropdownRef}>
              <button
                type="button"
                className={`user-profile-btn ${dropdownOpen ? "active" : ""}`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
                aria-label="User menu"
              >
                <span className="material-symbols-outlined menu-icon">menu</span>
                {user?.avatar?.url ? (
                  <img
                    src={user.avatar.url}
                    className="user-img"
                    alt={user.name || "User Avatar"}
                  />
                ) : (
                  <div className="user-avatar-placeholder">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                )}
              </button>

              {dropdownOpen && (
                <div className="hh-user-menu">
                  <div className="menu-header">
                    <p className="menu-greeting">Signed in as</p>
                    <p className="menu-user-name">{user?.name || "Traveler"}</p>
                    <p className="menu-user-email">{user?.email}</p>
                  </div>
                  <div className="menu-divider" />
                  <Link to="/profile" className="menu-item">
                    <span className="material-symbols-outlined">person</span>
                    <span>My Profile</span>
                  </Link>
                  <Link to="/user/mybookings" className="menu-item">
                    <span className="material-symbols-outlined">luggage</span>
                    <span>My Bookings</span>
                  </Link>
                  <Link to="/accomodation" className="menu-item">
                    <span className="material-symbols-outlined">holiday_village</span>
                    <span>My Accommodations</span>
                  </Link>
                  <div className="menu-divider" />
                  <button
                    type="button"
                    className="menu-item menu-logout-btn"
                    onClick={logoutUser}
                  >
                    <span className="material-symbols-outlined">logout</span>
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
