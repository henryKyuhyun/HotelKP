import React, { useEffect, useRef, useState } from 'react';
import BannerPhoto from './../../../assets/bannerPhotos/BannerPhoto.png';
import hotelRoom from './../../../assets/bannerPhotos/hotelRoom.png';
import hotelRoom2 from './../../../assets/bannerPhotos/hotelRoom2.png';
import Pool from './../../../assets/bannerPhotos/Pool.png';
import Rounge from './../../../assets/bannerPhotos/Rounge.png';
import Rounge2 from './../../../assets/bannerPhotos/Rounge2.png';
import Stairs from './../../../assets/bannerPhotos/Stairs.png';
import {SliderWrap,Slider,SliderItem,SliderImage,PrevButton,NextButton,Indicator,Dot} from './BannerStyle';

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
    
  const images = [
    BannerPhoto,
    hotelRoom,
    hotelRoom2,
    Pool,
    Rounge,
    Rounge2,
    Stairs
  ];

  const moveToRight = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  const moveToLeft = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(moveToRight, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SliderWrap>
      <Slider style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <SliderItem key={index}>
            <SliderImage src={image} alt={`slide-${index}`} />
          </SliderItem>
        ))}
      </Slider>
  
      <PrevButton onClick={moveToLeft}>{"<"}</PrevButton>
      <NextButton onClick={moveToRight}>{">"}</NextButton>
  
      <Indicator>
        {images.map((_, index) => (
          <Dot key={index} active={currentIndex === index} />
        ))}
      </Indicator>
    </SliderWrap>
  );

};

export default Banner;
