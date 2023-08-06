import { createSlice } from "@reduxjs/toolkit";
import { UpdateCart } from '../utils/cartUtils.js'



const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addToCart: (state, action) => {
         const item = action.payload;

         const itemExist = state.cartItems.find((i) => i._id === item._id);

         if (itemExist) {
            state.cartItems = state.cartItems.map((x) => {
               return x._id === itemExist._id ? item : x
            })
         } else {
            state.cartItems = [...state.cartItems, item]
         }

         // Calculate prices
         return UpdateCart(state)

      },
      removeFromCart: (state, action) => {
         state.cartItems = state.cartItems.filter((item) => item._id !== action.payload)

         // Calculate prices
         return UpdateCart(state)
      },
      saveShippingAddress: (state, action) => {
         state.shippingAddress = action.payload;
         return UpdateCart(state)
      },
      savePaymentMethod: (state, action) => {
         state.paymentMethod = action.payload;
         return UpdateCart(state)
      },
      clearCartItems: (state, action) => {
         state.cartItems = []
         return UpdateCart(state)
      },
   }
})

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems } = cartSlice.actions
export default cartSlice.reducer