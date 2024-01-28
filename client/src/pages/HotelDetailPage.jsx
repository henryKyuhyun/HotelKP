import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Like from '../components/shared/like/Like';
import HotelPayment from '../components/hotel/HotelPayment';
import {HotelLayout,
        HotelContiner,
        HotelHeader,
        HotelPrice,
        HotelSubInfo,
        HotelInfo,
        HotelCommentInfo,
        Line, 
        CancelButton,
        HeaderLeft,
        HeaderRight,
        MainImg,
        HostBtn,
        AdminInfo} from '../components/pagestyles/HotelDetailStyle'        
import CommentContainer from '../components/hotel/comment/CommentContainer';
import { FaStar } from 'react-icons/fa';
import { BsPersonFill } from 'react-icons/bs';
import Map from '../components/map/Map';
import { useDispatch } from 'react-redux';
import { deleteHotel } from '../redux/hotelActions';
import MainHeader from '../components/shared/header/MainHeader';
import AWS from 'aws-sdk';
import Modal from 'react-modal';
import CheckHotelAdminProfile from './CheckHotelAdminProfile';
import EditHotel from '../components/hotel/EditHotel';


Modal.setAppElement("#root");

export default function HotelDetailPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const userId = loggedInUser.id;

  const {hotelId} = useParams();
  const [hotel,setHotel] = useState(null);
  const [error, setError] = useState("");
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [isShowMore, setIsShowMore] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const deleteMyHotel = () => {
    if (window.confirm("호텔을 삭제하시겠습니까?")) {
      dispatch(deleteHotel({hotel_id:hotelId}));
      navigate("/");
    }
  }

if(!hotel){
    return <h3>Loading</h3>
  }
  const imagePaths = processImages(hotel.hotelImages);
  const openModal =() =>{
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <HotelLayout>
      <MainHeader bgColor="fff"/>
      <MainImg
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
            <HeaderLeft>
              <FaStar color="ffd700" fontSize="18px"/>
                {
                  (hotel.average_score === null ? 0 : hotel.average_score)
                }
              <BsPersonFill style={{ marginLeft: "10px" }} fontSize="18px"/>
              <span>{hotel.user_id}</span>
              <HotelPrice>₩{hotel.price} /박</HotelPrice>
              <Like hotel_id={hotelId} hotel_owner_id={hotel.user_id}/>
            </HeaderLeft>
            <HeaderRight>
              {
                (userId === hotel.user_id ? <CancelButton onClick={deleteMyHotel}> 삭제하기 </CancelButton>: null)
              }
            </HeaderRight>
            {/* <HostBtn to={`/adminProfile/${hotel.user_id}`}>호스트정보</HostBtn> */}

            
            <button onClick={openModal}>호스트정보보기</button>

            <Modal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  style={{
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
    content: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "100%",
      height:"110%",
      maxWidth: "600px",
      maxHeight: "80%",
      overflow: "auto",
      border: "none",
      borderRadius: "8px",
      outline: "none",
      padding: "20px",
    },
  }}
  contentLabel="Hotel Admin Profile Modal"
>
  <button onClick={closeModal}>닫기</button>
  <CheckHotelAdminProfile userId={hotel.user_id} />
</Modal>

          </div>
        </HotelHeader>
        <HotelSubInfo>
          <span>최대인원 {hotel.maxGuests}명</span>
          <span>{hotel.hotelSubInfo}</span>
        </HotelSubInfo>
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

      </HotelContiner>
    </HotelLayout>
  );
}