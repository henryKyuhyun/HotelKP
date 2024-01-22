// // client/src/redux/hotelActions.js
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetchMyHotels = createAsyncThunk(
//   "hotels/fetchMyHotels",
//   async (userId, { rejectWithValue }) => {
//     try {
//       const response = await axios.get("/api/myHotels", {
//         params: {
//           userId,
//         },
//       });
//       return response.data.hotels; // 변경해보자
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );


import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

function getToken() {
  return sessionStorage.getItem("accessToken");
}


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

export const deleteHotel = createAsyncThunk(
  "hotels/deleteHotel",
  async ({hotel_id}) => {
    try {
      const response = await axios.delete(`/api/deleteHotel/${hotel_id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
);