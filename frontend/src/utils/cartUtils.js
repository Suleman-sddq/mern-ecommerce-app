
export const addDecimals = (item) => {
   return (Math.round(item * 100) / 100).toFixed(2)
}



export const UpdateCart = (state) => {


   // Calulate Items price
   state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))

   // Calulate Shipping price. (If order is over Rs.2000 then free. else Rs.200)
   state.shippingPrice = addDecimals(state.itemsPrice > 2000 ? 0 : 200)

   // Calulate Tax price. (15% tax)
   state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice))

   // Calulate Total price
   state.totalPrice = (
      Number(state.itemsPrice) +
      Number(state.shippingPrice) +
      Number(state.taxPrice)).toFixed(2)

   localStorage.setItem('cart', JSON.stringify(state))

   return state
}