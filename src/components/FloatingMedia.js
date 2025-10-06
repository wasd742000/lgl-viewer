import React, { useState } from 'react';
import './FloatingMedia.css';
import Modal from '../layout/Modal';

function FloatingMedia() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
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
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={mediaItems[selectedImageIndex].src}
              alt={mediaItems[selectedImageIndex].alt}
              className="modal-image"
            />
            <button className="modal-close" onClick={closeModal}>&times;</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FloatingMedia;
