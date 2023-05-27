import { configureStore } from "@reduxjs/toolkit";
import machineSlice from "./machineSlice";

export const store = configureStore({
  reducer: {
    machine: machineSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
