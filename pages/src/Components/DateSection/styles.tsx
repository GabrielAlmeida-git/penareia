import styled, { css } from 'styled-components'


export const Wrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-top: 50px;
width: 100%;
height: 90vh;
`

export const MonthSection = styled.div`
display: flex;
`

export const DateList = styled.div`
width: 40%;
height: 120px;
display: flex;
overflow-x: scroll;
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 20px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 20px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
} 
`

export const DateButton = styled.button`
${({theme}) => css`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: #fff;
border-radius: 50%;
padding: 25px;
margin: 10px;
width: 50px;
height: 50px;
:focus{
background-color: ${theme.colors.secondary};
color: #fff
}
`}`


export const PreviousArrow = styled.svg`
margin-right: 10px;
`

export const NextArrow = styled.svg`
margin-left: 10px;
`

export const ScheduleList = styled.div`
width: 100%;
height: 100vh;
`
