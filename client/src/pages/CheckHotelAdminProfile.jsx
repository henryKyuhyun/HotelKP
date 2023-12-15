// client/src/pages/CheckHotelAdminProfile.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function CheckHotelAdminProfile () {
  const [profileInfo, setProfileInfo] = useState(null);
  const { userId } = useParams();

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
    <div>
      <h2>Hotel Admin Profile</h2>
      <img src={profileInfo.photoPath} alt="Hotel Admin Profile" />
      <p>{profileInfo.introText}</p>
    </div>
  );
};

