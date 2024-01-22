// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import { fetchComments } from '../../../redux/slice/commentSlice';
// import CommentCard from './CommentCard';
// import CommentForm from './CommentForm';
// import {
//     CommentLayout,
//     CommentHeader,
//     CommentTitle,
//     FormAndLinkContainer,
//     LinkButton,
// }from './CommentStyle';
// import Star from '../../shared/star/Star';


// export default function CommentContainer({hotel_id}) {
//     // const comments = useSelector((state) => state.comment || []);
//     const dispatch = useDispatch();
//     const allComments = useSelector((state) => state.comment.comments || {});
//     const comments = allComments[hotel_id] || [];
//     useEffect(() =>{
//         dispatch(fetchComments(hotel_id));
//     },[hotel_id]);
    
//     const handleNewComment = () => {
//         dispatch(fetchComments(hotel_id));
//     };

//     return (
//         <CommentLayout>
//             {comments.length === 0 ?
//                 <>
//                 <h1>후기가 아직 없습니다</h1>
//                 <CommentForm hotel_id={hotel_id} onSubmitSuccess={handleNewComment} />
//                 </>
                
//             :
//             <>
//                 <CommentHeader>
//                     <CommentTitle>후기 {comments.length}개</CommentTitle>
//                     {comments.length > 5 &&
//                         <LinkButton to={{pathname: `/comments/${hotel_id}`,state: { hotel_id }}}>후기 전체보기</LinkButton>
//                     }
//                 </CommentHeader>
//                 <ul>
//                     {comments.slice(0, 5).map((comment) => (
//                         <CommentCard key={comment.id} comment={comment}/>
//                     ))
//                     }
//                 </ul>

//                 <FormAndLinkContainer>
//                     <CommentForm hotel_id={hotel_id} onSubmitSuccess={handleNewComment} />
//                 </FormAndLinkContainer>
//             </>
//             }
//         </CommentLayout>
        
//     );
// }


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from '../../../redux/slice/commentSlice';
import CommentCard from './CommentCard';
import CommentForm from './CommentForm';
import {
    CommentLayout,
    CommentHeader,
    CommentTitle,
    FormAndLinkContainer,
    LinkButton,
}from './CommentStyle';
import Star from '../../shared/star/Star';
import {fetchUserPayment} from '../../../redux/slice/paymentSlice';


export default function CommentContainer({hotel_id}) {
    // const comments = useSelector((state) => state.comment || []);
    const dispatch = useDispatch();
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const userId = loggedInUser.id;

    const allComments = useSelector((state) => state.comment.comments || {});
    const comments = allComments[hotel_id] || [];
    const userPayment = useSelector((state) => state.payment.userPayment || []);
    const paymentHotel = userPayment.find(pay => {
        return pay.hotel_id === Number(hotel_id);
    });
    let checkOutTime;
    if (paymentHotel) {
        checkOutTime = new Date(paymentHotel.check_out);
    }
    const currentTime = new Date();

    useEffect(() =>{
        dispatch(fetchComments(hotel_id));
        dispatch(fetchUserPayment(userId));
    },[hotel_id]);

    console.log('zzzff',hotel_id )
    console.log('paymenttt',userPayment )
    console.log('awaw',paymentHotel )
    console.log('111',checkOutTime )



    const handleNewComment = () => {
        dispatch(fetchComments(hotel_id));
    };
    

    return (
        <CommentLayout>
            {comments.length === 0 ?
                <>
                <h1>후기가 아직 없습니다</h1>
                {paymentHotel && checkOutTime < currentTime ? <CommentForm hotel_id={hotel_id} onSubmitSuccess={handleNewComment} /> : null}
                </>
                
            :
            <>
                <CommentHeader>
                    <CommentTitle>후기 {comments.length}개</CommentTitle>
                    {comments.length > 5 &&
                        <LinkButton to={{pathname: `/comments/${hotel_id}`,state: { hotel_id }}}>후기 전체보기</LinkButton>
                    }
                </CommentHeader>
                <ul>
                    {comments.slice(0, 5).map((comment) => (
                        <CommentCard key={comment.id} comment={comment}/>
                    ))
                    }
                </ul>
            </>
            }
            <FormAndLinkContainer>
                {paymentHotel && checkOutTime < currentTime ? <CommentForm hotel_id={hotel_id} onSubmitSuccess={handleNewComment} /> : null}
            </FormAndLinkContainer>

        </CommentLayout>
        
    );
}