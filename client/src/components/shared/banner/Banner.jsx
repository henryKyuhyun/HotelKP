import React, { useEffect, useRef, useState } from 'react';
import {SliderWrap,Slider,SliderItem,SliderImage,PrevButton,NextButton,Indicator,Dot} from './BannerStyle';

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const awsImages = [
    process.env.REACT_APP_BANNER_PHOTO_STAIRS,
    process.env.REACT_APP_BANNER_PHOTO_HOTELROOM2,
    process.env.REACT_APP_BANNER_PHOTO_HOTELROOM,
    process.env.REACT_APP_BANNER_PHOTO_POOL,
    process.env.REACT_APP_BANNER_PHOTO_ROUNGE,
    process.env.REACT_APP_BANNER_PHOTO_BANNERPHOTO,
    process.env.REACT_APP_BANNER_PHOTO_ROUNGE2
  ];

  const moveToRight = () => {
    setCurrentIndex((prev) => (prev + 1) % awsImages.length);
  };
  const moveToLeft = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? awsImages.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(moveToRight, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SliderWrap>
      <Slider style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {awsImages.map((awsImages, index) => (
          <SliderItem key={index}>
            <SliderImage src={awsImages} alt={`slide-${index}`} />
          </SliderItem>
        ))}
      </Slider>
  
      <PrevButton onClick={moveToLeft}>{"<"}</PrevButton>
      <NextButton onClick={moveToRight}>{">"}</NextButton>
  
      <Indicator>
        {awsImages.map((_, index) => (
          <Dot key={index} $active={currentIndex === index} />
        ))}
      </Indicator>


    </SliderWrap>
  );

};

export default Banner;
