// client/src/redux/hotelActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMyHotels = createAsyncThunk(
  "hotels/fetchMyHotels",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/myHotels", {
        params: {
          userId,
        },
      });
      return response.data.hotels; // 변경해보자
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
