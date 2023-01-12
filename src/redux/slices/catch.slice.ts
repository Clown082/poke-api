import { getItem, setItem } from '@/utils/localStorage'
import { current, PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface userCatch {
  userId: string | number
  catch: CatchPokemonState[]
}

interface CatchPokemonState {
  pokemonId: string | number
  name: string
  image: string
}

interface releasePokemonState {
  userId: string | number
  pokemonId: string | number
}

const initialState: userCatch[] = getItem('catches') || []

export const catchSlice = createSlice({
  name: 'catches',
  initialState,
  reducers: {
    catchPokemon: (state, action: PayloadAction<userCatch>) => {
      const { userId, catch: newCatch } = action.payload
      const currentState = current(state)
      if (currentState.length === 0 || !currentState.some((item) => item.userId === userId)) {
        setItem('catches', [...currentState, action.payload])
        state.push(action.payload)
      } else {
        const newState = currentState.map((item) =>
          item.userId === userId ? { ...item, catch: [...item.catch, ...newCatch] } : item
        )
        setItem('catches', newState)
        return (state = newState)
      }
    },
    releasePokemon: (state, action: PayloadAction<releasePokemonState>) => {
      const { userId, pokemonId } = action.payload
      const currentState = current(state)
      const newState = currentState.map((item) =>
        item.userId === userId ? { ...item, catch: [...item.catch.filter((v) => v.pokemonId !== pokemonId)] } : item
      )
      setItem('catches', newState)
      return (state = newState)
    },
  },
})

export const { catchPokemon, releasePokemon } = catchSlice.actions
