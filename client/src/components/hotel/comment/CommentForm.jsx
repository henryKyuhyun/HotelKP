import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { postComment } from '../../../redux/slice/commentSlice';
import {
  CardFormLayout,
  CardForm,
  CardFormInput,
  CommentButton
}from './CommentStyle';
import Star from '../../shared/star/Star';


export default function CommentForm({hotel_id, onSubmitSuccess}) {
    const [content, setContent] = useState("");
    const [score, setScore] = useState(0);
    const [resetStar, setResetStar] = useState(false);

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();
  
    const handleSubmit = async(e)=>{
      e.preventDefault();
  
      if(content.trim().length === 0) return;
      
      if(isLoggedIn){
        try{
          await dispatch(postComment({hotel_id , user_id: loggedInUser.id , content, score}));
          setContent("");
          setScore(0);
          setResetStar(!resetStar);
          alert("댓글이 성공적으로 생성되었습니다.");
          
          if(onSubmitSuccess){
              onSubmitSuccess();
          }
    
        }catch(error){
          console.log("error",error);
        }
      }else{
        alert("로그인 후 이용가능합니다");
        setContent('');
      }
    };
    
    return (
      <CardFormLayout>
      <CardForm onSubmit={handleSubmit}>
          <Star setScore = {setScore} resetStar={resetStar}/>
          <div>
            <CardFormInput type="text" value={content} onChange={(e) => setContent(e.target.value)} />
            <CommentButton type="submit">후기 등록</CommentButton>
          </div>
      </CardForm>
    </CardFormLayout>
    );
  }