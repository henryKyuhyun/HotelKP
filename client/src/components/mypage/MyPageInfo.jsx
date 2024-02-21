import React from 'react';
import { 
    InfoItem,
    InfoItemBox,
    InfoBox,
    } from "../pagestyles/MyPageStyle";

export default function MypageInfo({likeHotels, userRole, userPayment, adminPayment }) {
    return (
        <>
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
                    <strong>{userRole === 'user' ? userPayment.length : adminPayment.length}</strong>
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
        </>
    );
}
