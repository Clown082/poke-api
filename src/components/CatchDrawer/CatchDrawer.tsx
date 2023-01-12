import { useAppSelector } from '@/redux/hooks'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { Box, Divider, Drawer, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import { CardDrawer } from '../CardDrawer'

interface CatchDrawerProps {
  open: boolean
  handleStateViewDrawer: () => void
}

const CatchDrawer: React.FC<CatchDrawerProps> = ({ open, handleStateViewDrawer }) => {
  const authUser = useAppSelector((state) => state.authReducer)
  const catches = useAppSelector((state) => state.catchReducer)
  const catchesFilteredByUserId = authUser && catches.find((item) => item.userId === authUser.id)

  return (
    <Drawer anchor={'right'} open={open} onClose={handleStateViewDrawer}>
      <Box sx={{ width: '25em', p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Caught Pokemons</Typography>
          <IconButton color="primary" onClick={() => handleStateViewDrawer()}>
            <CloseRoundedIcon />
          </IconButton>
        </Stack>
        <Divider sx={{ my: 1.5 }} />
        {catchesFilteredByUserId?.catch.length
          ? catchesFilteredByUserId.catch.map(({ pokemonId, image, name }) => (
              <CardDrawer
                key={pokemonId}
                id={pokemonId}
                image={image}
                name={name}
                handleStateViewDrawer={handleStateViewDrawer}
              />
            ))
          : 'Empty list'}
      </Box>
    </Drawer>
  )
}

export default CatchDrawer
