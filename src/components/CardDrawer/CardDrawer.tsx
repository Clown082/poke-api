import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { releasePokemon } from '@/redux/slices/catch.slice'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { Button, Card, CardActions, CardContent, CardMedia, Divider, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface CardDrawerProps {
  id: string | number
  image: string
  name: string
  handleStateViewDrawer: () => void
}

const CardDrawer: React.FC<CardDrawerProps> = ({ id, image, name, handleStateViewDrawer }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const authUser = useAppSelector((state) => state.authReducer)

  const handleRemoveToCart = () => {
    dispatch(releasePokemon({ userId: authUser.id!, pokemonId: id }))
  }

  const handleMoreInfo = () => {
    navigate(`/pokemon-info/${id}`)
    handleStateViewDrawer()
  }
  return (
    <Card sx={{ display: 'flex', my: 2 }}>
      <CardMedia component="img" sx={{ width: 151 }} image={image} alt="pokemon" />
      <Grid container sx={{ mx: 1 }}>
        <Grid item xs={9} m="auto">
          <CardContent>
            <Typography variant="h5" textAlign="left">
              {name.toUpperCase()}
            </Typography>
            <Divider sx={{ mb: 1 }} />
            <Button fullWidth variant="contained" size="small" onClick={handleMoreInfo}>
              More Info
            </Button>
          </CardContent>
        </Grid>
        <Grid item xs={2}>
          <CardActions>
            <IconButton onClick={handleRemoveToCart}>
              <CloseRoundedIcon />
            </IconButton>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  )
}

export default CardDrawer
