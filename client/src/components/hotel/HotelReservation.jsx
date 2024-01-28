// import React, {useState, useEffect} from 'react';
// import axios from "axios";
// import { ReservationLayout, ReservationTable, TableData, TableHead } from '../pagestyles/HotelReservationStyle';
// import { HotelDesc } from '../pagestyles/MyPageStyle';


// export default function HotelReservation() {
//     const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
//     const userId = loggedInUser.id;
//     const userRole = loggedInUser.userRole;
//     const token = sessionStorage.getItem("accessToken")  

//     const [reservationData, setReservationData] = useState([]);

//     useEffect(() => {
//         async function fetchReservation() {
//             try{
//                 let res;
//                 if (userRole === 'hotel_admin') {
//                     res = await axios.get(`/api/adminPayment/${userId}`, {
//                         headers: { Authorization: `Bearer ${token}` },
//                     });
//                 } else {
//                     res = await axios.get(`/api/userPayment/${userId}`, {
//                         headers: { Authorization: `Bearer ${token}` },
//                     });
//                 }
//                 console.log('fetchReservation', res);
//                 setReservationData(res.data.result)
//             } catch(error){
//                 console.log(error);
//             }
//         }
//         fetchReservation();
//     }, [userId])

//     const handleConfirm = async(payment_id) => {
//         try {
//             await axios.patch(`/api/hotelPayments/${payment_id}`,
//             {
//                 status:'예약 확정',
//             }, {
//                 headers:{Authorization:`Barer ${token}`},
//             })
//             const updatedReservation = reservationData.find(data => data.payment_id === payment_id);

//             await axios.post("/api/notification", 
//             {
//                title: "예약 확정 되었습니다",
//                body: `호텔:${updatedReservation.hotel_name},체크인: ${updatedReservation.check_in}`,
//                       user_id: updatedReservation.payment_user_id
//             },{
//                headers:{Authorization:`Bearer ${token}`}
//             });
        
//             setReservationData(prev => 
//                 prev.map(data =>
//                     data.payment_id === payment_id ? {...data, status:'예약 확정'} : data)
//                 )
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     function formatDate(dateString) {
//         const options = {year: 'numeric', month: '2-digit', day: '2-digit',};
//         return new Date(dateString).toLocaleString('ko-KR', options);
//     }

//     return (
//       <ReservationLayout>
//         {reservationData && reservationData.length > 0 ? (
//           <ReservationTable>
//             <thead>
//               <tr>
//                 <TableHead>호텔 이름</TableHead>
//                 <TableHead>예약인</TableHead>
//                 <TableHead>결제금액</TableHead>
//                 <TableHead>날짜</TableHead>
//                 <TableHead>예약 상태</TableHead>
//               </tr>
//             </thead>
//             <tbody>
//               {reservationData.map((data) => (
//                 <tr key={data.payment_id}>
//                   <TableData>{data.hotel_name}</TableData>
//                   <TableData>{data.payment_user_id}</TableData>
//                   <TableData>{data.price}원</TableData>
//                   <TableData>
//                     {formatDate(data.check_in)} ~ {formatDate(data.check_out)}
//                   </TableData>
//                   <TableData>{data.status}</TableData>
//                   {userRole === 'hotel_admin' && data.status !== "예약 확정" &&
//                     <button onClick={() => handleConfirm(data.payment_id)}>예약 수락하기</button>}
//                 </tr>
//               ))}
//             </tbody>
//           </ReservationTable>
//         ) : (
//           <HotelDesc>예약이 없습니다.</HotelDesc>
//         )}
//       </ReservationLayout>
//     );
// }

import React, {useState, useEffect} from 'react';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAdminPayment,
    fetchUserPayment,
    hotelPayments,
} from '../../redux/slice/paymentSlice'; 
import {ReservationLayout,
  ReservationTable,
  TableHead,
  TableData,
  HotelDesc,
  } from './HotelReservationStyle';

export default function HotelReservation() {
    const dispatch = useDispatch();
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const userId = loggedInUser.id;
    const userRole = loggedInUser.userRole;
    const token = sessionStorage.getItem("accessToken")  

    // const [reservationData, setReservationData] = useState([]);
    const reservationData = useSelector(state => userRole === 'hotel_admin' ? state.payment.adminPayment : state.payment.userPayment);


    useEffect(() => {
        if (userRole === 'hotel_admin') {
            dispatch(fetchAdminPayment(userId));
        } else {
            dispatch(fetchUserPayment(userId));
        }
    }, [dispatch, userId, userRole]);


    const handleConfirm = async(payment_id) => {
        try {
            dispatch(hotelPayments(payment_id));

            const updatedReservation = reservationData.find(data => data.payment_id === payment_id);

            await axios.post("/api/notification", 
            {
               title: "예약 확정 되었습니다",
               body: `호텔:${updatedReservation.hotel_name},체크인: ${updatedReservation.check_in}`,
                      user_id: updatedReservation.payment_user_id
            },{
               headers:{Authorization:`Bearer ${token}`}
            });
        
            // setReservationData(prev => 
            //     prev.map(data =>
            //         data.payment_id === payment_id ? {...data, status:'예약 확정'} : data)
            //     )
        } catch (error) {
            console.log(error);
        }
    };

    function formatDate(dateString) {
      const options = {year: 'numeric', month: '2-digit', day: '2-digit',};
      return new Date(dateString).toLocaleString('ko-KR', options);
  }

    return (
      <ReservationLayout>
        {reservationData && reservationData.length > 0 ? (
          <ReservationTable>
            <thead>
              <tr>
                <TableHead>호텔 이름</TableHead>
                <TableHead>예약인</TableHead>
                <TableHead>결제금액</TableHead>
                <TableHead>날짜</TableHead>
                <TableHead>예약 상태</TableHead>
              </tr>
            </thead>
            <tbody>
              {reservationData.map((data) => (
                <tr key={data.payment_id}>
                  <TableData>{data.hotel_name}</TableData>
                  <TableData>{data.payment_user_id}</TableData>
                  <TableData>{data.price}원</TableData>
                  <TableData>
                    {formatDate(data.check_in)} ~ {formatDate(data.check_out)}
                  </TableData>
                  <TableData>{data.status}</TableData>
                  {userRole === 'hotel_admin' && data.status !== "예약 확정" &&
                    <button onClick={() => handleConfirm(data.payment_id)}>예약 수락하기</button>}
                </tr>
              ))}
            </tbody>
          </ReservationTable>
        ) : (
          <HotelDesc>예약이 없습니다.</HotelDesc>
        )}
      </ReservationLayout>
    );
}