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
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);
    const [loggedInUser, setLoggedInUser] = useState(null); // loggedInUser 상태 추가
    const allComments = useSelector((state) => state.comment.comments || {});
    const comments = allComments[hotel_id] || [];
    const userPayment = useSelector((state) => state.payment.userPayment || []);
    
    let paymentHotel, checkOutTime, userId;

    if (paymentHotel) {
        checkOutTime = new Date(paymentHotel.check_out);
    }
    if (loggedInUser) { // loggedInUser가 존재할 때만 userId와 paymentHotel, checkOutTime을 설정..
        userId = loggedInUser.id;
        paymentHotel = userPayment.find(pay => {
            return pay.hotel_id === Number(hotel_id);
        });
        if (paymentHotel) {
            checkOutTime = new Date(paymentHotel.check_out);
        }
    }
    const currentTime = new Date();

    useEffect(() =>{
        dispatch(fetchComments(hotel_id));
        if (userId) { // userId가 존재할 때만 fetchUserPayment를 호출...
            dispatch(fetchUserPayment(userId));
        }
    },[hotel_id]);


    useEffect(() => {
        if (isLoggedIn) {
            const storedUser = localStorage.getItem('loggedInUser');
            setLoggedInUser(JSON.parse(storedUser));
        } else {
            setLoggedInUser(null);
        }
    }, [isLoggedIn]);
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