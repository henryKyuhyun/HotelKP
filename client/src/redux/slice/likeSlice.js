import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// const axios = require('axios');

import axios from 'axios';


//좋아요 초기 상태
const initialState = {
  likes: {},
};

//해당 아이디 좋아요 가져오기
export const fetchUserLikes = createAsyncThunk(
  "likes/fetchUserLikes",
  async (user_id) => {
    try {
      const response = await axios.get(`/api/like/${user_id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(`fetchLikeHotels`, error);
    }
  }
);

//좋아요 누르기
export const updateLike = createAsyncThunk(
  "likes/updateLike",
  async ({ hotel_id, user_id, addLike }) => {
    try {
      const response = await axios.post("/api/like", {
        hotel_id,
        user_id,
        addLike,
      });
      return { hotel_id, liked: addLike };
    } catch (error) {
      console.error("updateLike", error);
    }
  }
);

const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    resetLikes: (state) => {
      state.likes = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserLikes.fulfilled, (state, action) => {
      if (action.payload) {
        action.payload.forEach((hotel) => {
          state.likes[hotel.hotel_id] = hotel;
        });
      }
    });
    builder.addCase(updateLike.fulfilled, (state, action) => {
      const { hotel_id, liked } = action.payload;
      if (liked) {
        //true
        //ture로 likes객체에 hotel_id 저장
        state.likes[hotel_id] = true;
      } else {
        //아니면 삭제
        delete state.likes[hotel_id];
      }
    });
  },
});

export const { resetLikes } = likeSlice.actions;

export default likeSlice.reducer;
