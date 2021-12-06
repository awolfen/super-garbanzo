import { createSlice } from "@reduxjs/toolkit";

const initialState = { isCartVisible: false, notification: null };

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleIsCart(state) {
            state.isCartVisible = !state.isCartVisible;
        },
        showNotification(state, action) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                msg: action.payload.msg
            };
        }
    }
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;