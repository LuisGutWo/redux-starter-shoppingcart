import { createSlice } from "@reduxjs/toolkit";

// Carga el estado inicial desde localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

//Guarda el estado en localStorage
const saveState = (store) => {
  try {
    const serializedState = JSON.stringify(store);
    localStorage.setItem("cart", serializedState);
  } catch {
    // ignore write errors
  }
};

// Carga el estado inicial desde localStorage
const initialState = loadState() || [];

//Create the slice with Reducers
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, title, price, image } = action.payload;
      // Check if the item already exists in the cart
      const existingItem = state.find((item) => item.id === id);

      if (existingItem) {
        // If the item exists, update the quantity
        existingItem.qty += 1;
      } else {
        // If the item doesn't exist, add it to the cart
        state.push({ id, title, price, qty: 1, image });
      }

      saveState(state);

      return state;
    },
    removeFromCart: (state, action) => {
      const cartId = action.payload;
      const existingItem = state.find((item) => item.id === cartId);
      if (existingItem) {
        if (existingItem.qty > 1) {
          existingItem.qty -= 1;
        } else {
          state = state.filter((item) => item.id !== cartId);
        }
        saveState(state);

        return state;
      }
    },
    incrementQty: (state, action) => {
      const cartId = action.payload;
      const cartItem = state.find((item) => item.id === cartId);
      if (cartItem) {
        cartItem.qty += 1;
        saveState(state);
      }
      return state;
    },
    decrementQty: (state, action) => {
      const cartId = action.payload;
      const idx = state.findIndex((item) => item.id === cartId);
      if (idx !== -1) {
        const cartItem = state[idx];
        if (cartItem.qty > 1) {
          cartItem.qty -= 1;
        } else {
          state.splice(idx, 1);
        }
      }

      saveState(state);
      return state;
    },
  },
});

//export the reducers(actions)
export const { addToCart, removeFromCart, incrementQty, decrementQty } =
  cartSlice.actions;
export default cartSlice.reducer;
