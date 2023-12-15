import axios from 'axios';
import React, { useState } from 'react';

export default function ChangePasswordForm () {

  const [oldPassword, setOldPassord] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = async(e)=>{
    e.preventDefault();

    if(newPassword !== confirmNewPassword){
      alert('새로운 비밀번호 일치하지 않습니다.');
      return;
    }

    try{
      // const token = localStorage.getItem('aaccessToken');
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
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="oldPassword">기존 비밀번호</label>
      <input type="password" id='oldPassword' value={oldPassword} onChange={(e) =>setOldPassord(e.target.value)} />

      <label htmlFor="newPassword">새로운 비밀번호</label>
      <input type="password" id='newPassword' value={newPassword} onChange={(e)=> setNewPassword(e.target.value)} />
      <label htmlFor="confirmNewPassword">새로운 비밀번호</label>
      <input type="password" id="confirmNewPassword" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />

      <button type="submit">비밀번호 변경</button>

    </form>
      );
};

