import React, { useState } from "react";
import { DatePicker, Space } from "antd";
import "react-datepicker/dist/react-datepicker.css";
import "../../css/Home.css";

import { useDispatch } from "react-redux";
import { propertyAction } from "../../store/Property/property-slice";
import { getAllProperties } from "../../store/Property/property-action";

const Search = () => {
  const { RangePicker } = DatePicker;
  const [keyword, setKeyword] = useState({
    city: "",
    guests: "",
    dateIn: "",
    dateOut: "",
  });
  const [value, setValue] = useState([]);

  const dispatch = useDispatch();

  function searchHandler(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    dispatch(propertyAction.updateSearchParams(keyword));
    dispatch(getAllProperties());
    setKeyword({
      city: "",
      guests: "",
      dateIn: "",
      dateOut: "",
    });
    setValue([]);
  }

  function returnDates(date, dateString) {
    setValue(date ? [date[0], date[1]] : []);
    updateKeyword("dateIn", dateString ? dateString[0] : "");
    updateKeyword("dateOut", dateString ? dateString[1] : "");
  }

  const updateKeyword = (field, val) => {
    setKeyword((prevKeyword) => ({
      ...prevKeyword,
      [field]: val,
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchHandler(e);
    }
  };

  return (
    <div className="searchbar">
      <div className="search-section search-dest">
        <label htmlFor="search_destination" className="search-label">
          Where
        </label>
        <input
          className="search"
          id="search_destination"
          placeholder="Search destinations"
          type="text"
          value={keyword.city}
          onChange={(e) => updateKeyword("city", e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="search-divider" />

      <div className="search-section search-dates">
        <label className="search-label">When</label>
        <Space direction="vertical" size={0}>
          <RangePicker
            value={value}
            format="DD-MM-YYYY"
            picker="date"
            placeholder={["Check in", "Check out"]}
            className="date_picker"
            disabledDate={(current) => {
              return current && current.isBefore(Date.now(), "day");
            }}
            onChange={returnDates}
          />
        </Space>
      </div>

      <div className="search-divider" />

      <div className="search-section search-guests">
        <label htmlFor="addguest" className="search-label">
          Who
        </label>
        <input
          className="search"
          id="addguest"
          placeholder="Add guests"
          type="number"
          min="1"
          value={keyword.guests || ""}
          onChange={(e) => updateKeyword("guests", e.target.value ? +e.target.value : "")}
          onKeyDown={handleKeyDown}
        />
      </div>

      <button
        type="button"
        className="searchicon"
        onClick={searchHandler}
        aria-label="Search"
        title="Search stays"
      >
        <span className="material-symbols-outlined">search</span>
      </button>
    </div>
  );
};

export default Search;
