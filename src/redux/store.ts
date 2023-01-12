import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/auth.slice'
import { catchSlice } from './slices/catch.slice'
import { userSlice } from './slices/user.slice'

export const store = configureStore({
  reducer: {
    catchReducer: catchSlice.reducer,
    userReducer: userSlice.reducer,
    authReducer: authSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
