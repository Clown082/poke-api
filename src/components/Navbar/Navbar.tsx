import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { logoutUser } from '@/redux/slices/auth.slice'
import { setItem } from '@/utils/localStorage'
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon'
import { AppBar, Badge, Box, Button, Container, Grid, IconButton, Stack, Toolbar } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CatchDrawer } from '../CatchDrawer'

export interface NavbarInterface {}

const Navbar: React.FC<NavbarInterface> = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const authUser = useAppSelector((state) => state.authReducer)
  const catches = useAppSelector((state) => state.catchReducer)
  const catchesFilteredByUserId = authUser && catches.find((item) => item.userId === authUser.id)
  const [open, setOpen] = React.useState<boolean>(false)

  const handleStateViewDrawer = () => {
    setOpen((state) => !state)
  }

  const handleLogout = () => {
    setItem('loginUser', null)
    dispatch(logoutUser())
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Container maxWidth="xl">
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
              <Grid item xs={6} alignItems="initial">
                <IconButton onClick={() => navigate('/')}>
                  <Box
                    component="img"
                    sx={{
                      height: 'auto',
                      maxHeight: 64,
                      margin: 'auto',
                    }}
                    alt="pokeapi-logo"
                    src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
                  />
                </IconButton>
              </Grid>
              <Grid item xs={6}>
                <Stack direction="row" spacing={2} justifyContent="end">
                  {authUser ? (
                    <>
                      <IconButton color="primary" onClick={() => handleStateViewDrawer()}>
                        <Badge color="primary" badgeContent={catchesFilteredByUserId?.catch.length}>
                          <CatchingPokemonIcon color="error" />
                        </Badge>
                      </IconButton>
                      <Button variant="contained" onClick={handleLogout}>
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Button variant="contained" onClick={() => navigate('Login')}>
                      Login
                    </Button>
                  )}
                  <Button variant="outlined" onClick={() => navigate('Register')}>
                    Register
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
      <CatchDrawer open={open} handleStateViewDrawer={handleStateViewDrawer} />
    </Box>
  )
}

export default Navbar
