import { useNotification } from '@/context/notification.context'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { catchPokemon } from '@/redux/slices/catch.slice'
import { setItem } from '@/utils/localStorage'
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export interface CardInterface {
  id: number
  image: string
  name: string
}

const PokemonCard: React.FC<CardInterface> = ({ id, image, name }) => {
  const [disableButton, setDisableButton] = useState<boolean>(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { getError } = useNotification()
  const authUser = useAppSelector((state) => state.authReducer)

  const handleCatchPokemon = () => {
    if (authUser.id) {
      dispatch(
        catchPokemon({
          userId: authUser.id,
          catch: [{ pokemonId: id, name, image }],
        })
      )
    } else {
      getError('No user logged in')
    }
  }

  const catchState = useAppSelector((state) => state.catchReducer)
  const itemExist = authUser && catchState.find((item) => item.userId === authUser.id)

  useEffect(() => {
    if (itemExist) {
      setDisableButton(itemExist.catch.some((item) => item.pokemonId === id))
    }
    setItem('catches', catchState)
  }, [itemExist, id])

  return (
    <Card sx={{ display: 'grid', minHeight: '18rem' }}>
      <CardMedia component="img" image={image} alt="pokemon" sx={{ width: '50%', m: 'auto' }} />
      <CardContent sx={{ display: 'flex' }}>
        <Typography variant="h5" textAlign="center" alignSelf="center" m="auto">
          {name.toUpperCase()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button fullWidth variant="contained" size="small" onClick={() => navigate(`/pokemon-info/${id}`)}>
          More Info
        </Button>
        {authUser && (
          <Button fullWidth variant="outlined" size="small" onClick={handleCatchPokemon} disabled={disableButton}>
            Catch
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

export default PokemonCard
