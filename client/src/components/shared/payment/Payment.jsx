import React from 'react';
import {SubmitButton, TotalPrice, PaymentLayout} from '../../pagestyles/HotelPaymentStyle';

const script = document.createElement('script');
script.src = 'https://cdn.iamport.kr/js/iamport.payment-1.2.0.js';
document.body.appendChild(script);

class PaymentButton extends React.Component{
  componentDidMount(){
    var IMP = window.IMP;
    IMP.init('imp67011510');
  }

  requestPay = () => {
    //checkin, checkout 날짜가 같은 경우 
    if (!this.props.paymentCallback()) {
      return;
    }
    
    var IMP = window.IMP;
    var today = new Date();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();
    var milliseconds = today.getMilliseconds();
    var makeMerchantUid = this.props.hotel_id + this.props.user_id + '_' + hours + minutes + seconds + milliseconds;
    IMP.request_pay({
      pg: 'html5_inicis',
      pay_method: 'card',
      merchant_uid: 'IMP' + makeMerchantUid,
      name:this.props.hotelName,
      amount:this.props.hotelPrice,
      buyer_email: 'Iamport@chai.finance',
      buyer_name: '아임포트 기술지원팀',
      buyer_tel: '010-1234-5678',
      buyer_addr: '서울특별시 강남구 삼성동',
      buyer_postcode: '123-456',
    }, (rsp) => {
      if (rsp.success) {
        console.log(rsp, '성공');
        this.props.paymentCallback(true);
      } else {
        console.log(rsp, '실패');
      }
    });
  };

  render() {
    return (
      <PaymentLayout>
        <TotalPrice>{this.props.hotelPrice === null ? '' : `총 ${this.props.hotelPrice}원`}</TotalPrice>
        <SubmitButton onClick={this.requestPay}>결제하기</SubmitButton>
      </PaymentLayout>
    );
  }
}

export default PaymentButton;