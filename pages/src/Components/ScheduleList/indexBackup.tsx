import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { TimeListProps } from '../../Interfaces/interfaces';
import { ArrengedProps } from '../DateSection';
import * as S from './styles';

export interface ScheduleListProps {
  timeList: ArrengedProps[],
  fullDate: string,
  quadra: string,
  local: string
}



export const ScheduleList = ({timeList, fullDate, quadra, local}: ScheduleListProps) => {
  const firebaseConfig = {
    apiKey: "AIzaSyAcmFecmRXUIfVF6vyVkcVANylCRlXKO1A",
    authDomain: "penareia-556b0.firebaseapp.com",
    databaseURL: "https://penareia-556b0-default-rtdb.firebaseio.com",
    projectId: "penareia-556b0",
    storageBucket: "penareia-556b0.appspot.com",
    messagingSenderId: "91475408651",
    appId: "1:91475408651:web:d509ec594fad45f372940e",
    measurementId: "G-PTXZYEY6WB"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  //const analytics = getAnalytics(app);
  const db = getFirestore(app)
  

  const [scheduledTimeList, setScheduledTimeList] = useState<ArrengedProps[]>(TimeListProps)
  const [openButton, setOpenButton] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  

  useEffect(() => {
    const filterSelected = scheduledTimeList.map((item)=>{
     return(item.selected)
    })
    const filterOpenButton = filterSelected.filter(value => value === true)
    if(filterOpenButton.length>0){
      setOpenButton(true)
    }else{
      setOpenButton(false)
    }
    console.log(timeList)
    const filterId = timeList.map((item)=>{
      return(item.id)
    })
    const resetFilters = scheduledTimeList.map((item)=>{
      return(item.reservado)
    })
    async function resetData(){
      scheduledTimeList.map((item)=>{item.reservado=false})
      const filteredList = scheduledTimeList.filter(({id})=> filterId.includes(id))
      if(filteredList.length>0){
        filteredList.map((item, index)=> { 
            item.reservado = true
            item.selected = false
        })
        
      }else if(filteredList.length===0){
        const resetScheduled = scheduledTimeList.filter(({reservado})=> resetFilters.indexOf(!reservado))
        resetScheduled.map((item, index)=> { 
            item.reservado = false          
        })
      }
    }
    
  }, [timeList, scheduledTimeList])

  

  const handleClick = (index: number) => {
    const newScheduleList = [...scheduledTimeList]
    newScheduleList[index].selected = !scheduledTimeList[index].selected
    if(newScheduleList[index].selected) {
      setOpenButton(true)
    } else {
      setOpenButton(false)
    }
    setScheduledTimeList(newScheduleList)
  }

  const handleSchedule = () => {
    const selectedMap = scheduledTimeList.map((item)=>{
      return(item)
     })
    const filterSelected = selectedMap.filter((selectedMap) => {
    return(selectedMap.selected===true)
  })
  for(let i = 0; i<=filterSelected.length; i++){
    try {
      const docRef =  setDoc(doc(db, local, quadra, fullDate, filterSelected[i].id), {
        reservado: true,
        reservadoPor: firebase.auth().currentUser?.displayName,
        email: firebase.auth().currentUser?.email
      });
    } catch (error){
      console.log(error)
    }
    }
  }

  const openModal = () => {
    setModalOpen(true)
  }

  return (
    <S.Wrapper>
      <S.AditionalDiv>
      {!!scheduledTimeList && scheduledTimeList.map((item, index) => {
        return( 
          <S.ListWrapper key={index}>
              <S.ListBox disabled={item.reservado} onClick={()=> {handleClick(index)}}>
                {!!item.selected && <S.CheckIcon><svg xmlns="http://www.w3.org/2000/svg" fill='green' width="24" height="24" viewBox="0 0 24 24"><path d="M23.334 11.96c-.713-.726-.872-1.829-.393-2.727.342-.64.366-1.401.064-2.062-.301-.66-.893-1.142-1.601-1.302-.991-.225-1.722-1.067-1.803-2.081-.059-.723-.451-1.378-1.062-1.77-.609-.393-1.367-.478-2.05-.229-.956.347-2.026.032-2.642-.776-.44-.576-1.124-.915-1.85-.915-.725 0-1.409.339-1.849.915-.613.809-1.683 1.124-2.639.777-.682-.248-1.44-.163-2.05.229-.61.392-1.003 1.047-1.061 1.77-.082 1.014-.812 1.857-1.803 2.081-.708.16-1.3.642-1.601 1.302s-.277 1.422.065 2.061c.479.897.32 2.001-.392 2.727-.509.517-.747 1.242-.644 1.96s.536 1.347 1.17 1.7c.888.495 1.352 1.51 1.144 2.505-.147.71.044 1.448.519 1.996.476.549 1.18.844 1.902.798 1.016-.063 1.953.54 2.317 1.489.259.678.82 1.195 1.517 1.399.695.204 1.447.072 2.031-.357.819-.603 1.936-.603 2.754 0 .584.43 1.336.562 2.031.357.697-.204 1.258-.722 1.518-1.399.363-.949 1.301-1.553 2.316-1.489.724.046 1.427-.249 1.902-.798.475-.548.667-1.286.519-1.996-.207-.995.256-2.01 1.145-2.505.633-.354 1.065-.982 1.169-1.7s-.135-1.443-.643-1.96zm-12.584 5.43l-4.5-4.364 1.857-1.857 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.642z"/></svg></S.CheckIcon>}
                <S.TimeSection>{item.id}</S.TimeSection>
                <S.InfoSection style={{color: item.reservado ? 'red' : 'green'}}>
                  {item.reservado ? 'Agendado' : 'Livre'}
                </S.InfoSection>
              </S.ListBox>
          </S.ListWrapper>
        )
      })}
      </S.AditionalDiv>
      {!!openButton && <S.ScheduleButton onClick={openModal}>AGENDAR</S.ScheduleButton>}
      {!!modalOpen && 
        <S.ConfirmModal>
          <S.ModalSummary>
            <span>Deseja confirmar seu(s) horário(s)?</span>
            {scheduledTimeList.map((item, index)=>{
            return (<div key={index}>
             {!!item.selected &&  <span>{fullDate} - {item.id}</span>}
              </div>)
             })}
          </S.ModalSummary>
          <S.ButtonSection>
            <S.ConfirmButton onClick={handleSchedule}>SIM</S.ConfirmButton>
            <S.DenyButton onClick={() => setModalOpen(false)}>NÃO</S.DenyButton>
          </S.ButtonSection>
          
        </S.ConfirmModal>
      }
      
    </S.Wrapper>
  )
}