// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useParams } from 'react-router-dom';
// import Like from '../components/shared/like/Like';
// import HotelPayment from '../components/hotel/HotelPayment';
// import {HotelLayout,HotelContiner,HotelHeader,HotelPrice,HotelSubInfo,HotelInfo,HotelCommentInfo,Line,} from '../components/pagestyles/HotelDetailStyle'
// import CommentContainer from '../components/hotel/comment/CommentContainer';
// import { FaStar } from 'react-icons/fa';
// import { BsPersonFill } from 'react-icons/bs';
// import Map from '../components/map/Map';

// export default function HotelDetailPage() {

//   const {hotelId} = useParams();
//   const [hotel,setHotel] = useState(null);
//   const [error, setError] = useState("");
//   const [mainImageIndex, setMainImageIndex] = useState(0);
//   const [isShowMore, setIsShowMore] = useState(false);


//   useEffect(() =>{
//     fetchHotelDetail();
//   },[]);

//   const fetchHotelDetail = async() =>{
//     try{
//       const response = await axios.get(`/api/hotel/${hotelId}`);
//       console.log("API response:", response); 
//       setHotel(response.data);
//     }catch(error){
//       console.error(`Error fetching hotel detail : ${error}`);
//       console.error(`Error response: ${error.response}`); 
//       setError('Faild to load hotel details');
//     }
//   };
    
//   const processImages = (imagePath) => {
//     if (imagePath) {
//         if (typeof imagePath === "string" && imagePath.trim().charAt(0) === "[") {
//             const parsedImages = JSON.parse(imagePath);
//             return parsedImages.map((image) => {
//                 // "hotelImage/" 문자열 뒤의 부분만 반환
//                 const splitByWebPath = image.split("hotelImage/");
//                 if (splitByWebPath[1]) {
//                     return splitByWebPath[1];
//                 }
                
//                 // 파일 시스템 경로에서 마지막 부분만 반환
//                 const splitByFileSystemPath = image.split("\\");
//                 return splitByFileSystemPath[splitByFileSystemPath.length - 1];
//             });
//         } else {
//              // 이 부분은 필요에 따라 유사하게 수정하세요.
//             return [imagePath.split("hotelImage/")[1]];
//         }
//     }
//     return [];
// };

// // 대표 이미지 변경 함수
//     const changeMainImage = (index) => {
//       setMainImageIndex(index);
//     };

    
//   if(!hotel){
//     return <h3>Loading</h3>
//   }

//   const imagePaths = processImages(hotel.hotelImages);

//   return (
//     <HotelLayout>
//       <img
//         src={`/hotelImage/${imagePaths[mainImageIndex]}`}
//         alt={hotel.hotelName}
//         style={{ width: "100%", height: "auto" }} 
//       />
//       <div style={{ display: "flex", flexWrap: "wrap" }}> 
//         {imagePaths.map((imagePath, index) => (
//           <img
//             key={index}
//             src={`/hotelImage/${imagePath}`}
//             alt={`${hotel.hotelName}-${index}`}
//             onClick={() => changeMainImage(index)}
//             style={{ cursor: "pointer", width: "100px", height: "100px", marginRight: "10px", marginBottom: "10px" }}
//           />
//         ))}
//       </div>

//       <HotelContiner>
//         <HotelHeader>
//           <h1>{hotel.hotelName}</h1>
//           <div>
//             <FaStar color="ffd700" fontSize="18px"/>
//               {
//                 (hotel.average_score === null ? 0 : hotel.average_score)
//               }
//             <BsPersonFill style={{ marginLeft: "10px" }} fontSize="18px"/>
//             <span>{hotel.user_id}</span>
//             <HotelPrice>₩{hotel.price} /박</HotelPrice>
//             <Like hotel_id={hotelId} hotel_owner_id={hotel.user_id}/>
//           </div>
//         </HotelHeader>

//         <HotelSubInfo>
//           <span>최대인원 {hotel.maxGuests}명</span>
//           <span>{hotel.hotelSubInfo}</span>
//         </HotelSubInfo>

//         {/* <p>{hotel.hotelregion}</p> */}
//         <HotelInfo>
//           <h2>호텔 소개</h2>
//           {isShowMore ? hotel.hotelInfo : hotel.hotelInfo.slice(0, 300)}
//           {hotel.hotelInfo.length > 300 && (
//           <button onClick={() => setIsShowMore(!isShowMore)}>
//             {isShowMore ? "접기" : "...더보기>"}
//           </button>
//         )}
//         </HotelInfo>

//         {error && <p>{error}</p>}
        
//         <HotelCommentInfo>
//           <CommentContainer hotel_id={hotelId}/>
//         </HotelCommentInfo>

//         <Line />

//         <HotelPayment hotel={hotel}/>

//         <Map address={hotel.hotelAddress}/>


//         <Link to={`/adminProfile/${hotel.user_id}`}>See the profile of this hotel's admin</Link>

//       </HotelContiner>
//     </HotelLayout>
//   );
// }


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Like from '../components/shared/like/Like';
import HotelPayment from '../components/hotel/HotelPayment';
import {HotelLayout,HotelContiner,HotelHeader,HotelPrice,HotelSubInfo,HotelInfo,HotelCommentInfo,Line,} from '../components/pagestyles/HotelDetailStyle'
import CommentContainer from '../components/hotel/comment/CommentContainer';
import { FaStar } from 'react-icons/fa';
import { BsPersonFill } from 'react-icons/bs';
import Map from '../components/map/Map';
import AWS from 'aws-sdk';

export default function HotelDetailPage() {

  const {hotelId} = useParams();
  const [hotel,setHotel] = useState(null);
  const [error, setError] = useState("");
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [isShowMore, setIsShowMore] = useState(false);

  AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  })
  const s3 = new AWS.S3();

  useEffect(() =>{
    fetchHotelDetail();
  },[]);

  const fetchHotelDetail = async() =>{
    try{
      const response = await axios.get(`/api/hotel/${hotelId}`);
      console.log("API response:", response); 
      setHotel(response.data);
    }catch(error){
      console.error(`Error fetching hotel detail : ${error}`);
      console.error(`Error response: ${error.response}`); 
      setError('Faild to load hotel details');
    }
  };
    
  const processImages = (imagePath) => {
    if (imagePath) {
      if (typeof imagePath === 'string' && imagePath.trim().charAt(0) === '[') {
        const parsedImages = JSON.parse(imagePath);
        if (Array.isArray(parsedImages) && parsedImages.length > 0) {
          // return parsedImages.map((image) => image.replace('hotelImage/', '')); 이부분은 local 에서 이미지를 불러올때 필요한거
          return parsedImages;
        }
      } else {
        console.log("imagePath!!!",imagePath);

        return [imagePath];
      }
    }
    return [];
  };

// 대표 이미지 변경 함수
    const changeMainImage = (index) => {
      setMainImageIndex(index);
    };

    
  if(!hotel){
    return <h3>Loading</h3>
  }

  const imagePaths = processImages(hotel.hotelImages);

  return (
    <HotelLayout>
      <img
      src={imagePaths[mainImageIndex]}
      alt={hotel.hotelName}
      style={{ width: "100%", height: "auto" }} 
      />
      <div style={{ display: "flex", flexWrap: "wrap" }}> 
        {imagePaths.map((imagePath, index) => (
          <img
            key={index}
            src={imagePath} // 변경된 부분
            alt={`${hotel.hotelName}-${index}`}
            onClick={() => changeMainImage(index)}
            style={{ cursor: "pointer", width: "100px", height: "100px", marginRight: "10px", marginBottom: "10px" }}
            />
        ))}
      </div>

      <HotelContiner>
        <HotelHeader>
          <h1>{hotel.hotelName}</h1>
          <div>
            <FaStar color="ffd700" fontSize="18px"/>
              {
                (hotel.average_score === null ? 0 : hotel.average_score)
              }
            <BsPersonFill style={{ marginLeft: "10px" }} fontSize="18px"/>
            <span>{hotel.user_id}</span>
            <HotelPrice>₩{hotel.price} /박</HotelPrice>
            <Like hotel_id={hotelId} hotel_owner_id={hotel.user_id}/>
          </div>
        </HotelHeader>
        <HotelSubInfo>
          <span>최대인원 {hotel.maxGuests}명</span>
          <span>{hotel.hotelSubInfo}</span>
        </HotelSubInfo>

        {/* <p>{hotel.hotelregion}</p> */}
        <HotelInfo>
          <h2>호텔 소개</h2>
          {isShowMore ? hotel.hotelInfo : hotel.hotelInfo.slice(0, 300)}
          {hotel.hotelInfo.length > 300 && (
          <button onClick={() => setIsShowMore(!isShowMore)}>
            {isShowMore ? "접기" : "...더보기>"}
          </button>
        )}
        </HotelInfo>

        {error && <p>{error}</p>}
      
        <HotelCommentInfo>
          <CommentContainer hotel_id={hotelId}/>
        </HotelCommentInfo>
        <Line />
        <HotelPayment hotel={hotel}/>
        <Map address={hotel.hotelAddress}/>
        <Link to={`/adminProfile/${hotel.user_id}`}>See the profile of this hotel's admin</Link>
      </HotelContiner>
    </HotelLayout>
  );
}