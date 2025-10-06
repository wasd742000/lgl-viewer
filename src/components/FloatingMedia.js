import React, { useState, useEffect } from 'react';
import './FloatingMedia.css';
import Modal from '../layout/Modal';

function FloatingMedia() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [startX, setStartX] = useState(0);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % mediaItems.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex - 1 + mediaItems.length) % mediaItems.length);
  };

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) {
      nextImage();
    } else if (endX - startX > 50) {
      prevImage();
    }
  };

  const mediaItems = [
    { src: `${process.env.PUBLIC_URL}/assets/images/1.png`, alt: 'Memory 1' },
    { src: `${process.env.PUBLIC_URL}/assets/images/2.png`, alt: 'Memory 2' },
    { src: `${process.env.PUBLIC_URL}/assets/images/3.png`, alt: 'Memory 3' },
    { src: `${process.env.PUBLIC_URL}/assets/images/4.png`, alt: 'Memory 4' },
    { src: `${process.env.PUBLIC_URL}/assets/images/5.png`, alt: 'Memory 5' },
    { src: `${process.env.PUBLIC_URL}/assets/images/6.png`, alt: 'Memory 6' },
    { src: `${process.env.PUBLIC_URL}/assets/images/7.png`, alt: 'Memory 7' },
    { src: `${process.env.PUBLIC_URL}/assets/images/8.png`, alt: 'Memory 8' },
    { src: `${process.env.PUBLIC_URL}/assets/images/9.png`, alt: 'Memory 9' },
    { src: `${process.env.PUBLIC_URL}/assets/images/10.png`, alt: 'Memory 10' },
    { src: `${process.env.PUBLIC_URL}/assets/images/11.png`, alt: 'Memory 11' },
    { src: `${process.env.PUBLIC_URL}/assets/images/12.png`, alt: 'Memory 12' },
    { src: `${process.env.PUBLIC_URL}/assets/images/13.png`, alt: 'Memory 13' },
    { src: `${process.env.PUBLIC_URL}/assets/images/14.png`, alt: 'Memory 14' },
  ];

  return (
    <div className="floating-media-container">
      {mediaItems.map((item, index) => (
        <div
          className="floating-item"
          key={index}
          onClick={() => handleImageClick(index)}
        >
          <img
            src={item.src}
            alt={item.alt}
            className="floating-photo"
          />
        </div>
      ))}
      {selectedImageIndex !== null && (
        <div
          className="modal-overlay"
          onClick={closeModal}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={mediaItems[selectedImageIndex].src}
              alt={mediaItems[selectedImageIndex].alt}
              className="modal-image"
            />
            <button className="modal-close" onClick={closeModal}>&times;</button>
            <button className="modal-prev" onClick={prevImage}>&lt;</button>
            <button className="modal-next" onClick={nextImage}>&gt;</button>
            <div className="modal-indicators">
              {mediaItems.map((_, index) => (
                <div
                  key={index}
                  className={`modal-indicator ${index === selectedImageIndex ? 'active' : ''}`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FloatingMedia;
