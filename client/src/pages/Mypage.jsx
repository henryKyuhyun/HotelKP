import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchUserLikes } from "../redux/slice/likeSlice"; 
import HotelCard from '../components/hotel/HotelCard';
import { HotelListContainer } from "../components/pagestyles/HotelListStyles";
import ChangePasswordForm from './ChangePasswordForm';
import { useNavigate } from "react-router-dom";
import { fetchMyHotels } from "../redux/hotelActions";
import IntroductionPage from './IntroductionPage';
import CheckHotelAdminProfile from './CheckHotelAdminProfile';
import HotelReservation from '../components/hotel/HotelReservation';
import { fetchUserComments } from '../redux/slice/commentSlice';
import CommentCard from '../components/hotel/comment/CommentCard';

export default function Mypage() {

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  // console.log("loggedInUser", loggedInUser);  //확인용
  const userComments = useSelector(state => state.comment.comments['user']); // 사용자 댓글
  const myHotels = useSelector((state) => state.hotels.myHotels);
  const [userRole, setUserRole] = useState("");

  // useEffect(()=>{
  //   if(loggedInUser){
  //     setUserRole(loggedInUser.userRole);
  //     console.log("userRole:", userRole); //확인용 
  //   }
  // },[loggedInUser]);

  useEffect(() => {
    if (loggedInUser) {
      const newUserRole = loggedInUser.userRole;
      setUserRole(newUserRole);
    }
  }, [loggedInUser,]);

  const likes = useSelector((state) => state.like.likes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    dispatch(fetchUserLikes(loggedInUser.id));
},[]);


  useEffect(() => {
    if (loggedInUser?.id) { // loggedInUser가 null이 아닌 경우에만 실행합니다.
      dispatch(fetchMyHotels(loggedInUser.id));
      dispatch(fetchUserComments({user_id:loggedInUser.id}));
    }
  }, [loggedInUser?.id, dispatch]);

  const myHotelList = Object.keys(myHotels).map((hotel_id) => myHotels[hotel_id]);
  const likeHotels = Object.keys(likes).map((hotel_id) => likes[hotel_id]);

  const handleEditButtonClick = (hotel_id) => {
    console.log("Edit button clicked for hotel_id:", hotel_id);
    navigate(`/editHotel/${hotel_id}`);

  };
    return (
      <>
        <h1>My page</h1>

        <div>
          {userRole === 'hotel_admin' && <IntroductionPage/ >}
        </div>
        <div>
          <h2>비밀번호 변경</h2>
          <ChangePasswordForm />
        </div>
        <div>
        <HotelReservation/>

        </div>
        <HotelListContainer>
        <h2>관심 호텔</h2>
          {likeHotels.map((hotel)=> <HotelCard key={hotel.hotel_id} hotel={hotel}/>)}
        </HotelListContainer>


<HotelListContainer>
  <h2>호텔리스트</h2>
  {myHotelList.map((hotel) => (
    <HotelCard
      hotel={hotel}
      showEditButton={userRole === 'hotel_admin'}
      onEditButtonClick={handleEditButtonClick}
    />
  ))}
<div>호텔등록자프로필확인<CheckHotelAdminProfile/></div>
  
</HotelListContainer>

<div>
          <h2>나의 후기</h2>
          {userComments ? userComments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          )) : <p>Loading...</p>}
        </div>
      </>
  );
}