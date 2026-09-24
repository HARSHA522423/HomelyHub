import React, { useEffect } from "react";
import "../../css/BookingDetails.css";
import PropertyImg from "../propertyListing/PropertyImg";
import { useParams, Link } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import { fetchBookingDetails } from "../../store/Booking/booking-action";
import { useDispatch, useSelector } from "react-redux";

const BookingDetails = () => {
  const { bookingId } = useParams();
  const dispatch = useDispatch();
  const { bookingDetails } = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(fetchBookingDetails(bookingId));
    window.scrollTo(0, 0);
  }, [dispatch, bookingId]);

  if (!bookingDetails || !bookingDetails.property) {
    return (
      <div className="dashboard-page-container">
        <div className="dashboard-loading-wrap">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  const { property } = bookingDetails;

  return (
    <div className="booking-details-page">
      {/* Back button & Breadcrumb */}
      <div className="details-nav-bar">
        <Link to="/user/mybookings" className="details-back-btn">
          <span className="material-symbols-outlined">arrow_back</span>
          <span>Back to My Bookings</span>
        </Link>
      </div>

      {/* Confirmation Banner */}
      <div className="booking-confirmed-card">
        <div className="confirmed-badge">
          <span className="material-symbols-outlined">check_circle</span>
          <span>Booking Confirmed</span>
        </div>
        <h1 className="confirmed-title">{property.propertyName}</h1>
        <p className="confirmed-address">
          <span className="material-symbols-outlined">location_on</span>
          <span>
            {property.address?.area ? property.address.area + ", " : ""}
            {property.address?.city || ""}, {property.address?.state || ""} {property.address?.pincode || ""}
          </span>
        </p>
      </div>

      {/* Booking Details Summary Card */}
      <div className="booking-summary-grid">
        <div className="summary-left-card">
          <h3 className="card-heading">Stay Details</h3>
          <div className="stay-meta-grid">
            <div className="stay-meta-box">
              <span className="material-symbols-outlined box-icon">calendar_today</span>
              <div>
                <span className="box-lbl">Check-In</span>
                <p className="box-val">
                  {new Date(bookingDetails.fromDate).toLocaleDateString("en-IN", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="stay-meta-box">
              <span className="material-symbols-outlined box-icon">event_available</span>
              <div>
                <span className="box-lbl">Check-Out</span>
                <p className="box-val">
                  {new Date(bookingDetails.toDate).toLocaleDateString("en-IN", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="stay-meta-box">
              <span className="material-symbols-outlined box-icon">bedtime</span>
              <div>
                <span className="box-lbl">Duration</span>
                <p className="box-val">{bookingDetails.numberOfnights} nights</p>
              </div>
            </div>

            <div className="stay-meta-box">
              <span className="material-symbols-outlined box-icon">verified_user</span>
              <div>
                <span className="box-lbl">Status</span>
                <p className="box-val status-paid">Paid & Confirmed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="summary-right-card">
          <h3 className="card-heading">Payment Information</h3>
          <div className="payment-receipt-box">
            <div className="receipt-row">
              <span>Total Price Paid</span>
              <strong className="receipt-total">₹{Number(bookingDetails.price).toLocaleString("en-IN")}</strong>
            </div>
            <div className="receipt-row fee-row">
              <span>Payment Status</span>
              <span className="paid-tag">Paid in Full</span>
            </div>
            <div className="receipt-divider" />
            <div className="receipt-note">
              <span className="material-symbols-outlined">receipt_long</span>
              <span>All taxes and fees included in this receipt</span>
            </div>
          </div>
        </div>
      </div>

      {/* Property Photos Section */}
      {property.images && property.images.length > 0 && (
        <section className="booking-photos-section">
          <h3 className="card-heading">Property Photos</h3>
          <PropertyImg images={property.images} />
        </section>
      )}
    </div>
  );
};

export default BookingDetails;
