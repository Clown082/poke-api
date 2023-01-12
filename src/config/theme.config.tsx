import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'

type ThemeProp = {
  children: JSX.Element
}

export enum themePalette {
  BG = '#12181b',
  POKE_YELLOW = '#FFCB05',
  POKE_BLUE = '#3D7DCA',
  FONT_GLOBAL = "'JetBrains Mono', monospace",
  //Alert styles
  ERROR_MAIN = '#f44336',
  BG_ERROR_MAIN = 'rgba(244,67,54,0.1)',
  SUCCESS_MAIN = '#66bb6a',
  BG_SUCCESS_MAIN = 'rgba(102,187,106,0.1)',
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: themePalette.BG,
    },
    primary: {
      main: themePalette.POKE_YELLOW,
    },
    secondary: {
      main: themePalette.POKE_BLUE,
    },
  },
  typography: {
    fontFamily: themePalette.FONT_GLOBAL,
  },
  components: {
    MuiButton: {
      defaultProps: {
        style: {
          textTransform: 'none',
          boxShadow: 'none',
          borderRadius: '0.5em',
        },
      },
    },
    MuiAlert: {
      defaultProps: {
        style: {
          borderRadius: '0.8em',
          fontSize: '1em',
        },
      },
      styleOverrides: {
        standardError: {
          border: `1 px solid ${themePalette.ERROR_MAIN}`,
          background: themePalette.BG_ERROR_MAIN,
        },
        standardSuccess: {
          border: `1 px solid ${themePalette.SUCCESS_MAIN}`,
          background: themePalette.BG_SUCCESS_MAIN,
        }
      },
    },
  },
})
export const ThemeConfig: React.FC<ThemeProp> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
