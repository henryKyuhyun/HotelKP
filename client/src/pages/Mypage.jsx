
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchUserLikes } from "../redux/slice/likeSlice"; 
import HotelCard from '../components/hotel/HotelCard';
import { useNavigate } from "react-router-dom";
import { fetchMyHotels } from "../redux/hotelActions";
import IntroductionPage from './IntroductionPage';
import HotelReservation from '../components/hotel/HotelReservation';
import { fetchUserComments } from '../redux/slice/commentSlice';
import Modal from 'react-modal';
import CommentCard from '../components/hotel/comment/CommentCard';
import { MypageLayout,
        HotelCardContainer,
        HotelDesc,
        ActivityContainer,
        overlayStyle,
        contentStyle 
        } from "../components/pagestyles/MyPageStyle";
import MainHeader from '../components/shared/header/MainHeader';
import { IntroBtn } from '../components/pagestyles/IntroductionInputPageStyle';
import { HeaderContainer } from '../components/shared/header/HeaderStyle';
import WithdrawalPart from '../components/hotel/users/WithdrawalPart';
import MypageInfo from '../components/mypage/MyPageInfo';
import ActivitySelect from '../components/mypage/ActivitySelect';

export default function Mypage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const userComments = useSelector(state => state.comment.comments['user']); 
  const myHotels = useSelector((state) => state.hotels.myHotels);
  const userPayment = useSelector((state) => state.payment.userPayment) || [];
  const adminPayment = useSelector((state) => state.payment.adminPayment) || [];
  const likes = useSelector((state) => state.like.likes);
  const myHotelList = Object.keys(myHotels).map((hotel_id) => myHotels[hotel_id]);
  const likeHotels = Object.keys(likes).map((hotel_id) => likes[hotel_id]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (loggedInUser) {
      const newUserRole = loggedInUser.userRole;
      setUserRole(newUserRole);
    }
  }, [loggedInUser,]);
  
  useEffect(() => {
    if (loggedInUser?.id) { 
      dispatch(fetchMyHotels(loggedInUser.id));
      dispatch(fetchUserComments({user_id:loggedInUser.id}));
      dispatch(fetchUserLikes(loggedInUser.id));
    }
  }, [loggedInUser?.id, dispatch]);

  const handleEditButtonClick = (hotel_id) => {
    navigate(`/editHotel/${hotel_id}`);
  };

  const openModal = () => {
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false);
  }
  
    return (
      <MypageLayout>
        <MainHeader bgColor="#f9f9f9"/>
        <HeaderContainer>
          <h1>마이페이지</h1>
          {userRole === 'hotel_admin' &&  <IntroBtn onClick={openModal}>자기소개 등록하기</IntroBtn>}
        </HeaderContainer>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={{
            overlay: overlayStyle,
            content: contentStyle,
          }}
          contentLabel="Hotel Admin Profile Input Modal"
        >
          {userRole === 'hotel_admin' && <IntroductionPage />}
        </Modal>

        <MypageInfo likeHotels={likeHotels} userRole={userRole} userPayment={userPayment} adminPayment={adminPayment}/>
        <ActivitySelect userRole={userRole}/>

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

        <WithdrawalPart />
      </MypageLayout>
  );
}