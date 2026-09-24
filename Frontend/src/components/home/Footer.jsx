import React from "react";
import { Link } from "react-router-dom";
import "../../css/Home.css";

const Footer = () => {
  return (
    <footer className="hh-footer">
      <div className="hh-footer-inner">
        <div className="hh-footer-top">
          <div className="hh-footer-brand">
            <Link to="/" className="hh-footer-logo-link">
              <span className="hh-footer-logo-text">Homely<span>Hub</span></span>
            </Link>
            <p className="hh-footer-tagline">
              Your home away from home. Book authentic verified stays across India.
            </p>
          </div>

          <div className="hh-footer-links-grid">
            <div className="hh-footer-col">
              <h4>Support</h4>
              <ul>
                <li><Link to="/info/help">Help Center</Link></li>
                <li><Link to="/info/safety">AirCover & Safety</Link></li>
                <li><Link to="/info/cancellation">Cancellation options</Link></li>
              </ul>
            </div>
            <div className="hh-footer-col">
              <h4>Hosting</h4>
              <ul>
                <li><Link to="/accomodationform">HomelyHub your home</Link></li>
                <li><Link to="/accomodation">Manage accommodations</Link></li>
                <li><Link to="/info/resources">Hosting resources</Link></li>
              </ul>
            </div>
            <div className="hh-footer-col">
              <h4>HomelyHub</h4>
              <ul>
                <li><Link to="/ai-trip-planner">Trip Genie AI</Link></li>
                <li><Link to="/info/about">About us</Link></li>
                <li><Link to="/info/careers">Careers</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="hh-footer-bottom">
          <div className="hh-footer-legal">
            <p>© {new Date().getFullYear()} HomelyHub, Inc. All rights reserved.</p>
            <ul className="hh-legal-list">
              <li><a href="#privacy">Privacy</a></li>
              <li><span>·</span></li>
              <li><a href="#terms">Terms</a></li>
              <li><span>·</span></li>
              <li><a href="#sitemap">Sitemap</a></li>
            </ul>
          </div>
          <div className="hh-footer-locale">
            <span className="material-symbols-outlined locale-icon">language</span>
            <span>English (IN)</span>
            <span className="currency-pill">₹ INR</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
