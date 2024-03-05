import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
// import productReducer from "./product/productSlice";
import authReducer from "./auth/authSlice"; // Import slice auth

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer, // Tambahkan reducer untuk auth
  },
});

