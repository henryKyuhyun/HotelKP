// client/src/pages/JoinPage.jsx
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { CustomContainer, FormControlContainer, FormInput, FormLabel, FormSelect, FormTitle, LoginFormContainer, SubmitButton } from '../components/pagestyles/LoginPageStyle';
import { useTranslation } from 'react-i18next';
// import { useLanguage } from '../contexts/LanguageContext';



export default function JoinPage() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState("user");
    const [alertMessage, setAlertMessage] = useState('');


    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const changeLanguage = () => {
      i18n.changeLanguage(i18n.language === "en" ? "ko" : "en");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id || !name || !password || !role) {
      setAlertMessage("모든 필드를 입력해주세요.");
      return;
    }

    try {
      const res = await axios.post('http://localhost:4000/api/join', {
        id,
        name,
        password,
        role
      });

      if (res.status === 200) {
        if (res.data.isSuccess) {
          setAlertMessage("회원 가입이 완료되었습니다.");
          navigate("/login");
        } else {
          setAlertMessage("이미 존재하는 아이디입니다.");
        }
      }
    } catch (error) {
      if (error.response.status === 400) {
        setAlertMessage(error.response.data.isSuccess);
      } else {
        console.log("err" , error)
      }
    }
  };

  return (
    <CustomContainer>
      <LoginFormContainer onSubmit={handleSubmit}>
      <FormTitle>{t('title')}</FormTitle>
      {alertMessage && (
        <div>{alertMessage}</div>
      )}
        <FormControlContainer>
          <FormLabel htmlFor='name'>{t('name')} </FormLabel>
          <FormInput id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='이름을 입력해주세요'/>
        </FormControlContainer>
        <FormControlContainer>
          <FormLabel htmlFor='id'>{t('id')} </FormLabel>
          <FormInput id="id" type="text" value={id} onChange={(e) => setId(e.target.value)}  placeholder='아이디를 입력해주세요'/>
        </FormControlContainer>
        <FormControlContainer>
          <FormLabel htmlFor='password'>{t('password')}</FormLabel>
          <FormInput
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='비밀번호를 입력해주세요'
          />
        </FormControlContainer>
        <FormControlContainer>
          <FormLabel htmlFor='role'>{t('role')}</FormLabel>
          <FormSelect
            id='role'
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ fontSize: "16px", padding: "0.5rem", borderRadius: "4px" }}
          >
            <option value="user">{t('user')}</option>
            <option value="hotel_admin">{t('Hotel Administrator')}</option>
          </FormSelect>
        </FormControlContainer>
        <SubmitButton type="submit">{t('submit')}</SubmitButton>
      </LoginFormContainer>
      <button onClick={changeLanguage}>
        {i18n.language === 'ko' ? 'Translate to English' : '한글로 번역'}
      </button>
    </CustomContainer>
  );
}

