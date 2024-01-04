// import { useState } from 'react';
// import {
//   HotelAddress,
//   HotelContainer,
//   HotelImageWrapper,
//   ImageLeftButton,
//   ImageRightButton,
//   HotelImage,
//   HotelName,
//   HotelAverage,
//   HotelPrice,
//   ViewDetailsLink,
// } from '../pagestyles/HotelListStyle';
// import Like from '../shared/like/Like';
// import { FaStar } from 'react-icons/fa';
// import { Dot, IndicatorHotelCard } from '../shared/banner/BannerStyle';

// export default function HotelCard({ hotel, showEditButton, onEditButtonClick, onHotelSelect, selectedHotelIds = [] }) {
//   const processImages = (imagePath) => {
//     if (imagePath) {
//         if (typeof imagePath === "string" && imagePath.trim().charAt(0) === "[") {
//             const parsedImages = JSON.parse(imagePath);

//           if(Array.isArray(parsedImages) && parsedImages.length > 0) {
//             return parsedImages.map((image) => {
//               // "hotelImage/" 문자열 뒤의 부분만 반환
//               const splitByWebPath = image.split("hotelImage/");
//               if (splitByWebPath[1]) {
//                   return splitByWebPath[1];
//               }

//               // 파일 시스템 경로에서 마지막 부분만 반환
//               const splitByFileSystemPath = image.split("\\");
//               return splitByFileSystemPath[splitByFileSystemPath.length - 1];
//           });
//       } else {
//            return [imagePath.split("hotelImage/")[1]];
//       }
//    }
//   return [];
// };
// }
//   const imagePaths = processImages(hotel.hotelImages);
//   const [isSelected, setIsSelected] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const moveToRight = () =>{
//     setCurrentIndex((prev) => (prev + 1) % imagePaths.length);
//   };

//   const moveToLeft = () =>{
//     setCurrentIndex((prev) => (prev - 1 < 0 ? imagePaths.length - 1 : prev - 1));
//   };

//   const handleSelect = () => {
//     if (selectedHotelIds.length < 3 || isSelected) {
//       setIsSelected(!isSelected);
//       onHotelSelect(hotel.hotel_id, !isSelected);
//     }
//   };

//   return (
//     <HotelContainer key={hotel.hotel_id}>
//       <HotelImageWrapper>
//         <ImageLeftButton onClick={moveToLeft}> {"<"} </ImageLeftButton>
//         <HotelImage
//             src={`/hotelImage/${imagePaths[currentIndex]}`}
//             alt={hotel.hotelName}
//             onClick={moveToRight} 
//           />

//         <Like hotel_id={hotel.hotel_id} hotel_owner_id={hotel.user_id} />

//         <ImageRightButton  onClick={moveToRight}>{">"}</ImageRightButton>

//         <IndicatorHotelCard>
//           {imagePaths.map((_,index) => (
//            <Dot key={index} active={currentIndex === index} onClick={() => setCurrentIndex(index)} />
//           ))}
//         </IndicatorHotelCard>
//       </HotelImageWrapper>


//       <HotelName>상호명: {hotel.hotelName}</HotelName>
//       <HotelAverage>
//         <FaStar color="ffd700" fontSize="18px" margin-right="5px"/>
//         <span>
//           {
//             hotel.average_score === null ? 0 : hotel.average_score
//           }
//         </span>
//       </HotelAverage>

//       <HotelAddress>주소: {hotel.hotelAddress}</HotelAddress>
//       <HotelPrice>₩{hotel.price}/박</HotelPrice>
//       <ViewDetailsLink to={`/hotel/${hotel.hotel_id}`}>상세보기👀</ViewDetailsLink>
//       <input type="checkbox" checked={isSelected} onChange={handleSelect} disabled={selectedHotelIds.length >= 3 && !isSelected} />
//       {showEditButton && (
//         <button onClick={() => onEditButtonClick(hotel.hotel_id)}>비교하기</button>
//       )}
//     </HotelContainer>
//   );
// }