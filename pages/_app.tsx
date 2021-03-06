import 'firebase/compat/auth';
import type { AppProps } from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import '../styles/globals.css';
import theme from './src/utils/styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return ( 
  <ThemeProvider theme={theme}><Component {...pageProps} /></ThemeProvider>

  )
}

export default MyApp
