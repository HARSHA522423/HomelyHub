import React, { useEffect } from "react";
import "../../css/PropertyListing.css";
import PropertyImg from "./PropertyImg";
import PaymentForm from "./PaymentForm";
import PropertyAmenities from "./PropertyAmenities";
import PropertyMapInfo from "./PropertyMapInfo";
import { useParams, Link } from "react-router-dom";
import { getPropertyDetails } from "../../store/PropertyDetails/propertyDetails-action";
import { useDispatch, useSelector } from "react-redux";

const PropertyDetailsSkeleton = () => (
  <div className="property-page-container">
    <div className="property-header-skeleton">
      <div className="hh-skeleton" style={{ width: "40%", height: "2rem", marginBottom: "0.75rem" }} />
      <div className="hh-skeleton" style={{ width: "25%", height: "1.2rem", marginBottom: "1.5rem" }} />
    </div>
    <div className="hh-skeleton" style={{ width: "100%", height: "26rem", borderRadius: "16px", marginBottom: "2rem" }} />
    <div className="property-layout-grid">
      <div className="property-main-col">
        <div className="hh-skeleton" style={{ width: "100%", height: "8rem", borderRadius: "16px", marginBottom: "1.5rem" }} />
        <div className="hh-skeleton" style={{ width: "100%", height: "12rem", borderRadius: "16px", marginBottom: "1.5rem" }} />
      </div>
      <div className="property-sidebar-col">
        <div className="hh-skeleton" style={{ width: "100%", height: "24rem", borderRadius: "16px" }} />
      </div>
    </div>
  </div>
);

const PropertyListing = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, propertydetails } = useSelector(
    (state) => state.propertydetails
  );

  useEffect(() => {
    dispatch(getPropertyDetails(id));
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  if (loading || !propertydetails) {
    return <PropertyDetailsSkeleton />;
  }

  const {
    propertyName,
    address,
    description,
    images = [],
    amenities = [],
    maximumGuest,
    price,
    currentBookings = [],
    roomType,
    propertyType,
  } = propertydetails;

  return (
    <div className="property-page-container">
      {/* Breadcrumb Navigation */}
      <nav className="property-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Stays</Link>
        <span className="material-symbols-outlined breadcrumb-sep">chevron_right</span>
        <span>{address?.city || "India"}</span>
        <span className="material-symbols-outlined breadcrumb-sep">chevron_right</span>
        <span className="current-page">{propertyName}</span>
      </nav>

      {/* Property Title & Location Header */}
      <header className="property-title-section">
        <h1 className="property-main-title">{propertyName}</h1>
        <div className="property-meta-row">
          <div className="property-location-tag">
            <span className="material-symbols-outlined loc-icon">location_on</span>
            <span className="loc-text">
              {`${address?.area ? address.area + ", " : ""}${address?.city || ""}, ${address?.state || ""}`}
            </span>
          </div>

          <div className="property-quick-tags">
            <span className="quick-tag">
              <span className="material-symbols-outlined">group</span>
              Up to {maximumGuest} guests
            </span>
            {roomType && (
              <span className="quick-tag">
                <span className="material-symbols-outlined">hotel</span>
                {roomType}
              </span>
            )}
            {propertyType && (
              <span className="quick-tag">
                <span className="material-symbols-outlined">home</span>
                {propertyType}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Image Gallery */}
      <PropertyImg images={images} />

      {/* Main Two-Column Layout */}
      <div className="property-layout-grid">
        {/* LEFT COLUMN: Overview, Description, Amenities, Map & Info */}
        <div className="property-main-col">
          {/* Key Stay Highlights Card */}
          <div className="property-overview-card">
            <div className="overview-item">
              <span className="material-symbols-outlined overview-icon">group</span>
              <div>
                <h5>Guest Capacity</h5>
                <p>Accommodates up to {maximumGuest} guests comfortably</p>
              </div>
            </div>
            <div className="overview-item">
              <span className="material-symbols-outlined overview-icon">verified_user</span>
              <div>
                <h5>Verified Stay</h5>
                <p>Inspected for quality, cleanliness and amenities</p>
              </div>
            </div>
            <div className="overview-item">
              <span className="material-symbols-outlined overview-icon">event_available</span>
              <div>
                <h5>Flexible Check-in</h5>
                <p>Check-in from 1:00 PM • Seamless host check-in</p>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <section className="property-description-section">
            <h3 className="section-title">About this space</h3>
            <p className="property-description-text">{description}</p>
          </section>

          {/* Amenities Section */}
          <PropertyAmenities amenities={amenities} />

          {/* Map and Extra Info */}
          <PropertyMapInfo address={address} />
        </div>

        {/* RIGHT COLUMN: Sticky Booking Card */}
        <aside className="property-sidebar-col">
          <PaymentForm
            propertyId={id}
            price={price}
            propertyName={propertyName}
            address={address}
            maximumGuest={maximumGuest}
            currentBookings={currentBookings}
          />
        </aside>
      </div>
    </div>
  );
};

export default PropertyListing;
