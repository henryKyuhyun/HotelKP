// // src/redux/slice/hotelSlice.js
// import { createSlice } from "@reduxjs/toolkit";
// import { fetchMyHotels } from "../hotelActions";

// const initialState = {
//   myHotels: {},
//   status: "idle",
//   error: null,
// };

// const hotelSlice = createSlice({
//   name: "hotels",
//   initialState,
//   reducers: {
//     // 다른 리듀서들
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchMyHotels.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchMyHotels.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.myHotels = Object.fromEntries(
//           action.payload.map((h) => [h.hotel_id, h])
//         );
//       })
//       .addCase(fetchMyHotels.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// // 다른 action 내보내기
// export default hotelSlice.reducer;


// src/redux/slice/hotelSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchMyHotels, deleteHotel } from "../hotelActions";

const initialState = {
  myHotels: {},
  status: "idle",
  error: null,
};

const hotelSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    // 다른 리듀서들
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyHotels.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMyHotels.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.myHotels = Object.fromEntries(
          action.payload.map((h) => [h.hotel_id, h])
        );
      })
      .addCase(fetchMyHotels.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteHotel.fulfilled, (state, action) => {
        console.log('226' ,state.myHotels)
        delete state.myHotels[action.payload.hotel_id]; 
      });
  },
});

// 다른 action 내보내기
export default hotelSlice.reducer;