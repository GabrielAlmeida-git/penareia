import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
margin-top: 25px;
margin-bottom: 25px;
height: 70vh;
`

export const AditionalDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 70%;
margin-top: 25px;
margin-bottom: 25px;
overflow-y: scroll;
::-webkit-scrollbar {
  width: 15px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 30px;
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



export const ListWrapper = styled.div`
display: flex;
margin-top: 2px;
width: 90%;
`



export const ListBox = styled.button`
display: flex;
justify-content: flex-start;
align-items: center;
background-color: #fff;
margin-top: 10px;
width: 100%;
height: 40px;
padding: 10px;
margin-bottom: 5px;
border-radius: 10px;
`

export const CheckIcon = styled.div`
color: green;
`

export const TimeSection = styled.div`
display: flex;
width: 50%;
padding-left: 10px;
`

export const InfoSection = styled.div`
font-weight: 600;
display: flex;
justify-content: flex-end;
width: 50%;
`

export const ScheduleButton = styled.button`
${({theme}) => css`
height: 50px;
width: 150px;
border-radius: 10px;
background-color: ${theme.colors.primary};
color: ${theme.colors.white};
`}
`

export const ConfirmModal = styled.div`
    background-color: white;
    border: 1px solid blue;
    position: fixed;
    width: 50%;
    height: 300px;
    color: black;
`


export const ModalSummary = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`

export const ButtonSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 150px;
`

export const ConfirmButton = styled.button`
width: 100px;
height: 40px;
background-color: green;
color: #fff;
border: 0;
border-radius: 10px;
margin-right: 5px;
`

export const DenyButton = styled.button`
width: 100px;
height: 40px;
background-color: red;
color: #fff;
border: 0;
border-radius: 10px;
margin-left: 5px;
`