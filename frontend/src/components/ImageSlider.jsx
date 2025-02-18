// src/components/ImageSlider.js
import React, { useState, useEffect } from 'react';
import './ImageSlider.css';
import image1 from '../assets/D.png';
import image2 from '../assets/B.png';
import image3 from '../assets/C.png';

const images = [image1, image2, image3];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-container">
      <img src={images[currentIndex]} alt="slider" className="slider-image" />
    </div>
  );
};

export default ImageSlider;
