import React, { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { DatePicker, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { setPaymentDetails } from "../../store/Payment/payment-slice";

const PaymentForm = ({
  price,
  propertyName,
  address,
  maximumGuest,
  propertyId,
  currentBookings = [],
}) => {
  const [calculatedPrice, setCalulatedPrice] = useState(0);
  const [nightsCount, setNightsCount] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { RangePicker } = DatePicker;
  const { isAuthenticated } = useSelector((state) => state.user);

  const isDateDisabled = (current) => {
    const today = moment().startOf("day");
    if (current && current.isBefore(today)) {
      return true;
    }

    return currentBookings.some((booking) => {
      const startDate = moment(booking.fromDate).startOf("day");
      const endDate = moment(booking.toDate).startOf("day");
      const currentMoment = moment(current.toDate()).startOf("day");

      return (
        currentMoment.isSameOrAfter(startDate) &&
        currentMoment.isSameOrBefore(endDate)
      );
    });
  };

  const form = useForm({
    defaultValues: {
      dateRange: [],
      guests: "",
      name: "",
      phoneNumber: "",
    },
    onSubmit: async ({ value }) => {
      const [checkinDate, checkoutDate] = value.dateRange;
      const nights = moment(checkoutDate).diff(moment(checkinDate), "days");
      const { name, guests, phoneNumber } = value;
      if (name && guests && phoneNumber && checkinDate && checkoutDate) {
        await dispatch(
          setPaymentDetails({
            checkinDate: checkinDate,
            checkoutDate: checkoutDate,
            nights,
            totalPrice: calculatedPrice,
            propertyName,
            address,
            guests: Number(guests),
            name,
            phoneNumber,
          })
        );
        navigate(`/payment/${propertyId}`);
      } else {
        alert("Please fill all fields correctly before proceeding.");
      }
    },
  });

  return (
    <div className="hh-booking-card-wrapper">
      <div className="hh-booking-card">
        {/* Price Header */}
        <div className="hh-booking-header">
          <div className="hh-booking-price-row">
            <span className="hh-booking-currency">₹</span>
            <span className="hh-booking-amount">
              {Number(price).toLocaleString("en-IN")}
            </span>
            <span className="hh-booking-unit"> / night</span>
          </div>
          <div className="hh-booking-badge">
            <span className="material-symbols-outlined">shield_check</span>
            <span>Verified Stay</span>
          </div>
        </div>

        <form
          className="hh-booking-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          {/* Inputs Capsule Box */}
          <div className="hh-booking-inputs-box">
            {/* Date Range Picker */}
            <form.Field name="dateRange">
              {(field) => (
                <div className="hh-booking-field-row dates-row">
                  <label className="hh-booking-label">CHECK-IN — CHECKOUT</label>
                  <Space direction="vertical" size={0} style={{ width: "100%" }}>
                    <RangePicker
                      format="YYYY-MM-DD"
                      picker="date"
                      placeholder={["Select Check-in", "Select Checkout"]}
                      className="hh-booking-datepicker"
                      disabledDate={isDateDisabled}
                      onChange={(value, dateString) => {
                        field.handleChange(dateString);
                        const [checkin, checkout] = dateString;
                        if (checkin && checkout) {
                          const nights = moment(checkout, "YYYY-MM-DD").diff(
                            moment(checkin, "YYYY-MM-DD"),
                            "days"
                          );
                          const total = price * nights;
                          setNightsCount(nights);
                          setCalulatedPrice(total);
                        } else {
                          setNightsCount(0);
                          setCalulatedPrice(0);
                        }
                      }}
                    />
                  </Space>
                </div>
              )}
            </form.Field>

            {/* Guests Input */}
            <form.Field
              name="guests"
              validators={{
                onChange: ({ value }) =>
                  value > 0 && value <= maximumGuest
                    ? undefined
                    : `Guests must be between 1 and ${maximumGuest}`,
              }}
            >
              {(field) => (
                <div className="hh-booking-field-row">
                  <label className="hh-booking-label">
                    GUESTS <span className="hh-label-hint">(Max: {maximumGuest})</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={maximumGuest}
                    className="hh-booking-input"
                    placeholder={`1 to ${maximumGuest} guests`}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors && (
                    <p className="hh-booking-error">{field.state.meta.errors}</p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Name Input */}
            <form.Field name="name">
              {(field) => (
                <div className="hh-booking-field-row">
                  <label className="hh-booking-label">YOUR FULL NAME</label>
                  <input
                    type="text"
                    className="hh-booking-input"
                    placeholder="e.g. Rahul Sharma"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>

            {/* Phone Number Input */}
            <form.Field name="phoneNumber">
              {(field) => (
                <div className="hh-booking-field-row last-row">
                  <label className="hh-booking-label">PHONE NUMBER</label>
                  <input
                    type="number"
                    className="hh-booking-input"
                    placeholder="10-digit mobile number"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>
          </div>

          {/* Pricing Breakdown (when dates are selected) */}
          {nightsCount > 0 && (
            <div className="hh-price-breakdown">
              <div className="hh-breakdown-row">
                <span>₹{Number(price).toLocaleString("en-IN")} × {nightsCount} nights</span>
                <span>₹{Number(calculatedPrice).toLocaleString("en-IN")}</span>
              </div>
              <div className="hh-breakdown-row">
                <span>HomelyHub Service Fee</span>
                <span className="hh-fee-free">Free</span>
              </div>
              <div className="hh-breakdown-divider" />
              <div className="hh-breakdown-row hh-breakdown-total">
                <strong>Total Amount</strong>
                <strong>₹{Number(calculatedPrice).toLocaleString("en-IN")}</strong>
              </div>
            </div>
          )}

          {/* CTA Action */}
          <div className="hh-booking-cta-wrap">
            {!isAuthenticated ? (
              <button
                type="button"
                className="hh-booking-cta-btn secondary"
                onClick={() => navigate("/login")}
              >
                <span className="material-symbols-outlined">login</span>
                <span>Login to Book</span>
              </button>
            ) : (
              <button
                type="submit"
                className="hh-booking-cta-btn primary"
              >
                <span className="material-symbols-outlined">lock</span>
                <span>
                  {nightsCount > 0
                    ? `Reserve • ₹${Number(calculatedPrice).toLocaleString("en-IN")}`
                    : "Reserve This Place"}
                </span>
              </button>
            )}
          </div>

          <div className="hh-booking-trust-note">
            <span className="material-symbols-outlined">verified</span>
            <span>You won't be charged yet</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
