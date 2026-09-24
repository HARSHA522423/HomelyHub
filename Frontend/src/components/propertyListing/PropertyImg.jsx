import React, { useState } from "react";
import Modal from "./Modal";
import "../../css/PropertyListing.css";

const PropertyImg = ({ images = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShowAllPhotos = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!images || images.length === 0) {
    return (
      <div className="property-img-placeholder">
        <span className="material-symbols-outlined">image</span>
        <p>No photos available for this property</p>
      </div>
    );
  }

  const primaryImage = images[0];
  const secondaryImages = images.slice(1, 5);

  return (
    <div className="property-gallery-wrapper">
      <div className={`property-gallery-grid ${secondaryImages.length === 0 ? "single-image" : ""}`}>
        {/* Main Large Hero Image */}
        <div className="gallery-main-item" onClick={handleShowAllPhotos}>
          <img
            src={primaryImage.url}
            className="gallery-img main-img"
            alt="Property Main View"
            loading="eager"
          />
        </div>

        {/* Secondary Supporting Images (up to 4) */}
        {secondaryImages.length > 0 && (
          <div className="gallery-secondary-grid">
            {secondaryImages.map((image, index) => {
              const isLast = index === secondaryImages.length - 1;
              return (
                <div
                  key={index}
                  className="gallery-secondary-item"
                  onClick={handleShowAllPhotos}
                >
                  <img
                    className="gallery-img"
                    src={image.url}
                    alt={`Property View ${index + 2}`}
                    loading="lazy"
                  />
                  {isLast && (
                    <button
                      type="button"
                      className="gallery-view-all-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShowAllPhotos();
                      }}
                    >
                      <span className="material-symbols-outlined">photo_library</span>
                      <span>Show all {images.length} photos</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isModalOpen && <Modal images={images} onClose={handleCloseModal} />}
    </div>
  );
};

export default PropertyImg;
