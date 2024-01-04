import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withdrawal } from '../../../redux/authAction';


export default function WithdrawalPart() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const handleWithdrawal = () => {
    dispatch(withdrawal());
  };
  // 로그인된 사용자에게만 탈퇴 버튼을 보여줍니다
  return (
    isLoggedIn && (
      <button onClick={handleWithdrawal}>
        회원탈퇴
      </button>
    )
  );
}
