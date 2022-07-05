import styled from 'styled-components'


export const Wrapper = styled.div`
width: 100%;
height: 93vh; /* Fallback para não-suporte a Custom Properties */
height: calc(var(--vh, 1vh) * 93);
background-color: #e9f2f9;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`