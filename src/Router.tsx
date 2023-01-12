import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { RouterLayout } from './components'
import { Home, Login, PokemonInfo, Register, Users } from './pages'

export const AppRouter: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/" element={<RouterLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon-info/:id" element={<PokemonInfo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<Users />} />
      </Route>
    </Routes>
  )
}
