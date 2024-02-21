// client/src/pages/CheckHotelAdminProfile.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AdminInfo, HotelProfile, ImgForAdmin, InfoDiv } from '../components/pagestyles/CheckHotelAdminStyle';
import { IoPersonCircleOutline } from "react-icons/io5";
export default function CheckHotelAdminProfile ({userId, page}) {
  const [profileInfo, setProfileInfo] = useState(null);
  // const { userId } = useParams(); userId 값을 prop로 받으니까 주석처리

  useEffect(()=>{
    axios.get(`/api/myprofile/${userId}`)
      .then((response)=>{
        setProfileInfo(response.data);
      })
      .catch((error)=>{
        console.error("볼수없다에러다",error);
      });
  },[userId])
  return (
    <InfoDiv>
      {!profileInfo ? (
        page !== 'hotelDetailPage' ? (
          <div>
            <IoPersonCircleOutline style={{fontSize: "80px"}}/>
            <span>아직 등록된 프로필이 없습니다.</span>
          </div>
        ) : (
          <IoPersonCircleOutline style={{fontSize: "30px"}}/>
        )
      ) : page !== 'hotelDetailPage' ? (
        <>
          <HotelProfile>Hotel Admin Profile</HotelProfile>
          <ImgForAdmin src={profileInfo.photoPath} alt="Hotel Admin Profile" />
          {/* <ImgForAdmin src={process.env.REACT_APP_ADMIN_PROFILE + profileInfo.photoPath} alt="Hotel Admin Profile" /> */}

          <AdminInfo>{profileInfo.introText}</AdminInfo>
        </>
      ) : (
        <>
          <ImgForAdmin src={profileInfo.photoPath} alt="Hotel Admin Profile"  page={page}/>
        </>
      )}
    </InfoDiv>
  );
  }