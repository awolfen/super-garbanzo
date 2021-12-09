import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice"

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                'https://redux-cart-6ff74-default-rtdb.europe-west1.firebasedatabase.app/cart.json'
            );

            if (!response.ok) {
                throw new Error('Could not fetch cart data!')
            }

            const data = await response.json();

            return data;
        };

        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity
            }));
        } catch (err) {
            dispatch(
                uiActions.showNotification({
                    status: "error",
                    title: "Error!",
                    msg: "Fetching cart data failed!"
                })
            )
        }
    }
};


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
                body: JSON.stringify({
                    items: cart.items,
                    totalQuantity: cart.totalQuantity
                })
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
