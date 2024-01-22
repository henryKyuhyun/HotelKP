import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    hotelPayment: {},
    adminPayment: [],
    userPayment: [],
};

function getToken() {
    return sessionStorage.getItem("accessToken");
}

export const postPayment  = createAsyncThunk(
    "payments/postPayment ",
    async (paymentData) => {
        try{
            const response = await axios.post("/api/hotelPayment", paymentData,
            {
             headers: { Authorization: `Bearer ${getToken()}` },
            });
             console.log(response.data);
             return response.data;
          } catch (error) {
            console.log(error);
        }}
)

export const fetchAdminPayment = createAsyncThunk(
    "payments/fetchAdminPayment",
    async (userId) => {
        try{
            const response = await axios.get(`/api/adminPayment/${userId}`, {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            console.log(response.data);
            if (response.data) {
               console.log(response.data);
               return response.data.result;
            } else {
                throw new Error('No data');
            }
        } catch (error) {
            console.log(error);
        }}
)

export const fetchUserPayment = createAsyncThunk(
    "payments/fetchUserPayment",
    async (userId) => {
        try{
            const response = await axios.get(`/api/userPayment/${userId}`, {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            console.log(response);
            return response.data.result;
            // return response.data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const hotelPayments = createAsyncThunk(
    "payments/hotelPayments",
    async (payment_id) => {
        try{
            const response = await axios.patch(`/api/hotelPayments/${payment_id}`,  
            {
                status:'예약 확정',
            }, {
                headers:{Authorization:`Bearer ${getToken()}`},
            });
            console.log(response.data);
            return { payment_id, status: response.data.status }; 
        } catch (error) {
            console.log(error);
        }
    }
);


const paymentSlice = createSlice({
    name:'payment',
    initialState:initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(postPayment.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.hotelPayment = action.payload;
        })
        .addCase(fetchAdminPayment.fulfilled, (state, action) => {
            state.adminPayment = action.payload;
        })
        .addCase(fetchUserPayment.fulfilled, (state, action) => {
            state.userPayment = action.payload;
        })
        .addCase(hotelPayments.fulfilled, (state, action) => {
            state.adminPayment = state.adminPayment.map(payment =>
                payment.payment_id === action.payload.payment_id ? { ...payment, status: action.payload.status } : payment
            );
            state.userPayment = state.userPayment.map(payment =>
                payment.payment_id === action.payload.payment_id ? { ...payment, status: action.payload.status } : payment
            );
        });
    
    }
});

export default paymentSlice.reducer;