import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux';

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        //get items from local storage and parse
        items: JSON.parse(localStorage.getItem('cart')) || [],
        loading: false,
        error: null,
    },
    reducers: {
        addToCart: (state, action) => {
            console.log('inside addToCartOnClick')
            //if item does not exist in cart, add it
            if(state.items.find(item => item.id === action.payload.id) === undefined){
                let currentItems = action.payload;
                currentItems= {...currentItems, selected: true}
                console.log(currentItems)
                state.items.push(currentItems);
                //cache the item in local storage
                localStorage.setItem('cart', JSON.stringify(state.items));
                console.log(JSON.parse(localStorage.getItem('cart')))
            }
            
        },
        unselectItem: (state, action) => {
            console.log('inside addToCartOnClick')
            //change property selected to true
            state.items.find(item => item.id === action.payload.id).selected = !state.items.find(item => item.id === action.payload.id).selected;
        },
        clearCart: (state, action) => {
            console.log('inside clearCart')
            state.items = [];
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        getCartFromCache: (state, action) => {
            console.log('inside getCartFromCache')
            state.items = JSON.parse(localStorage.getItem('cart'))
        }
    },
});
export default cartSlice.reducer;

export const { addToCart,clearCart, unselectItem,getCartFromCache } = cartSlice.actions;