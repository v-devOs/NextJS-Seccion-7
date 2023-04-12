import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { ligthTheme } from '</themes>'



export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={ ligthTheme }>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
