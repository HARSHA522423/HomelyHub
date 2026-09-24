import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../../css/FilterModal.css";
import "react-input-range/lib/css/index.css";
import InputRange from "react-input-range";

const FilterModal = ({ selectedFilters, onFilterChange, onClose }) => {
  const [priceRange, setPriceRange] = useState({
    min: selectedFilters.priceRange?.min || selectedFilters.minPrice || 600,
    max: selectedFilters.priceRange?.max || selectedFilters.maxPrice || 30000,
  });

  const [propertyType, setPropertyType] = useState(
    selectedFilters.propertyType || ""
  );

  const [roomType, setRoomType] = useState(selectedFilters.roomType || "");
  const [amenities, setAmenities] = useState(selectedFilters.amenities || []);

  useEffect(() => {
    setPriceRange({
      min: selectedFilters.priceRange?.min || selectedFilters.minPrice || 600,
      max: selectedFilters.priceRange?.max || selectedFilters.maxPrice || 30000,
    });
    setPropertyType(selectedFilters.propertyType || "");
    setRoomType(selectedFilters.roomType || "");
    setAmenities(selectedFilters.amenities || []);
  }, [
    selectedFilters.priceRange,
    selectedFilters.minPrice,
    selectedFilters.maxPrice,
    selectedFilters.propertyType,
    selectedFilters.roomType,
    selectedFilters.amenities,
  ]);

  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
  };

  const handleMinInputChange = (e) => {
    const minValue = parseInt(e.target.value, 10) || 0;
    setPriceRange((prev) => ({ ...prev, min: minValue }));
  };

  const handleMaxInputChange = (e) => {
    const maxValue = parseInt(e.target.value, 10) || 0;
    setPriceRange((prev) => ({ ...prev, max: maxValue }));
  };

  const handleApplyFilter = () => {
    onFilterChange("minPrice", priceRange.min);
    onFilterChange("maxPrice", priceRange.max);
    onFilterChange("propertyType", propertyType);
    onFilterChange("roomType", roomType);
    onFilterChange(
      "amenities",
      amenities.map((a) => a)
    );
    onClose();
  };

  const propertyTypeOptions = [
    { value: "house", label: "House", icon: "home" },
    { value: "flat", label: "Flat / Apartment", icon: "apartment" },
    { value: "guest-house", label: "Guest House", icon: "villa" },
    { value: "hotel", label: "Hotel", icon: "hotel" },
  ];

  const roomTypeOptions = [
    { value: "Entire Home", label: "Entire Place", desc: "A place to yourself", icon: "home" },
    { value: "Room", label: "Private Room", desc: "Your own room in a home", icon: "bed" },
    { value: "Anytype", label: "Any Type", desc: "Any room or space", icon: "domain" },
  ];

  const amenitiesOptions = [
    { value: "Wifi", label: "Wi-Fi", icon: "wifi" },
    { value: "Kitchen", label: "Kitchen", icon: "kitchen" },
    { value: "Ac", label: "Air Conditioning", icon: "ac_unit" },
    {
      value: "Washing Machine",
      label: "Washing Machine",
      icon: "local_laundry_service",
    },
    { value: "Tv", label: "TV", icon: "tv" },
    { value: "Pool", label: "Swimming Pool", icon: "pool" },
    { value: "Free Parking", label: "Free Parking", icon: "local_parking" },
  ];

  const handleClearFilters = () => {
    setPriceRange({ min: 600, max: 30000 });
    setPropertyType("");
    setRoomType("");
    setAmenities([]);
  };

  const handleAmenitiesChange = (selectedAmenity) => {
    setAmenities((prevAmenities) =>
      prevAmenities.includes(selectedAmenity)
        ? prevAmenities.filter((item) => item !== selectedAmenity)
        : [...prevAmenities, selectedAmenity]
    );
  };

  const handlePropertyTypeChange = (selectedType) => {
    setPropertyType((prevType) =>
      prevType === selectedType ? "" : selectedType
    );
  };

  const handleRoomTypeChange = (selectedType) => {
    setRoomType((prevType) => (prevType === selectedType ? "" : selectedType));
  };

  return (
    <div className="hh-filter-backdrop" onClick={onClose}>
      <div className="hh-filter-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="hh-filter-header">
          <button
            type="button"
            className="hh-filter-close"
            onClick={onClose}
            aria-label="Close filters"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <h3 className="hh-filter-title">Filters</h3>
          <div style={{ width: "2rem" }} /> {/* Spacer for centering */}
        </div>

        {/* Modal Scrollable Body */}
        <div className="hh-filter-body">
          {/* Price Range */}
          <section className="hh-filter-section">
            <h4 className="hh-filter-sec-title">Price Range</h4>
            <p className="hh-filter-sec-subtitle">Nightly prices before taxes and fees</p>

            <div className="hh-range-slider-wrapper">
              <InputRange
                minValue={600}
                maxValue={30000}
                value={priceRange}
                onChange={handlePriceRangeChange}
              />
            </div>

            <div className="hh-price-boxes">
              <div className="hh-price-box">
                <span className="hh-price-box-label">Minimum</span>
                <div className="hh-price-box-input">
                  <span className="hh-price-cur">₹</span>
                  <input
                    type="number"
                    value={priceRange.min}
                    onChange={handleMinInputChange}
                    min={600}
                    max={priceRange.max}
                  />
                </div>
              </div>

              <div className="hh-price-dash">—</div>

              <div className="hh-price-box">
                <span className="hh-price-box-label">Maximum</span>
                <div className="hh-price-box-input">
                  <span className="hh-price-cur">₹</span>
                  <input
                    type="number"
                    value={priceRange.max}
                    onChange={handleMaxInputChange}
                    min={priceRange.min}
                    max={30000}
                  />
                </div>
              </div>
            </div>
          </section>

          <div className="hh-filter-divider" />

          {/* Property Type */}
          <section className="hh-filter-section">
            <h4 className="hh-filter-sec-title">Property Type</h4>
            <p className="hh-filter-sec-subtitle">Choose the kind of place you want to stay in</p>
            <div className="hh-property-type-grid">
              {propertyTypeOptions.map((option) => (
                <button
                  type="button"
                  key={option.value}
                  className={`hh-type-card ${
                    propertyType === option.value ? "selected" : ""
                  }`}
                  onClick={() => handlePropertyTypeChange(option.value)}
                >
                  <span className="material-symbols-outlined hh-type-icon">
                    {option.icon}
                  </span>
                  <span className="hh-type-label">{option.label}</span>
                </button>
              ))}
            </div>
          </section>

          <div className="hh-filter-divider" />

          {/* Room Type */}
          <section className="hh-filter-section">
            <h4 className="hh-filter-sec-title">Type of Place</h4>
            <p className="hh-filter-sec-subtitle">Search rooms, entire homes, or any accommodation</p>
            <div className="hh-room-type-grid">
              {roomTypeOptions.map((option) => (
                <button
                  type="button"
                  key={option.value}
                  className={`hh-room-card ${
                    roomType === option.value ? "selected" : ""
                  }`}
                  onClick={() => handleRoomTypeChange(option.value)}
                >
                  <span className="material-symbols-outlined hh-room-icon">
                    {option.icon}
                  </span>
                  <div className="hh-room-text">
                    <span className="hh-room-title">{option.label}</span>
                    <span className="hh-room-desc">{option.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <div className="hh-filter-divider" />

          {/* Amenities */}
          <section className="hh-filter-section">
            <h4 className="hh-filter-sec-title">Amenities</h4>
            <p className="hh-filter-sec-subtitle">Select the amenities you need for your trip</p>
            <div className="hh-amenities-grid">
              {amenitiesOptions.map((option) => {
                const isChecked = amenities.includes(option.value);
                return (
                  <label
                    key={option.value}
                    className={`hh-amenity-item ${isChecked ? "checked" : ""}`}
                  >
                    <input
                      type="checkbox"
                      value={option.value}
                      checked={isChecked}
                      onChange={() => handleAmenitiesChange(option.value)}
                    />
                    <span className="material-symbols-outlined hh-amenity-icon">
                      {option.icon}
                    </span>
                    <span className="hh-amenity-label">{option.label}</span>
                  </label>
                );
              })}
            </div>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="hh-filter-footer">
          <button
            type="button"
            className="hh-filter-clear-btn"
            onClick={handleClearFilters}
          >
            Clear all
          </button>
          <button
            type="button"
            className="hh-filter-apply-btn"
            onClick={handleApplyFilter}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

FilterModal.propTypes = {
  selectedFilters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FilterModal;
