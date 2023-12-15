import React, { useState } from "react";
import PaymentButton from "../shared/payment/Payment";
import axios from "axios";
import DatePicker from "./datepicker/DayPicker";
import {AiOutlineMinusSquare , AiOutlinePlusSquare, AiOutlineCalendar} from 'react-icons/ai'
import { PaymentContainer, PaymentInfo, PaymentLabel } from "../pagestyles/HotelPaymentStyle";

export default function HotelPayment({ hotel }) {
  const Token = sessionStorage.getItem("accessToken");
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const MaxGuests = hotel.maxGuests;

  const [paymentType, setPaymentType] = useState("카드");
  const [guests, setGuests] = useState(1);
  const [dateInput, setDateInput] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [dateText, setDateText] = useState(""); 

  // console.log('HotelPayment',hotel);
  console.log(dateInput.startDate ,dateInput.endDate );

  //guests
  const handleMinus = ()=> {
    if (guests < 2) return;
    setGuests(guests-1);
  }

  const handlePlus = ()=> {
    if (guests >= MaxGuests) return;
    setGuests(guests+1);
  }

  //date
  const adjustDate = (dates) => {
    const [start, end] = dates;
    setDateInput(prevDates => ({ ...prevDates, startDate: start, endDate: end }));
  
    if (start && end) {
      setDateText(`${start.toLocaleDateString('ko-KR').split('/').join('. ')} - ${end.toLocaleDateString('ko-KR').split('/').join('. ')}`);
    }
  };    

const calculatePrice = () => {
  if (!dateInput.endDate) {
    return null;
  }
  
  const timeDifference = Math.abs(dateInput.endDate - dateInput.startDate);
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
  const totalPrice = hotel.price * daysDifference;
  return totalPrice;
};

const SubmitPayment = async(isConfirmed) => {
  if (!isConfirmed) {
  // 체크인과 체크아웃 날짜가 같은지 확인
    if (dateInput.startDate.getTime() === dateInput.endDate.getTime()){
      alert("체크인과 체크아웃 날짜를 확인해 주세요.");
      return false;
    }
    return true;
  }

  const totalPrice = calculatePrice();
  
  // checkin , checkout 날짜 형식 변환
  const formattedCheckIn = dateInput.startDate.toISOString();
  const formattedCheckOut = dateInput.endDate.toISOString();

    const paymentData = {
      hotel_id: hotel.hotel_id,
      user_id: loggedInUser.id,
      price: totalPrice,
      payment_type: paymentType,
      check_in: formattedCheckIn,
      check_out: formattedCheckOut,
      guests: guests
    };
    try {
      await axios.post("/api/hotelPayment", paymentData,
      {
        headers:{ Authorization:`Bearer ${Token}` }
      });

      await axios.post("/api/notification", 
      {
        title: "결제가 되었습니다.", body: `결제 정보: ${hotel.hotelName}, 금액: ${totalPrice}`, user_id: hotel.user_id
      },{
        headers:{Authorization:`Bearer ${Token}`}
        });
  
    } catch (error) {
      console.error(error);
      }
  };

  console.log({dateText})
  
  
  return (
    <form onSubmit={(e)=>{e.preventDefault();}}>
      <PaymentContainer>
        <PaymentLabel htmlFor="checkin">{hotel.hotelName}의 예약 날짜</PaymentLabel>
        <PaymentInfo>
          <div>
            <AiOutlineCalendar/>
            { dateText === ''
              ? <p> 체크인 - 체크아웃</p>
              : dateText
            }
          </div>
          <div>
            <span>인원(2세 ~)</span> 
            <AiOutlineMinusSquare  onClick={handleMinus}/>
              <span>{guests}명</span>
            <AiOutlinePlusSquare  onClick={handlePlus}/>
          </div>
        </PaymentInfo>
        
        <DatePicker 
          dateInput={dateInput}
          adjustDate={adjustDate}
        />

      </PaymentContainer>


      <label htmlFor="Payment_type" style={{display: 'none'}}>결제방법</label>
      <select
        id="payment_type"
        value={paymentType}
        onChange={(e) => setPaymentType(e.target.value)}
        style={{display: 'none'}}
      >
        <option value="카드">카드</option>
      </select>
      
      <PaymentButton
        hotelName={hotel.hotelName}
        hotelPrice={calculatePrice()}
        paymentCallback={SubmitPayment}
      />
    </form>
  );
}