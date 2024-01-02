import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchUserLikes } from "../redux/slice/likeSlice"; 
import HotelCard from '../components/hotel/HotelCard';
import { HotelListContainer } from "../components/pagestyles/HotelListStyle";
import ChangePasswordForm from './ChangePasswordForm';
import { useNavigate } from "react-router-dom";
import { fetchMyHotels } from "../redux/hotelActions";
import IntroductionPage from './IntroductionPage';
import CheckHotelAdminProfile from './CheckHotelAdminProfile';
import HotelReservation from '../components/hotel/HotelReservation';
import { fetchUserComments } from '../redux/slice/commentSlice';
import CommentCard from '../components/hotel/comment/CommentCard';
import { ActivityContainer, ActivitySelectBox, ActivitySelectItem, ActivitySelectItems, CommentIcon, CreditCardIcon, HeartIcon, HotelCardContainer, HotelDesc, InfoBox, InfoItem, InfoItemBox, MypageInfo, MypageLayout, PencilIcon } from '../components/pagestyles/MyPageStyle';

export default function Mypage() {

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  // console.log("loggedInUser", loggedInUser);  //확인용
  const userComments = useSelector(state => state.comment.comments['user']); // 사용자 댓글
  const myHotels = useSelector((state) => state.hotels.myHotels);
  const [userRole, setUserRole] = useState("");

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
    if (loggedInUser?.id) {
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

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

//     return (
//       <MypageLayout>
//         <h1>My page</h1>

//         <div>
//           {userRole === 'hotel_admin' && <IntroductionPage/ >}
//         </div>
//         <div>
//           <h2>비밀번호 변경</h2>
//           <ChangePasswordForm />
//         </div>
//         <div>
//         <HotelReservation/>

//         </div>
//         <HotelListContainer>
//         <h2>관심 호텔</h2>
//           {likeHotels.map((hotel)=> <HotelCard key={hotel.hotel_id} hotel={hotel}/>)}
//         </HotelListContainer>


// <HotelListContainer>
//   <h2>호텔리스트</h2>
//   {myHotelList.map((hotel) => (
//     <HotelCard
//       hotel={hotel}
//       showEditButton={userRole === 'hotel_admin'}
//       onEditButtonClick={handleEditButtonClick}
//     />
//   ))}
// <div>호텔등록자프로필확인<CheckHotelAdminProfile/></div>
  
// </HotelListContainer>

// <div>
//           <h2>나의 후기</h2>
//           {userComments ? userComments.map((comment) => (
//             <CommentCard key={comment.id} comment={comment} />
//           )) : <p>Loading...</p>}
//         </div>
//       </>
//   );
// }


return (
  <MypageLayout>
    <h1>마이페이지</h1>
    <MypageInfo>
      <InfoItemBox>
        <InfoItem>
          <span>찜하기</span>
          <div>
            <strong>{likeHotels.length}</strong>
            <span>개</span>
          </div>
        </InfoItem>   
        <InfoItem>
          <span>결제하기</span>
          <div>
            <strong>{likeHotels.length}</strong>
            <span>회</span>
          </div>
        </InfoItem>          
        <InfoItem>
          <span>할인</span>
          <div>
            <strong>0</strong>
            <span>개</span>
          </div>
        </InfoItem>

      </InfoItemBox>
      <InfoBox/>                
    </MypageInfo>


    <div>
      {userRole === 'hotel_admin' && <IntroductionPage/ >}
    </div>

    <div>
      <h2>비밀번호 변경</h2>
      <ChangePasswordForm />
    </div>


    <ActivitySelectBox>
      <h2>나의 활동</h2>
      <ActivitySelectItems>

        <ActivitySelectItem onClick={() => scrollTo('likedHotels')}>
          <div>
            <HeartIcon/>
            좋아한
          </div>
        </ActivitySelectItem>

        <ActivitySelectItem onClick={() => scrollTo('reservationHotels')}>
         <div>
          <CreditCardIcon />
           결제한
         </div>
        </ActivitySelectItem>

        {userRole === 'hotel_admin' && (
          <ActivitySelectItem onClick={() => scrollTo('hotelLists')}>
          <div>
            <CommentIcon />
            등록한
          </div>
        </ActivitySelectItem>
        )}

        <ActivitySelectItem onClick={() => scrollTo('hotelComments')}>
          <div>
            <PencilIcon/>
            작성한
          </div>
        </ActivitySelectItem>

      </ActivitySelectItems>
    </ActivitySelectBox>

    <ActivityContainer id="likedHotels">
      <h2>관심 호텔</h2>
      <HotelCardContainer>
        {likeHotels.length > 0 ? (
          likeHotels.map((hotel) => <HotelCard key={hotel.hotel_id} hotel={hotel} />)
        ) : (
          <HotelDesc>관심 호텔을 추가해보세요</HotelDesc>
        )}
      </HotelCardContainer>
    </ActivityContainer>

    <ActivityContainer id="reservationHotels">
      <h2>호텔 예약</h2>
      <HotelReservation/>
    </ActivityContainer>

    {myHotelList.length > 0 && (
      <ActivityContainer id="hotelLists">
        <h2>호텔 목록</h2>
        <HotelCardContainer>
          {myHotelList.map((hotel) => (
            <HotelCard
              hotel={hotel}
              showEditButton={userRole === 'hotel_admin'}
              onEditButtonClick={handleEditButtonClick}
            />
          ))}
        </HotelCardContainer>
      </ActivityContainer>
    )}        

    <ActivityContainer id="hotelComments">
      <h2>나의 후기</h2>
      {userComments && userComments.length > 0 ? (
        userComments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))
      ) : (
        <HotelDesc>아직 작성한 후기가 없습니다</HotelDesc>
      )}
    </ActivityContainer>

  </MypageLayout>
);
}