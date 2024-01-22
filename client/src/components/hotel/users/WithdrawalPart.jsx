import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withdrawal } from '../../../redux/authAction';
import {  CenteredLinkForBtn } from '../../shared/header/HeaderStyle';


export default function WithdrawalPart() {

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const handleWithdrawal = () => {
    dispatch(withdrawal())
    .then(() => {
      // 서버에서 성공적으로 응답을 받은 후 로그아웃 처리와 로컬 스토리지의 사용자 정보 삭제
      localStorage.removeItem("loggedInUser");
      window.location.reload();  // 페이지를 새로고침하여 클라이언트 측의 상태를 업데이트

    });
  };
  // 로그인된 사용자에게만 탈퇴 버튼을 보여줍니다
  return (
    isLoggedIn && (
      <CenteredLinkForBtn onClick={handleWithdrawal}>
        회원탈퇴
      </CenteredLinkForBtn>
    )
  );
}
