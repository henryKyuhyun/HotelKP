// client/src/pages/CheckHotelAdminProfile.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AdminInfo, HotelProfile, ImgForAdmin, InfoDiv } from '../components/pagestyles/CheckHotelAdminStyle';

export default function CheckHotelAdminProfile ({userId}) {
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

  if (!profileInfo) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 내용
  }
  return (
    <InfoDiv>
      <HotelProfile>Hotel Admin Profile</HotelProfile>
      <ImgForAdmin src={profileInfo.photoPath} alt="Hotel Admin Profile" />
      <AdminInfo>{profileInfo.introText}</AdminInfo>
    </InfoDiv>
  );
};
