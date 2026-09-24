import React from "react";
import { Link } from "react-router-dom";

const MyAccomodation = ({ accomodation = [] }) => {
  return (
    <div className="accom-cards-list">
      {accomodation.map((place) => {
        const imageUrl =
          place.images && place.images.length > 0
            ? place.images[0].url
            : "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80";

        return (
          <article className="hh-accom-card" key={place._id}>
            <div className="accom-img-wrap">
              <img
                className="accom-img"
                src={imageUrl}
                alt={place.propertyName}
                loading="lazy"
              />
              <span className="accom-active-badge">Active Listing</span>
            </div>

            <div className="accom-content">
              <div className="accom-top-row">
                <div>
                  <h3 className="accom-title">{place.propertyName}</h3>
                  <p className="accom-city">
                    <span className="material-symbols-outlined">location_on</span>
                    <span>
                      {place.address?.city || "India"}
                      {place.address?.state ? `, ${place.address.state}` : ""}
                    </span>
                  </p>
                </div>

                <div className="accom-price-wrap">
                  <span className="price-lbl">Nightly Rate</span>
                  <span className="price-num">₹{Number(place.price).toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="accom-meta-chips">
                <div className="meta-chip">
                  <span className="material-symbols-outlined">schedule</span>
                  <span>Check In: {place.checkInTime || "1:00 PM"}</span>
                </div>
                <div className="meta-chip">
                  <span className="material-symbols-outlined">schedule</span>
                  <span>Check Out: {place.checkOutTime || "10:00 AM"}</span>
                </div>
                <div className="meta-chip">
                  <span className="material-symbols-outlined">group</span>
                  <span>Max: {place.maximumGuest} guests</span>
                </div>
              </div>

              <div className="accom-action-row">
                <Link to={`/propertylist/${place._id}`} className="view-listing-btn">
                  <span>View Public Listing</span>
                  <span className="material-symbols-outlined">open_in_new</span>
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default MyAccomodation;
