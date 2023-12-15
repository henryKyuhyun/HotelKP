// client/src/pages/LoginPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { CustomContainer, FormControlContainer, FormInput, FormLabel, FormTitle, LoginFormContainer, SubmitButton } from '../components/pagestyles/LoginPageStyles';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../redux/slice/authSlice';
import { fetchUserLikes } from '../redux/slice/likeSlice';
import { setupNotification } from '../services/notifications'; 

export default function LoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (isLoggedIn) {
        navigate("/");
    }
  }, [isLoggedIn, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post('http://localhost:4000/api/login', {
        id,
        password,
      });
  
      if (res.status === 200) {
        sessionStorage.setItem('accessToken', res.data.accessToken);
  
        const decodedToken = jwt_decode(res.data.accessToken);
        const userRole = res.data.userRole; // 응답으로부터 userRole 가져오기

        const loggedInUserData = {
          ...decodedToken,
          userRole: userRole,
        };
        
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUserData)); 

        dispatch(login({ userId: decodedToken.id, userRole: userRole, token: res.data.accessToken })); // Save userId and userRole to the redux store => 이렇게 해야 useSelector(state => state.auth.userId)를 통해 로그인한 사용자ID가져올수 있을듯
        dispatch(fetchUserLikes(decodedToken.id));

         //알림 설정
        await setupNotification(loggedInUserData);
      }
    } catch (error) {
      if (error.response.status === 401) {
        alert(error.response.data.message);
      }
    }
  };

  
  return (
    <CustomContainer>
      <LoginFormContainer onSubmit={handleSubmit}>
        <FormTitle>로그인</FormTitle>
        <FormControlContainer>
          <FormLabel htmlFor='userId'>아이디:</FormLabel>
          <FormInput id='userId' type="text" value={id} onChange={(e) => setId(e.target.value)} />
        </FormControlContainer>
        <FormControlContainer>
          <FormLabel htmlFor='password'>비밀번호:</FormLabel>
          <FormInput
            id='password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControlContainer>
        <SubmitButton type="submit">로그인</SubmitButton>
      </LoginFormContainer>
    </CustomContainer>
  );
}
