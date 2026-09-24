import React, { useEffect } from "react";
import "../../css/MyBookings.css";
import ProgressSteps from "../ProgressSteps";
import { useNavigate, Link } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserBookings, fetchBookingDetails } from "../../store/Booking/booking-action";

const BookingSkeleton = () => (
  <div className="hh-booking-item-card skeleton-card">
    <div className="booking-card-img-wrap hh-skeleton" />
    <div className="booking-card-content">
      <div className="skeleton-line hh-skeleton" style={{ width: "60%", height: "20px", marginBottom: "12px" }} />
      <div className="skeleton-line hh-skeleton" style={{ width: "80%", height: "16px", marginBottom: "16px" }} />
      <div className="skeleton-line hh-skeleton" style={{ width: "30%", height: "24px" }} />
    </div>
  </div>
);

const MyBookings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookings = [], loading } = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(fetchUserBookings());
  }, [dispatch]);

  const handleBookingClick = (bookingId) => {
    dispatch(fetchBookingDetails(bookingId));
    navigate(`/user/myBookings/${bookingId}`);
  };

  return (
    <div className="dashboard-page-container">
      <ProgressSteps />

      <div className="bookings-dashboard-content">
        <div className="dashboard-sec-header">
          <div>
            <h1 className="dashboard-page-title">My Bookings</h1>
            <p className="dashboard-page-desc">
              Manage your upcoming reservations and view past travel details
            </p>
          </div>
          {!loading && bookings.length > 0 && (
            <span className="bookings-count-badge">
              {bookings.length} {bookings.length === 1 ? "Booking" : "Bookings"}
            </span>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bookings-list-wrap">
            {Array.from({ length: 3 }).map((_, index) => (
              <BookingSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && bookings.length === 0 && (
          <div className="hh-empty-state">
            <div className="hh-empty-icon">
              <span className="material-symbols-outlined">luggage</span>
            </div>
            <h2 className="hh-empty-title">No bookings yet</h2>
            <p className="hh-empty-desc">
              You haven't booked any stays on HomelyHub yet. Explore our top verified properties and plan your next memorable trip!
            </p>
            <Link to="/" className="hh-empty-btn">
              <span className="material-symbols-outlined">search</span>
              <span>Explore Stays</span>
            </Link>
          </div>
        )}

        {/* Bookings List */}
        {!loading && bookings.length > 0 && (
          <div className="bookings-list-wrap">
            {bookings.map((booking) => {
              const property = booking.property || {};
              const imageUrl =
                property.images && property.images.length > 0
                  ? property.images[0].url
                  : "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80";

              return (
                <article
                  className="hh-booking-item-card"
                  key={booking._id}
                  onClick={() => handleBookingClick(booking._id)}
                >
                  <div className="booking-card-img-wrap">
                    <img
                      src={imageUrl}
                      alt={property.propertyName || "Booked Stay"}
                      className="booking-card-img"
                      loading="lazy"
                    />
                    <span className="booking-status-tag">Confirmed</span>
                  </div>

                  <div className="booking-card-content">
                    <div className="booking-card-top">
                      <h3 className="booking-property-title">
                        {property.propertyName || "HomelyHub Stay"}
                      </h3>
                      {property.address?.city && (
                        <p className="booking-property-city">
                          <span className="material-symbols-outlined">location_on</span>
                          <span>{property.address.city}, {property.address.state}</span>
                        </p>
                      )}
                    </div>

                    <div className="booking-dates-pill">
                      <span className="stay-meta-item nights-tag">
                        <span className="material-symbols-outlined">bedtime</span>
                        <span>{booking.numberOfnights} nights</span>
                      </span>
                      <span className="stay-meta-item">
                        <span className="material-symbols-outlined">event</span>
                        <span>{new Date(booking.fromDate).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</span>
                      </span>
                      <span className="material-symbols-outlined arrow-sep">arrow_forward</span>
                      <span className="stay-meta-item">
                        <span className="material-symbols-outlined">event_available</span>
                        <span>{new Date(booking.toDate).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</span>
                      </span>
                    </div>

                    <div className="booking-card-bottom">
                      <div className="booking-price-tag">
                        <span className="price-lbl">Total Paid</span>
                        <span className="price-val">₹{Number(booking.price).toLocaleString("en-IN")}</span>
                      </div>

                      <button
                        type="button"
                        className="booking-view-details-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookingClick(booking._id);
                        }}
                      >
                        <span>View Details</span>
                        <span className="material-symbols-outlined">chevron_right</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
