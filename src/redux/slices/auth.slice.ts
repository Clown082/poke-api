import { getItem, setItem } from '@/utils/localStorage'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface loginUserState {
  id?: string
  username?: string
}

const initialState: loginUserState = getItem('loginUser') || null

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<loginUserState>) => {
      setItem('loginUser', action.payload)
      return (state = action.payload)
    },
    logoutUser: () => initialState,
  },
})

export const { loginUser, logoutUser } = authSlice.actions
