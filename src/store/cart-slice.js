import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalQuantity: 0,
    changed: false
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart(state, action) {
            const item = action.payload;
            const existingItem = state.items.find(i => i.id === item.id);
            if (!existingItem) {
                state.items.push({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: 1,
                    totalPrice: item.price
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + existingItem.price;
            }
            state.totalQuantity++;
            state.changed = true;
        },
        removeItemFromCart(state, action) {
            const item = action.payload;
            const existingItem = state.items.find(i => i.id === item.id);
            if (!existingItem) { return; }
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(i => i.id !== item.id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
            state.totalQuantity--;
            state.changed = true;
        },
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        }
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;