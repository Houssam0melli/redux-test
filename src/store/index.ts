import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { studiesSlice } from "./studies";

const rootReducer = combineReducers({ studies: studiesSlice.reducer });

// store
export const store = configureStore({
  reducer: rootReducer
});

// typings
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
