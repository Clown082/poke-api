import { getPokemonByName, getPokemonsFrom } from '@/api'
import { SearchBar } from '@/components'
import CardComponent from '@/components/PokemonCard/pokemonCard'
import { Box, CircularProgress, Container, Grid, Pagination, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
export interface HomeInterface {}

const Home: React.FC<HomeInterface> = () => {
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)
  const [pokemons, setPokemons] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const fetchPokemons = async () => {
    setLoading(true)
    setPokemons([])
    const pageFixed = page === 1 ? 0 : page * 20
    const { count: countPokemons, results } = await getPokemonsFrom(pageFixed, 20)
    for (const item of results) {
      const pokemonData = await getPokemonByName(item.name)
      setPokemons((currentState) => [...currentState, pokemonData])
    }
    const countFixed = Number((countPokemons / 20).toFixed(0)) - 1
    setCount(countFixed)
    setLoading(false)
  }

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const searchPokemonByName = async (pokemonName: string) => {
    setLoading(true)
    setPokemons([])
    const pokemonData = await getPokemonByName(pokemonName.toLowerCase())
    pokemonData && setPokemons([pokemonData])
    setLoading(false)
  }

  const handleChangeSearchBar = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value) {
      searchPokemonByName(event.target.value)
    } else {
      fetchPokemons()
    }
  }

  useEffect(() => {
    fetchPokemons()
  }, [page])

  return (
    <Container sx={{ my: 3 }} maxWidth={'xl'}>
      <Grid container>
        <Grid item md={3} xl={3.5} />
        <Grid item xs={12} md={6} xl={5}>
          <SearchBar handleOnChange={handleChangeSearchBar} />
        </Grid>
        <Grid item md={3} xl={3.5} />
      </Grid>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <>
            {pokemons?.length !== 0 ? (
              <Grid sx={{ my: 2 }} container spacing={2} direction="row">
                {pokemons!.map((item) => (
                  <Grid key={item.id} item xs={6} md={4} lg={3} xl={2}>
                    <CardComponent
                      id={item.id}
                      image={item.sprites.front_default || item.sprites.other['official-artwork'].front_default}
                      name={item.name}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography>No data found</Typography>
            )}
          </>
          <Stack alignItems="center" mb={2}>
            <Pagination variant="outlined" color="primary" count={count} page={page} onChange={handleChangePage} />
          </Stack>
        </>
      )}
    </Container>
  )
}

export default Home
