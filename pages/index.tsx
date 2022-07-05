import type { NextPage } from 'next'
import styled, { css } from 'styled-components'
import * as S from '.'
import HomePage from './Home'
import { Header } from './src/Components/Header'

const Home: NextPage = () => {
  return (
    <S.PageWrapper>
      <Header />
      <HomePage />    
    </S.PageWrapper>
  )
}

export default Home


export const PageWrapper = styled.div`
${({theme}) => css`
background-color: ${theme.colors.bgLightBlue};
color: ${theme.colors.white};
height: 100vh;
`}
`
