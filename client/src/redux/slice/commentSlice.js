import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    comments: {},
};

function getToken() {
    return sessionStorage.getItem("accessToken");
}

export const postComment  = createAsyncThunk(
    "comments/postComment ",
    async ({hotel_id, user_id, content, score }) => {
        try{
            const response = await axios.post("/api/hotelComment",{
            hotel_id,
            user_id,
            content,
            score,
            },{
            headers: { Authorization: `Bearer ${getToken()}` },
            });
            console.log(response.data);
            return response.data;
        }catch (error) {
            console.log(error);
        }}
)

export const fetchComments = createAsyncThunk(
    "comments/fetchComments",
    async (hotelId) => {
        try{
            const response = await axios.get(`/api/hotelComments/${hotelId}`);
            console.log(response.data);
            if (response.data) {
                return { hotelId, comments: response.data };
            } else {
                throw new Error('No data');
            }
        } catch (error) {
            console.log(error);
        }}
)

export const fetchUserComments = createAsyncThunk(
    "comments/fetchUserComments",
    async({user_id}) => {
        try{
            const response = await axios.get(`/api/userComments/${user_id}`);
            console.log('fetchUserComments',response.data);
            if (response.data) {
                return { comments: response.data };
            } else {
                throw new Error('No data');
            }
        } catch (error) {
            console.log(error);
        }}
)

export const updateComments = createAsyncThunk(
    "comments/updateComments",
    async ({comment_id, content, score}) => {
        try {
            const response = await axios.put(`/api/hotelComments/${comment_id}`, {content,score},
            {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            console.log(response);
            return response.data;
        }catch(error){
            console.log(error);
        }
    }
)

export const deleteComments = createAsyncThunk(
    "comments/deleteComments",
    async ({comment_id}) => {
        try {
            const response = await axios.delete(`/api/hotelComments/${comment_id}`, {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            console.log(response);
            return response.data;
        }catch(error){
            console.log(error);
        }
    }
)

const commentSlice = createSlice({
    name:'comment',
    initialState:initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(fetchComments.fulfilled, (state, action)=> {
            state.comments = {...state.comments};
            state.comments[action.payload.hotelId] = action.payload.comments;
        })
        .addCase(fetchUserComments.fulfilled, (state, action)=> {
            state.comments = {...state.comments};
            state.comments['user'] = action.payload.comments;
        })
        .addCase(updateComments.fulfilled, (state, action) => {
            const { comment_id, content, score } = action.payload;
            
            for(let hotelId in state.comments){
                state.comments[hotelId] = state.comments[hotelId].map(comment =>
                    comment.id === comment_id ? {...comment, content, score} : comment
                );
            }
        })
        .addCase(deleteComments.fulfilled, (state, action)=>{
            const deletedCommentId = action.payload.comment_id;

            for(let hotelId in state.comments){
                state.comments[hotelId] = state.comments[hotelId].filter(comment =>
                    comment.id !== deletedCommentId
                    )
                }
        })
    }
});

export default commentSlice.reducer;