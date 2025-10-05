import React from 'react';

const LazyLoadedImage = () => {
  return (
    <img src={`${process.env.PUBLIC_URL}/assets/images/1.png`} alt="Lazy Loaded Example" />
  );
};

export default LazyLoadedImage;
