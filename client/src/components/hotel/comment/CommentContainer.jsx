// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import { fetchComments } from '../../../redux/slice/commentSlice';
// import CommentCard from './CommentCard';
// import CommentForm from './CommentForm';
// import {
//     FormAndLinkContainer,
//     LinkButton
// }from './CommentStyle';


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
//         <div>
//             {comments.length === 0 ?
//                 <>
//                 <h1>후기가 아직 없습니다</h1>
//                 <CommentForm hotel_id={hotel_id} onSubmitSuccess={handleNewComment} />
//                 </>
                
//             :
//             <>
//                 <h1>후기 {comments.length}개</h1>
//                 <ul>
//                     {comments.slice(0, 5).map((comment) => (
//                         <CommentCard key={comment.id} comment={comment}/>
//                     ))
//                     }
//                 </ul>

//                 <FormAndLinkContainer>
//                     <CommentForm hotel_id={hotel_id} onSubmitSuccess={handleNewComment} />
//                     {comments.length > 5 &&
//                         <LinkButton to={{pathname: `/comments/${hotel_id}`,state: { hotel_id }}}>후기 전체보기</LinkButton>}
//                 </FormAndLinkContainer>
//             </>
//             }
//         </div>
        
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


export default function CommentContainer({hotel_id}) {
    // const comments = useSelector((state) => state.comment || []);
    const dispatch = useDispatch();
    const allComments = useSelector((state) => state.comment.comments || {});
    const comments = allComments[hotel_id] || [];
    useEffect(() =>{
        dispatch(fetchComments(hotel_id));
    },[hotel_id]);
    
    const handleNewComment = () => {
        dispatch(fetchComments(hotel_id));
    };

    return (
        <CommentLayout>
            {comments.length === 0 ?
                <>
                <h1>후기가 아직 없습니다</h1>
                <CommentForm hotel_id={hotel_id} onSubmitSuccess={handleNewComment} />
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

                <FormAndLinkContainer>
                    <CommentForm hotel_id={hotel_id} onSubmitSuccess={handleNewComment} />
                </FormAndLinkContainer>
            </>
            }
        </CommentLayout>
        
    );
}
