import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "../../css/Modal.css";
import gsap from "gsap";

const Modal = ({ images, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "visible";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="hh-gallery-backdrop" onClick={onClose}>
      <div
        className="hh-gallery-modal"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="hh-gallery-header">
          <h3 className="hh-gallery-title">
            Photo Gallery <span>({images.length} photos)</span>
          </h3>
          <button
            type="button"
            className="hh-gallery-close-btn"
            onClick={onClose}
            aria-label="Close photos"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="hh-gallery-body">
          <div className="hh-gallery-images-grid">
            {images.map((image, index) => (
              <figure key={index} className="hh-gallery-figure">
                <img
                  src={image.url}
                  alt={`Photo ${index + 1}`}
                  loading="lazy"
                />
                <figcaption>Photo {index + 1} of {images.length}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  images: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
