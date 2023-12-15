import React, {useState, useEffect} from 'react';
import axios from "axios";

export default function HotelReservation() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const userId = loggedInUser.id;
    const userRole = loggedInUser.userRole;
    const token = sessionStorage.getItem("accessToken")  

    const [reservationData, setReservationData] = useState([]);

    useEffect(() => {
        async function fetchReservation() {
            try{
                let res;
                if (userRole === 'hotel_admin') {
                    res = await axios.get(`/api/adminPayment/${userId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                } else {
                    res = await axios.get(`/api/userPayment/${userId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                }
                console.log('fetchReservation', res);
                setReservationData(res.data.result)
            } catch(error){
                console.log(error);
            }
        }
        fetchReservation();
    }, [userId])

    const handleConfirm = async(payment_id) => {
        try {
            await axios.patch(`/api/hotelPayments/${payment_id}`,
            {
                status:'예약 확정',
            }, {
                headers:{Authorization:`Barer ${token}`},
            })
            const updatedReservation = reservationData.find(data => data.payment_id === payment_id);

            await axios.post("/api/notification", 
            {
               title: "예약 확정 되었습니다",
               body: `호텔:${updatedReservation.hotel_name},체크인: ${updatedReservation.check_in}`,
                      user_id: updatedReservation.payment_user_id
            },{
               headers:{Authorization:`Bearer ${token}`}
            });
        
            setReservationData(prev => 
                prev.map(data =>
                    data.payment_id === payment_id ? {...data, status:'예약 확정'} : data)
                )
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section>
            <h1>결제 내역</h1>
            {
                reservationData && reservationData.map((data)=>(
                    
                    <div key={data.payment_id}>
                        예약 상태 : {data.status} <br/>
                        호텔 이름 :{data.hotel_name}<br/>
                        호스트 : {data.hotel_owner_id}<br/>
                        예약인 : {data.payment_user_id}<br/>
                        날짜 : {data.check_in}-{data.check_out}<br/>
                        결제금액 : {data.price}원<br/>

                        {userRole === 'hotel_admin' && data.status !== "예약 확정" &&
                        <button onClick={()=>handleConfirm(data.payment_id)}>예약 수락하기</button>} <br/><br/>
                    </div>
                ))
            }
        </section>
    );
}
