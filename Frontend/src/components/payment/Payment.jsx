import React, { useEffect, useState } from "react";
import "../../css/Payment.css";
import {
  initiateCheckoutSession,
  verifyPayment,
} from "../../store/Payment/payment-action";
import {
  selectPaymentDetails,
  selectPaymentStatus,
  paymentActions,
} from "../../store/Payment/payment-slice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { propertyId } = useParams();
  const [showPaymentGateaway, setShowPaymentGateaway] = useState(false);

  const {
    checkinDate,
    checkoutDate,
    totalPrice = 0,
    propertyName,
    guests,
    nights,
  } = useSelector(selectPaymentDetails);

  const { loading, error, orderData } = useSelector(selectPaymentStatus);

  const handleBooking = async () => {
    const paymentData = {
      amount: totalPrice,
      propertyId,
      fromDate: checkinDate,
      toDate: checkoutDate,
      guests,
    };
    try {
      await dispatch(initiateCheckoutSession(paymentData));
    } catch {
      toast.error("Payment initiation failed");
    }
  };

  const handleConfirmPayment = async () => {
    try {
      await dispatch(
        verifyPayment({
          orderId: orderData.orderId,
          bookingDetails: {
            propertyId,
            fromDate: checkinDate,
            toDate: checkoutDate,
            guests,
            price: totalPrice,
          },
          forceStatus: "success",
        })
      );

      toast.success("🎉 Payment Successful! Booking Confirmed!");
      setTimeout(() => navigate("/user/mybookings"), 1000);
      dispatch(paymentActions.resetPayment());
    } catch {
      toast.error("Payment failed!");
    }
  };

  const handleCancelPayment = () => {
    toast.error("Payment Cancelled");
    navigate(`/propertylist/${propertyId}`);
  };

  useEffect(() => {
    if (orderData && !showPaymentGateaway) {
      setShowPaymentGateaway(true);
    }
  }, [orderData, showPaymentGateaway]);

  // Modal Gateway View
  if (showPaymentGateaway && orderData) {
    return (
      <div className="payment-gateway-overlay">
        <div className="payment-gateway-modal">
          <div className="gateway-header">
            <div className="gateway-logo">
              <span className="material-symbols-outlined gateway-brand-icon">
                shield_with_heart
              </span>
              <div>
                <h2>HomelyHub Pay</h2>
                <span>Secure Checkout Gateway</span>
              </div>
            </div>
            <div className="secure-badge">
              <span className="material-symbols-outlined">lock</span>
              <span>256-bit SSL</span>
            </div>
          </div>

          <div className="gateway-content">
            <div className="merchant-info">
              <p className="merchant-label">Payment to</p>
              <h3 className="merchant-name">HomelyHub Stays Pvt Ltd</h3>
              <p className="order-id-text">
                Order Reference: <strong>{orderData.orderId}</strong>
              </p>
            </div>

            <div className="payment-summary">
              <div className="summary-item">
                <span>Property</span>
                <strong>{propertyName}</strong>
              </div>
              <div className="summary-item">
                <span>Dates</span>
                <span>{checkinDate} → {checkoutDate}</span>
              </div>
              <div className="summary-item">
                <span>Guests & Nights</span>
                <span>{guests} guest{guests > 1 ? "s" : ""} • {nights} night{nights > 1 ? "s" : ""}</span>
              </div>
              <div className="summary-item total-amount">
                <span>Total Payable</span>
                <strong>₹{Number(totalPrice).toLocaleString("en-IN")}</strong>
              </div>
            </div>

            {error && (
              <div className="payment-error-box">
                <span className="material-symbols-outlined">error</span>
                <span>{error}</span>
              </div>
            )}

            <div className="gateway-actions">
              <button
                type="button"
                onClick={handleCancelPayment}
                className="cancel-btn"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmPayment}
                className="confirm-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="payment-btn-spinner" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">lock</span>
                    <span>Pay ₹{Number(totalPrice).toLocaleString("en-IN")}</span>
                  </>
                )}
              </button>
            </div>

            <div className="security-info">
              <p>
                <span className="material-symbols-outlined">verified_user</span>
                Bank-grade encryption ensures your payment is safe and protected.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Checkout Page
  return (
    <div className="checkout-page-container">
      {/* Checkout Header */}
      <div className="checkout-page-header">
        <Link to={`/propertylist/${propertyId}`} className="checkout-back-link">
          <span className="material-symbols-outlined">arrow_back</span>
          <span>Back to property</span>
        </Link>
        <h1 className="checkout-title">Confirm & Pay</h1>
        <p className="checkout-subtitle">Review your stay details before completing payment</p>
      </div>

      <div className="checkout-card">
        {/* Property Summary Section */}
        <div className="checkout-property-preview">
          <div className="preview-icon-wrap">
            <span className="material-symbols-outlined">home</span>
          </div>
          <div className="preview-info">
            <span className="preview-tag">Booking Request</span>
            <h2 className="preview-name">{propertyName}</h2>
          </div>
        </div>

        {/* Stay Information Grid */}
        <div className="checkout-section">
          <h3 className="checkout-sec-title">Your Trip Details</h3>
          <div className="stay-details-grid">
            <div className="stay-detail-box">
              <span className="material-symbols-outlined stay-detail-icon">calendar_today</span>
              <div>
                <span className="stay-detail-label">Check-in</span>
                <p className="stay-detail-val">{checkinDate || "Not selected"}</p>
              </div>
            </div>

            <div className="stay-detail-box">
              <span className="material-symbols-outlined stay-detail-icon">event</span>
              <div>
                <span className="stay-detail-label">Check-out</span>
                <p className="stay-detail-val">{checkoutDate || "Not selected"}</p>
              </div>
            </div>

            <div className="stay-detail-box">
              <span className="material-symbols-outlined stay-detail-icon">group</span>
              <div>
                <span className="stay-detail-label">Guests</span>
                <p className="stay-detail-val">{guests || 1} guest{(guests || 1) > 1 ? "s" : ""}</p>
              </div>
            </div>

            <div className="stay-detail-box">
              <span className="material-symbols-outlined stay-detail-icon">nights_stay</span>
              <div>
                <span className="stay-detail-label">Duration</span>
                <p className="stay-detail-val">{nights || 1} night{(nights || 1) > 1 ? "s" : ""}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="checkout-divider" />

        {/* Price Breakdown Section */}
        <div className="checkout-section">
          <h3 className="checkout-sec-title">Price Breakdown</h3>
          <div className="checkout-price-list">
            <div className="checkout-price-row">
              <span>Total Stay ({nights} night{nights > 1 ? "s" : ""})</span>
              <span>₹{Number(totalPrice).toLocaleString("en-IN")}</span>
            </div>
            <div className="checkout-price-row">
              <span>HomelyHub Service Fee</span>
              <span className="free-tag">Free</span>
            </div>
            <div className="checkout-price-row">
              <span>Taxes & Processing</span>
              <span className="free-tag">Included</span>
            </div>
            <div className="checkout-price-divider" />
            <div className="checkout-price-row checkout-total-row">
              <div>
                <strong>Total Amount</strong>
                <p className="total-hint">Includes all taxes and fees</p>
              </div>
              <strong className="total-val">₹{Number(totalPrice).toLocaleString("en-IN")}</strong>
            </div>
          </div>
        </div>

        {error && (
          <div className="payment-error-box">
            <span className="material-symbols-outlined">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* Payment CTA */}
        <div className="checkout-action-wrap">
          <button
            type="button"
            onClick={handleBooking}
            disabled={loading}
            className="checkout-pay-btn"
          >
            {loading ? (
              <>
                <span className="payment-btn-spinner" />
                <span>Processing Order...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined">lock</span>
                <span>Proceed to Payment • ₹{Number(totalPrice).toLocaleString("en-IN")}</span>
              </>
            )}
          </button>
          <div className="checkout-trust-badge">
            <span className="material-symbols-outlined">verified_user</span>
            <span>Safe & secure 256-bit encrypted transaction</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
