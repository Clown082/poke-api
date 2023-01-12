import { InputBase, Paper } from '@mui/material'
import React from 'react'

export interface SearchBarInterface {
  handleOnChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const SearchBar: React.FC<SearchBarInterface> = ({ handleOnChange }) => {
  return (
    <Paper component="form" sx={{ p: '8px 10px', display: 'flex', alignItems: 'center', width: '100%' }}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Pokemon..."
        inputProps={{ 'aria-label': 'search pokemon' }}
        onChange={handleOnChange}
      />
    </Paper>
  )
}

export default SearchBar
