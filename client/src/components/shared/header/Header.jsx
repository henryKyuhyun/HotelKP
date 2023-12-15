import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as authActions from '../../../redux/authAction';
import {
  HeaderLayout,
  LeftContainer,
  LinkTitle,
  RightContainer,
  CenteredLink,
  Logo,
  HeaderMain,
  AccommdationStyle,
} from "./HeaderStyle";
import { resetLikes } from "../../../redux/slice/likeSlice";

export default function Header() {
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);
  const userRole = useSelector((state) => state.auth?.userRole);
  const [loggedInUser, setLoggedInUser] = useState(null); // loggedInUser 상태 추가
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      const storedUser = localStorage.getItem('loggedInUser');
      setLoggedInUser(JSON.parse(storedUser));
      
    } else {
      setLoggedInUser(null);
    }
  }, [isLoggedIn]);



  const handleLogout = () => {
    dispatch(authActions.logout());
    dispatch(resetLikes()); 
  };


  return (
    <HeaderLayout>
      <LinkTitle to="/">
        <HeaderMain>누구업소</HeaderMain>
        <AccommdationStyle>ACCOMMODATION</AccommdationStyle>
      </LinkTitle>

      <RightContainer>
      {isLoggedIn && loggedInUser && ( 
        
          <CenteredLink>
            {loggedInUser.id} 
          </CenteredLink>
        )}
        {!isLoggedIn && (
          <>
            <CenteredLink to="/login">로그인</CenteredLink>
            <CenteredLink to="/join">회원가입</CenteredLink>
          </>
        )}
        {isLoggedIn && (
          <>
              <CenteredLink onClick={handleLogout} style={{cursor: 'pointer'}}>로그아웃</CenteredLink>
              <CenteredLink to="/mypage">마이페이지</CenteredLink>
            {userRole === "hotel_admin" && (
              <CenteredLink to="/uploadHotel">호텔등록</CenteredLink>
            )}
          </>
        )}
      </RightContainer>
    </HeaderLayout>
  );
}