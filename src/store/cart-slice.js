import { createSlice } from "@reduxjs/toolkit";

import { uiActions } from "./ui-slice";

const initialState = {
    items: [],
    totalQuantity: 0,
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
        }
    }
});

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                status: "pending",
                title: "Sending...",
                msg: "Sending cart data"
            })
        );

        const sendRequest = async () => {
            const response = await fetch('https://redux-cart-6ff74-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
                method: 'PUT',
                body: JSON.stringify(cart)
            });

            if (!response.ok) {
                throw new Error('Sending cart failed');
            }
        };

        try {
            await sendRequest();
            dispatch(
                uiActions.showNotification({
                    status: "success",
                    title: "Success!",
                    msg: "Sent cart data succesfully"
                })
            );
        } catch (err) {
            dispatch(
                uiActions.showNotification({
                    status: "error",
                    title: "Error!",
                    msg: "Sending cart data failed!"
                })
            );
        }


    };
};

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;