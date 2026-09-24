import React from "react";
import MapComponent from "./MapComponent";

const PropertyMapInfo = ({ address }) => {
  return (
    <div className="property-map-and-info">
      {/* Map Section */}
      <section className="property-map-section">
        <h3 className="section-title">Where you'll be</h3>
        <p className="map-address-text">
          <span className="material-symbols-outlined">pin_drop</span>
          <span>{`${address?.area ? address.area + ", " : ""}${address?.city || ""}, ${address?.state || ""}`}</span>
        </p>
        <div className="map-wrapper-card">
          <MapComponent address={address} />
        </div>
      </section>

      {/* House Rules & Extra Info Section */}
      <section className="property-rules-section">
        <h3 className="section-title">Good to know</h3>
        <div className="rules-cards-grid">
          <div className="rule-card">
            <div className="rule-card-header">
              <span className="material-symbols-outlined rule-icon">schedule</span>
              <h4>Check-in & Check-out</h4>
            </div>
            <p className="rule-card-desc">
              Check-in begins at 1:00 PM. Check-out is by 10:00 AM. Early check-in or late check-out is permitted based on availability and prior host confirmation.
            </p>
          </div>

          <div className="rule-card">
            <div className="rule-card-header">
              <span className="material-symbols-outlined rule-icon">policy</span>
              <h4>House Rules & Safety</h4>
            </div>
            <p className="rule-card-desc">
              Please treat the home with care. Quiet hours from 10:00 PM to 7:00 AM. Smoking allowed only in designated outdoor zones. Please contact host for pets.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyMapInfo;
