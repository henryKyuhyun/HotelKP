import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { ChangePWBtn, ConfirmPWBtn, DivisionLine, ErrorMsg, FormStyle, InputStyle, LabelStyle, ModalDiv, PStyled, StyledModal } from '../components/pagestyles/ChangePasswordFormStyle';

Modal.setAppElement("#root");

export default function ChangePasswordForm () {

  const [oldPassword, setOldPassord] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inputError, setInputError] = useState({});

  useEffect(() => {
    let error = {};
    if(!oldPassword) error.oldPassword = "현재 패스워드를 입력해주세요"
    if(!newPassword) error.newPassword = '변경할 패스워드를 입력해주세요!';
    if(!confirmNewPassword) error.confirmNewPassword = '패스워드 확인을 위해 다시 입력해주세요!';
    setInputError(error);
  },[oldPassword,newPassword,confirmNewPassword ]);

  const handleSubmit = async(e)=>{
    e.preventDefault();

    if(newPassword !== confirmNewPassword){
      alert('새로운 비밀번호 일치하지 않습니다.');
      return;
    }
    try{
      const token = sessionStorage.getItem('accessToken');

      const response = await axios.post("http://localhost:4000/api/change-password", {
        oldPassword,
        newPassword
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      });

      if(response.status===200){
        alert(response.data.message);
      }
    }catch(error){
      if(error.response.status ===401){
        alert(error.response.data.message);
      }else{
        alert('서버오류입니다!!!!!')
      }
    }
    setModalIsOpen(false); // 비밀번호 변경이 완료되면 모달 팝업을 닫습니다.

  }

return (
  <div>
    <ChangePWBtn onClick={() => setModalIsOpen(true)}>비밀번호 변경</ChangePWBtn> {/* 이 버튼을 클릭하면 모달 팝업이 열립니다. */}
    <StyledModal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} > {/* 모달 팝업의 열림 상태와 닫기 요청을 처리합니다. */}
      <FormStyle onSubmit={handleSubmit}>
        <PStyled>패스워드 변경</PStyled>
        
        <LabelStyle htmlFor="oldPassword">현재 패스워드</LabelStyle><br />
        <InputStyle type="password" id='oldPassword' value={oldPassword}  placeholder='현재 패스워드' onChange={(e) =>setOldPassord(e.target.value)} />
        {inputError.oldPassword && <ErrorMsg>{inputError.oldPassword}</ErrorMsg>}
        
        <DivisionLine></DivisionLine>

        <LabelStyle htmlFor="newPassword">변경 패스워드</LabelStyle><br />
        <InputStyle type="password" id='newPassword' value={newPassword} placeholder='변경 패스워드' onChange={(e)=> setNewPassword(e.target.value)} />
        {inputError.newPassword && <ErrorMsg>{inputError.newPassword}</ErrorMsg>}

        <LabelStyle htmlFor="confirmNewPassword">패스워드 확인</LabelStyle><br />
        <InputStyle type="password" id="confirmNewPassword" value={confirmNewPassword} placeholder='패스워드 확인' onChange={(e) => setConfirmNewPassword(e.target.value)} />
        {inputError.confirmNewPassword && <ErrorMsg>{inputError.confirmNewPassword}</ErrorMsg>}

        <ConfirmPWBtn type="submit">비밀번호 변경</ConfirmPWBtn>
      </FormStyle>
    </StyledModal>
  </div>
);
};