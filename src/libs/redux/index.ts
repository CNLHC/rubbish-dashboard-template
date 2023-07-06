import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import logger from "redux-logger"
import { globalReducer } from "./global"

const rootReducer = combineReducers({
  globalReducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (g) => g().prepend(logger),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof rootReducer>
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export { store }
