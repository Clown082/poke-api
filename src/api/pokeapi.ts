import { instance } from './base.api'

export const getPokemons = async () => {
  try {
    const { data } = await instance.get('pokemon/')
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getPokemonsFrom = async (offset: number, limit: number) => {
  try {
    const { data } = await instance.get(`pokemon/?offset=${offset}&limit=${limit}`)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getPokemonsWithLimit = async (limit: number) => {
  try {
    const { data } = await instance.get(`pokemon/?limit=${limit}`)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getPokemonByName = async (pokemonName: string) => {
  try {
    const { data } = await instance.get(`pokemon/${pokemonName}`)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getPokemonById = async (pokemonId: string | undefined) => {
  try {
    const { data } = await instance.get(`pokemon/${pokemonId}`)
    return data
  } catch (error) {
    console.log(error)
  }
}

