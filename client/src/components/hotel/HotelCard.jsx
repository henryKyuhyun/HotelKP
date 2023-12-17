// client/src/components/hotel/HotelCard.jsx
import { useState } from 'react';
import {
  HotelAddress,
  HotelContainer,
  HotelImageWrapper,
  HotelImage,
  HotelName,
  HotelPrice,
  ViewDetailsLink,
} from '../pagestyles/HotelListStyles';
import Like from '../shared/like/Like';
import { FaStar } from 'react-icons/fa';
import { Dot, Indicator, IndicatorHotelCard } from '../shared/banner/BannerStyle';

export default function HotelCard({ hotel, showEditButton, onEditButtonClick, onHotelSelect, selectedHotelIds = [] }) {
  const processImages = (imagePath) => {
    if (imagePath) {
      if (typeof imagePath === 'string' && imagePath.trim().charAt(0) === '[') {
        const parsedImages = JSON.parse(imagePath);
        if (Array.isArray(parsedImages) && parsedImages.length > 0) {
          // return parsedImages.map((image) => image.replace('hotelImage/', '')); 이부분은 local 에서 이미지를 불러올때 필요한거
          return parsedImages;
        }
      } else {
        return [imagePath];
      }
    }
    return [];
  };

  const imagePaths = processImages(hotel.hotelImages);
  const [isSelected, setIsSelected] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const moveToRight = () =>{
    setCurrentIndex((prev) => (prev + 1) % imagePaths.length);
  };

  const moveToLeft = () =>{
    setCurrentIndex((prev) => (prev - 1 < 0 ? imagePaths.length - 1 : prev - 1));
  };

  const handleSelect = () => {
    if (selectedHotelIds.length < 3 || isSelected) {
      setIsSelected(!isSelected);
      onHotelSelect(hotel.hotel_id, !isSelected);
    }
  };

  return (
    <HotelContainer key={hotel.hotel_id}>
      <button onClick={moveToLeft}> {"<"} </button>
      <div style={{ position: "relative" }}> 

      <HotelImageWrapper>
        
        {/* HotelImage 에 onClick moveToRight 을 넣어서 사진을 클릭해도 가능하게  */}
        {/* <HotelImage src={`/hotelImage/${imagePaths[currentIndex]}`} alt={hotel.hotelName} onClick={moveToRight} />   */}
        <HotelImage src={imagePaths[currentIndex]} alt={hotel.hotelName} onClick={moveToRight} />

        <Like hotel_id={hotel.hotel_id} hotel_owner_id={hotel.user_id} />
      </HotelImageWrapper>
      <HotelName>상호명: {hotel.hotelName}</HotelName>
      {/* TODO : 여기 2 , color랑 Fontsize 를..Stylecomponent..에 직접?? */}
      {/* <FaStar color="ffd700" fontSize="18px" /> */}
      <FaStar style={{color:"#ffd700" , fontSize:"18px"}}/>
          {
            (hotel.average_score === null ? 0 : hotel.average_score)
          }
      <HotelAddress>주소: {hotel.hotelAddress}</HotelAddress>
      <HotelPrice>가격: {hotel.price}</HotelPrice>
      <ViewDetailsLink to={`/hotel/${hotel.hotel_id}`}>상세보기👀</ViewDetailsLink>
      <input type="checkbox" checked={isSelected} onChange={handleSelect} disabled={selectedHotelIds.length >= 3 && !isSelected} />
      Select
      {showEditButton && (
        <button onClick={() => onEditButtonClick(hotel.hotel_id)}>수정</button>
      )}

      <IndicatorHotelCard>
        {imagePaths.map((_,index) => (
          // TODO : 여기1
        <Dot key={index} $active={currentIndex === index} onClick={() => setCurrentIndex(index)} />
        // <Dot key={index} className={currentIndex === index ? "active":""} onClick={() => setCurrentIndex(index)} />
        ))}
      </IndicatorHotelCard>
      </div>
      <button onClick={moveToRight}>{">"}</button>

    </HotelContainer>
  );
}
