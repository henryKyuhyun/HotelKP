import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import * as authActions from '../../../redux/authAction';
import {
  HeaderLayout,
  LinkTitle,
  RightContainer,
  CenteredLink,
  HeaderMain,
  AccommdationStyle,
} from "./HeaderStyle";
import { resetLikes } from "../../../redux/slice/likeSlice"; 
import Sidebar from './Sidebar';
import WithdrawalPart from '../../hotel/users/WithdrawalPart';

export default function MainHeader({ bgColor }) {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);
  const userRole = useSelector((state) => state.auth?.userRole);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      const storedUser = localStorage.getItem('loggedInUser');
      setLoggedInUser(JSON.parse(storedUser));
      
    } else {
      setLoggedInUser(null);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
  
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  

  const handleLogout = () => {
    dispatch(authActions.logout());
    dispatch(resetLikes()); 
    navigate("/");
  };


  return (
    <HeaderLayout  bgColor={bgColor}>
      <LinkTitle to="/">
        <HeaderMain>누구업소</HeaderMain>
        <AccommdationStyle>ACCOMMODATION</AccommdationStyle>
      </LinkTitle>
  
      <RightContainer>
      {windowWidth > 780 && (
        <>
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
                <WithdrawalPart />
                <CenteredLink to="/" onClick={handleLogout} style={{cursor: 'pointer'}}>로그아웃</CenteredLink>
                <CenteredLink to="/mypage">마이페이지</CenteredLink>
              {userRole === "hotel_admin" && (
                <CenteredLink to="/uploadHotel">호텔등록</CenteredLink>
              )}
            </>
          )}
        </>
      )}
      </RightContainer>
      {windowWidth <= 780 && <Sidebar/>}
    </HeaderLayout>
  );
}