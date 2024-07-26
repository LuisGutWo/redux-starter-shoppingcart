import { createSlice } from "@reduxjs/toolkit";

// Define el estado inicial desde localStorage
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

    //Slice para agregar al carro
    addToCart: (store, action) => {
      const { id, title, price, image } = action.payload;
      // Check if the item already exists in the cart
      const existingItem = store.find((item) => item.id === id);

      if (existingItem) {
        // If the item exists, update the quantity
        existingItem.qty += 1;
      } else {
        // If the item doesn't exist, add it to the cart
        store.push({ id, title, price, qty: 1, image });
      }

      saveState(store, action);

      return store;
    },
    removeFromCart: (store, action) => {
      const cartId = action.payload;
      const existingItem = store.find((item) => item.id === cartId);
      if (existingItem) {
        if (existingItem.qty > 1) {
          existingItem.qty -= 1;
        } else {
          store = store.filter((item) => item.id !== cartId);
        }
        saveState(store, action);

        return store;
      }
    },
    incrementQty: (store, action) => {
      const cartId = action.payload;
      const cartItem = store.find((item) => item.id === cartId);
      if (cartItem) {
        cartItem.qty += 1;
        saveState(store);
      }
      return store;
    },
    decrementQty: (store, action) => {
      const cartId = action.payload;
      const idx = store.findIndex((item) => item.id === cartId);
      if (idx !== -1) {
        const cartItem = store[idx];
        if (cartItem) {
          cartItem.qty -= 1;
        } else {
          store.splice(idx, 1);
        }
      }

      saveState(store);
      return store;
    },
  },
});

//export the reducers(actions)
export const { addToCart, removeFromCart, incrementQty, decrementQty } =
  cartSlice.actions;
export default cartSlice.reducer;
