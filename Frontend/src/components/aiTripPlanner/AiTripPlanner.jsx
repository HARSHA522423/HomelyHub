import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { getTripPlan } from "../../ai/tripPlanner";
import "../../css/AiTripPlanner.css";

const INTEREST_OPTIONS = [
  { name: "Beach", icon: "beach_access" },
  { name: "Food", icon: "restaurant" },
  { name: "Nightlife", icon: "nightlife" },
  { name: "Nature", icon: "park" },
  { name: "Adventure", icon: "hiking" },
  { name: "Shopping", icon: "shopping_bag" },
  { name: "History", icon: "museum" },
  { name: "Relaxation", icon: "spa" },
];

const AiTripPlanner = () => {
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState("");
  const [people, setPeople] = useState("");
  const [interests, setInterests] = useState([]);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const toggleInterest = (interest) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((item) => item !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!destination || !budget || !days || !people) {
      toast.error("Please fill in all the fields");
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const data = await getTripPlan({
        destination,
        budget,
        days,
        people,
        interests,
      });
      setResult(data);
      toast.success("Your trip plan is ready!");
    } catch (error) {
      toast.error("Could not create a trip plan, please try again");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="trip-page-container">
      {/* Hero Header */}
      <header className="trip-hero-section">
        <div className="trip-ai-badge">
          <span className="material-symbols-outlined sparkle-icon">auto_awesome</span>
          <span>AI Travel Concierge</span>
        </div>
        <h1 className="trip-hero-title">Trip Genie</h1>
        <p className="trip-hero-desc">
          Tell us where you want to go. Our AI crafts an instant, customized day-by-day itinerary paired with verified HomelyHub stays matching your budget.
        </p>
      </header>

      {/* Main Form Card */}
      <div className="trip-form-card">
        <form className="trip-form" onSubmit={handleGenerate}>
          <div className="trip-inputs-grid">
            {/* Destination */}
            <div className="trip-field-box">
              <label htmlFor="trip_dest" className="trip-field-label">
                Destination
              </label>
              <div className="trip-input-wrapper">
                <span className="material-symbols-outlined input-icon">location_on</span>
                <input
                  id="trip_dest"
                  type="text"
                  placeholder="e.g. Goa, Manali, Jaipur"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>

            {/* Total Budget */}
            <div className="trip-field-box">
              <label htmlFor="trip_budget" className="trip-field-label">
                Total Budget (₹)
              </label>
              <div className="trip-input-wrapper">
                <span className="material-symbols-outlined input-icon">currency_rupee</span>
                <input
                  id="trip_budget"
                  type="number"
                  placeholder="e.g. 20000"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>
            </div>

            {/* Trip Days */}
            <div className="trip-field-box">
              <label htmlFor="trip_days" className="trip-field-label">
                Duration (Days)
              </label>
              <div className="trip-input-wrapper">
                <span className="material-symbols-outlined input-icon">calendar_month</span>
                <input
                  id="trip_days"
                  type="number"
                  min="1"
                  max="14"
                  placeholder="e.g. 3"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                />
              </div>
            </div>

            {/* Number of People */}
            <div className="trip-field-box">
              <label htmlFor="trip_people" className="trip-field-label">
                Travelers
              </label>
              <div className="trip-input-wrapper">
                <span className="material-symbols-outlined input-icon">group</span>
                <input
                  id="trip_people"
                  type="number"
                  min="1"
                  placeholder="e.g. 2"
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="trip-interests-section">
            <label className="trip-field-label">What do you enjoy? (Interests)</label>
            <div className="trip-chips-container">
              {INTEREST_OPTIONS.map((interest) => {
                const picked = interests.includes(interest.name);
                return (
                  <button
                    type="button"
                    key={interest.name}
                    className={`trip-interest-chip ${picked ? "chip-active" : ""}`}
                    onClick={() => toggleInterest(interest.name)}
                  >
                    <span className="material-symbols-outlined chip-icon">
                      {interest.icon}
                    </span>
                    <span>{interest.name}</span>
                    {picked && (
                      <span className="material-symbols-outlined check-icon">check</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generate CTA Button */}
          <button
            type="submit"
            className="trip-generate-btn"
            disabled={loading}
          >
            <span className="material-symbols-outlined">auto_awesome</span>
            <span>{loading ? "Generating Your Plan..." : "Generate AI Trip Plan"}</span>
          </button>
        </form>
      </div>

      {/* Loading Animation State */}
      {loading && (
        <div className="trip-loading-card">
          <div className="trip-pulse-ring" />
          <h3 className="loading-title">Trip Genie is thinking...</h3>
          <p className="loading-sub">
            Analyzing {destination}, scheduling activities, and finding the best HomelyHub stays within ₹{budget}
          </p>
        </div>
      )}

      {/* Generated Result */}
      {result && (
        <section className="trip-results-container">
          {/* Summary Banner */}
          <div className="trip-summary-banner">
            <div className="summary-badge">
              <span className="material-symbols-outlined">map</span>
              <span>{days}-Day Itinerary</span>
            </div>
            <h2>Your Trip to {destination}</h2>
            <p>{result.plan.summary}</p>
          </div>

          {/* Daily Schedule Cards */}
          <div className="trip-schedule-section">
            <h3 className="section-title">Day-by-Day Itinerary</h3>
            <div className="trip-days-grid">
              {result.plan.days.map((day) => (
                <article className="trip-day-card" key={day.day}>
                  <div className="day-card-header">
                    <span className="day-number-badge">Day {day.day}</span>
                    <h4 className="day-title">{day.title}</h4>
                  </div>
                  <ul className="day-activities-list">
                    {day.activities.map((activity, index) => (
                      <li key={index}>
                        <span className="material-symbols-outlined activity-dot">check_circle</span>
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          {/* Good to know tips */}
          {result.plan.tips && result.plan.tips.length > 0 && (
            <div className="trip-tips-card">
              <div className="tips-header">
                <span className="material-symbols-outlined tips-icon">tips_and_updates</span>
                <h3>Travel Tips & Recommendations</h3>
              </div>
              <ul className="tips-list">
                {result.plan.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Stays for you */}
          <div className="trip-stays-section">
            <div className="stays-section-header">
              <div>
                <h3 className="section-title">Recommended Stays in {destination}</h3>
                <p className="stays-subtitle">
                  Curated within your nightly budget of ₹{Math.round(result.perNight || 0).toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            {result.properties.length === 0 && (
              <div className="hh-empty-state" style={{ margin: "1rem 0" }}>
                <div className="hh-empty-icon">
                  <span className="material-symbols-outlined">hotel</span>
                </div>
                <h3 className="hh-empty-title">No stays within this specific budget</h3>
                <p className="hh-empty-desc">
                  We couldn't find available properties in {destination} under ₹{Math.round(result.perNight || 0)}. Try increasing your overall budget or reducing the number of days.
                </p>
              </div>
            )}

            {result.properties.length > 0 && (
              <div className="trip-property-grid">
                {result.properties.map((property) => (
                  <article className="trip-property-card" key={property._id}>
                    <div className="trip-property-img-wrap">
                      <img
                        src={property.images && property.images.length > 0 ? property.images[0].url : "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"}
                        alt={property.propertyName}
                        loading="lazy"
                      />
                      <span className="trip-stay-tag">Best Value</span>
                    </div>

                    <div className="trip-property-body">
                      <h4 className="trip-stay-title">{property.propertyName}</h4>
                      <p className="trip-stay-place">
                        <span className="material-symbols-outlined">location_on</span>
                        <span>{property.address.city}, {property.address.state}</span>
                      </p>

                      <div className="trip-stay-footer">
                        <div className="trip-stay-price">
                          <strong>₹{Number(property.price).toLocaleString("en-IN")}</strong>
                          <span> / night</span>
                        </div>
                        <Link
                          className="trip-stay-view-btn"
                          to={`/propertylist/${property._id}`}
                        >
                          View Stay
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default AiTripPlanner;
