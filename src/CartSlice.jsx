import { createSlice, isPlainObject } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
	name: "cart",
	initialState: {
		items: [], // Initialize items as an empty array
		totalItems: 0
	},
	reducers: {
		addItem: (state, action) => {
			const { name, image, cost } = action.payload;
			const existingItem = state.items.find((item) => item.name === name);
			if (existingItem) {
				existingItem.quantity++;
			} else {
				state.items.push({ name, image, cost, quantity: 1 });
			}
			state.totalItems++;
		},
		removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload.name);
	  state.totalItems -= action.payload.quantity;
    },
		updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.name === name);
      if (itemToUpdate) { 
		state.totalItems += quantity - itemToUpdate.quantity;	// Increase/decrease totalItems by substracting current quantity of the item and quantity from action object
		itemToUpdate.quantity = quantity; 
	}
    },
	},
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
