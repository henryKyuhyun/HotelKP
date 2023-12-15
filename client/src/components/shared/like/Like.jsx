import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { updateLike } from "../../../redux/slice/likeSlice";
import {LikeWrapper, HeartFill, HeartOutline} from './LikeStyle';

export default function Like({ hotel_id, hotel_owner_id }) {
  const dispatch = useDispatch();

  // true
  const liked = useSelector((state) => {
    return state.like.likes[hotel_id] })

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const isHotelOwner = loggedInUser && loggedInUser.id === hotel_owner_id;

  const handleButtonClick = async (e) => {
    e.preventDefault();

    if (loggedInUser) {
      try {
        //undefined => true => false
        const newValue = !liked;
          dispatch(
            updateLike({
              hotel_id,
              user_id: loggedInUser.id,
              addLike: newValue,
            })
          );
      } catch (error) {
        console.log("error", error);
      }
    } else {
      alert("로그인 후 이용가능합니다");
    }
  };
  

  return (
    <LikeWrapper>
      {!isHotelOwner && (
        <button onClick={handleButtonClick}>
          {liked ? <HeartFill /> : <HeartOutline />}
        </button>
      )}
    </LikeWrapper>
  );
}