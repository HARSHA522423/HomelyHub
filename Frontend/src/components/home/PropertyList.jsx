import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import "../../css/Home.css";

import { useDispatch, useSelector } from "react-redux";
import { propertyAction } from "../../store/Property/property-slice";
import { getAllProperties } from "../../store/Property/property-action";

const PropertySkeleton = () => (
  <div className="hh-property-card skeleton-card">
    <div className="hh-card-img-wrapper hh-skeleton" />
    <div className="hh-card-body">
      <div className="skeleton-line hh-skeleton" style={{ width: "75%", height: "18px", marginBottom: "8px" }} />
      <div className="skeleton-line hh-skeleton" style={{ width: "50%", height: "14px", marginBottom: "12px" }} />
      <div className="skeleton-line hh-skeleton" style={{ width: "40%", height: "18px" }} />
    </div>
  </div>
);

const Card = ({ id, image, name, address, price }) => {
  return (
    <article className="hh-property-card">
      <Link to={`/propertylist/${id}`} className="hh-card-link" aria-label={name}>
        <div className="hh-card-img-wrapper">
          <img
            src={image}
            alt={name}
            className="hh-card-img"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80";
            }}
          />
          <div className="hh-card-badge">
            <span className="material-symbols-outlined badge-icon">verified</span>
            <span>Verified Stay</span>
          </div>
        </div>
        <div className="hh-card-body">
          <div className="hh-card-header">
            <h3 className="hh-card-title" title={name}>{name}</h3>
          </div>
          <p className="hh-card-location">
            <span className="material-symbols-outlined loc-icon">location_on</span>
            <span className="loc-text">{address}</span>
          </p>
          <div className="hh-card-pricing">
            <span className="hh-card-price">₹{Number(price).toLocaleString("en-IN")}</span>
            <span className="hh-card-per-night"> night</span>
          </div>
        </div>
      </Link>
    </article>
  );
};

const PropertyList = () => {
  const [currentPage, setCurrentPage] = useState({ page: 1 });

  const dispatch = useDispatch();
  const { properties, totalProperties, loading } = useSelector((state) => state.properties);

  const PAGE_SIZE = 8;
  const lastPage = Math.max(1, Math.ceil((totalProperties || 0) / PAGE_SIZE));
  const propertyListRef = useRef(null);

  useEffect(() => {
    const fetchProperties = async (page) => {
      dispatch(propertyAction.updateSearchParams(page));
      dispatch(getAllProperties());
    };
    fetchProperties(currentPage);
  }, [currentPage, dispatch]);

  useEffect(() => {
    if (propertyListRef.current && properties.length > 0) {
      gsap.fromTo(
        propertyListRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.05,
          ease: "power2.out",
        }
      );
    }
  }, [properties]);

  const handleResetFilters = () => {
    setCurrentPage({ page: 1 });
    dispatch(propertyAction.updateSearchParams({}));
    dispatch(getAllProperties());
  };

  return (
    <main className="home-container">
      {/* Home Hero Section */}
      <section className="home-hero-banner">
        <div className="home-hero-content">
          <span className="home-hero-badge">
            <span className="material-symbols-outlined">hotel</span>
            Verified HomelyHub Stays
          </span>
          <h1 className="home-hero-title">Find your next perfect getaway</h1>
          <p className="home-hero-subtitle">
            Book top-rated homes, villas, cottages and apartments across India
          </p>
        </div>
      </section>

      {/* Property Results Count Bar */}
      {!loading && totalProperties > 0 && (
        <div className="properties-meta-bar">
          <p className="properties-count">
            <strong>{totalProperties}</strong> {totalProperties === 1 ? "stay" : "stays"} available
          </p>
        </div>
      )}

      {/* Loading Skeletons */}
      {loading && (
        <div className="propertylist">
          {Array.from({ length: 8 }).map((_, index) => (
            <PropertySkeleton key={index} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && properties.length === 0 && (
        <div className="hh-empty-state">
          <div className="hh-empty-icon">
            <span className="material-symbols-outlined">travel_explore</span>
          </div>
          <h2 className="hh-empty-title">No properties found</h2>
          <p className="hh-empty-desc">
            We couldn't find any stays matching your search criteria. Try adjusting your destination, date range, or removing some filters.
          </p>
          <button
            type="button"
            className="hh-empty-btn"
            onClick={handleResetFilters}
          >
            <span className="material-symbols-outlined">refresh</span>
            <span>Clear all filters & reset</span>
          </button>
        </div>
      )}

      {/* Property Grid */}
      {!loading && properties.length > 0 && (
        <div className="propertylist" ref={propertyListRef}>
          {properties.map((property) => (
            <Card
              key={property._id}
              id={property._id}
              image={
                property.images && property.images.length > 0
                  ? property.images[0].url
                  : "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"
              }
              name={property.propertyName}
              address={`${property.address?.city || ""}, ${property.address?.state || ""}`}
              price={property.price}
              slug={property.slug}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && properties.length > 0 && (
        <div className="pagination">
          <button
            className="pagination-btn previous_btn"
            onClick={() => setCurrentPage((prev) => ({ page: Math.max(1, prev.page - 1) }))}
            disabled={currentPage.page === 1}
            aria-label="Previous page"
            title="Previous page"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          <span className="pagination-indicator">
            Page <strong>{currentPage.page}</strong> of <strong>{lastPage}</strong>
          </span>

          <button
            className="pagination-btn next_btn"
            onClick={() => setCurrentPage((prev) => ({ page: prev.page + 1 }))}
            disabled={currentPage.page >= lastPage}
            aria-label="Next page"
            title="Next page"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      )}
    </main>
  );
};

export default PropertyList;
