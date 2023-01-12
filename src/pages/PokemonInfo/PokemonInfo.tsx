import { getPokemonById } from '@/api'
import { Box, Chip, CircularProgress, Container, Divider, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IPokemon } from './interface/pokemon.interface'

const PokemonInfo: React.FC = () => {
  const { id } = useParams()

  const [loading, setLoading] = useState<boolean>(true)
  const [pokemonInfo, setPokemonInfo] = useState<IPokemon | null>(null)

  const fetchPokemons = async () => {
    const pokemon = await getPokemonById(id)
    setPokemonInfo(pokemon)
    setLoading(false)
  }

  useEffect(() => {
    fetchPokemons()
  }, [id])

  return (
    <Box sx={{ width: '100%' }}>
      <Container maxWidth="xl">
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid sx={{ mt: 2 }} container columnSpacing={2}>
            <Grid item xs={6}>
              <Typography variant="h1">{pokemonInfo!.name.toUpperCase()}</Typography>
              <Divider />
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                {pokemonInfo!.types.map((item, index) => (
                  <Chip key={index} color="primary" variant="outlined" label={item.type.name.toUpperCase()} />
                ))}
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Box
                component="img"
                src={pokemonInfo!.sprites.other?.['official-artwork'].front_default}
                sx={{ width: '100%', borderRadius: '0.5em' }}
              />
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  )
}

export default PokemonInfo
