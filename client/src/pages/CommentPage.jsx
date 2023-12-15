import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { fetchComments } from '../redux/slice/commentSlice';
import CommentCard from '../components/hotel/comment/CommentCard';

export default function CommentPage() {
  const { hotel_id } = useParams();
  console.log(hotel_id)
  
  const allComments = useSelector((state) => state.comment.comments || {});
  const comments = allComments[hotel_id] || [];
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(fetchComments(hotel_id));
  },[hotel_id]);
  
    return (
      <div>
              <ul>
                  {comments.map((comment) => (
                      <CommentCard key={comment.id} comment={comment}/>
                    ))
                  }
              </ul>
      </div>
);
}