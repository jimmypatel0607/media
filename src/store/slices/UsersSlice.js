import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../thunks/fetchUser";
import { addUser } from "../thunks/addUser";
import { removeUser } from "../thunks/removeUser";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    extraReducers(builder) {
        builder.addCase(fetchUser.pending, (state,action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUser.fulfilled, (state,action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchUser.rejected, (state,action) => {
            state.isLoading = false;
            state.error = action.error;
        });
        builder.addCase(addUser.pending, (state,action) => {
            state.isLoading = true;
        });
        builder.addCase(addUser.fulfilled, (state,action) => {
            state.isLoading = false;
            state.data.push(action.payload);
        });
        builder.addCase(addUser.rejected, (state,action) => {
            state.isLoading = false;
            state.error = action.error;
        });

        builder.addCase(removeUser.pending, (state,action)=>{
            state.isLoading=true;
        });
        builder.addCase(removeUser.fulfilled, (state,action)=>{
            state.isLoading=false;
            state.data = state.data.filter(user => {
                return user.id !== action.payload.id;
            });
        });
        builder.addCase(removeUser.rejected, (state,action)=>{
            state.isLoading=false;
            state.error=action.error;
        });
    }
});

export const usersReducer = usersSlice.reducer;