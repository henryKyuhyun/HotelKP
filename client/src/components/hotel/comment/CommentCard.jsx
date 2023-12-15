// import React, { useState } from 'react';
// import { useDispatch } from "react-redux";
// import {
//     CommentCardContainer,
//     MemberName,
//     DateText,
//     CommentHeader,
//     InfoContent,
//     CommentAction,
//     CardContent,
// }from './CommentStyle';
// import { deleteComments, updateComments } from '../../../redux/slice/commentSlice';
// import Star from '../../shared/star/Star';

// export default function CommentCard({
//     comment: {id, user_id, content, created_at, score},
// }) {

//     const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
//     const dispatch = useDispatch();
//     const [editedScore, setEditedScore] = useState(score);

    
//     //날짜 형식 변환
//     const date = new Date(created_at);
//     const formattedDate = `${date.getFullYear()}.${date.getMonth() + 1}`;

//     //후기 수정
//     const [isEditing, setIsEditing] = useState(false);
//     const [editValue, setEditValue] = useState(content);


//     const editComment = () => {
//         setIsEditing(true);
//     }

//     const saveEdit = () => {
//         setIsEditing(false);  
//         dispatch(updateComments({ comment_id:id , content:editValue, score: editedScore }));
//         console.log('scoreee', score);
//     }

//     const deleteComment = () => {
//         dispatch(deleteComments({comment_id:id}));
//     }


//     return (
//         <CommentCardContainer>
//             <CommentHeader>
//                 <InfoContent>
//                     <MemberName>
//                         {user_id}
//                     </MemberName>
//                     <DateText>
//                         {formattedDate}
//                     </DateText>
//                 </InfoContent>

//                 <CommentAction>
//                     {loggedInUser.id === user_id && (
//                         isEditing ? (
//                             <>
//                                 <button onClick={saveEdit}>저장</button>
//                                 <button onClick={() => setIsEditing(false)}>취소</button> 
//                             </>
//                         ):(
//                             <>
//                                 <button onClick={editComment}> 수정 </button>
//                                 <button onClick={deleteComment}> 삭제 </button>
//                             </>
//                         )
//                     )}
//                 </CommentAction>
//             </CommentHeader>

//             <CardContent>
//                 {!isEditing ? 
//                     (<>
//                     <Star score={score}/>
//                     {content}
//                     </>) :
//                     (
//                         <>
//                             {editedScore !== null && (
//                                 <Star setScore={setEditedScore} resetStar={!isEditing} />
//                             )}
//                             <input
//                                 type="text"
//                                 value={editValue}
//                                 onChange={(e) => setEditValue(e.target.value)}
//                                 onKeyDown={e=> (e.key === 'Enter' ? saveEdit() : null)}
//                             />
//                         </>
//                     )
//                 }
//             </CardContent>
//         </CommentCardContainer>
//     );   
// }


import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import {
    CommentCardContainer,
    MemberName,
    DateText,
    CommentHeader,
    InfoContent,
    CommentAction,
    CardContent,
    CommentEditButton
}from './CommentStyle';
import { deleteComments, updateComments } from '../../../redux/slice/commentSlice';
import Star from '../../shared/star/Star';

export default function CommentCard({
    comment: {id, user_id, content, created_at, score},
}) {

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const dispatch = useDispatch();
    const [editedScore, setEditedScore] = useState(score);
    
    //날짜 형식 변환
    const date = new Date(created_at);
    const formattedDate = `${date.getFullYear()}.${date.getMonth() + 1}`;

    //후기 수정
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(content);


    const editComment = () => {
        setIsEditing(true);
    }

    const saveEdit = () => {
        setIsEditing(false);  
        dispatch(updateComments({ comment_id:id , content:editValue, score: editedScore }));
        console.log('scoreee', score)  
    }

    const deleteComment = () => {
        dispatch(deleteComments({comment_id:id}));
    }


    return (
        <CommentCardContainer>
            <CommentHeader>
                <div>
                <InfoContent>
                    <MemberName>
                        {user_id}
                    </MemberName>
                    <DateText>
                        {formattedDate}
                    </DateText>
                </InfoContent>
                <Star score={score}/>
                </div>
                <CommentAction>
                    {loggedInUser.id === user_id && (
                        isEditing ? (
                            <>
                                <CommentEditButton onClick={saveEdit}>저장</CommentEditButton>
                                <CommentEditButton onClick={() => setIsEditing(false)}>취소</CommentEditButton> 
                            </>
                        ):(
                            <>
                                <CommentEditButton onClick={editComment}> 수정 </CommentEditButton>
                                <CommentEditButton onClick={deleteComment}> 삭제 </CommentEditButton>
                            </>
                        )
                    )}
                </CommentAction>
            </CommentHeader>

            <CardContent>
                {!isEditing ? 
                    (<>
                    {content}
                    </>) :
                    (
                        <>
                            {editedScore !== null && (
                                <Star setScore={setEditedScore} resetStar={!isEditing} />
                            )}
                            <input
                                type="text"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onKeyDown={e=> (e.key === 'Enter' ? saveEdit() : null)}
                            />
                        </>
                    )
                }
            </CardContent>
        </CommentCardContainer>
    );   
}