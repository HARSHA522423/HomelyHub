import React from "react";

const PropertyAmenities = ({ amenities = [] }) => {
  if (!amenities || amenities.length === 0) {
    return null;
  }

  return (
    <section className="property-amenities-section">
      <h3 className="section-title">What this place offers</h3>
      <div className="amenities-grid">
        {amenities.map((amenity, index) => (
          <div key={index} className="amenity-card">
            <span className="material-symbols-outlined amenity-icon">
              {amenity.icon || "check_circle"}
            </span>
            <span className="amenity-name">{amenity.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PropertyAmenities;
