import { getItem, setItem } from '@/utils/localStorage'
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'

interface createUserState {
  id: string
  username: string
  password: string
}

interface deleteUserState {
  id: string
}

const initialState: createUserState[] = getItem('users') || []

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<createUserState>) => {
      const { id } = action.payload
      const currentState = current(state)
      if (currentState.length === 0 || currentState.filter((item) => item.id === id).length === 0) {
        state.push(action.payload)
        setItem('users', [...currentState, action.payload])
      }
    },
    deleteUser: (state, action: PayloadAction<deleteUserState>) => {
      const { id } = action.payload
      const currentState = current(state)
      if (currentState.some((item) => item.id === id)) {
        const newState = currentState.filter((item) => item.id !== id)
        setItem('users', newState)
        return (state = newState)
      }
    },
  },
})

export const { createUser, deleteUser } = userSlice.actions
