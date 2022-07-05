import 'firebase/firestore';
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '../../../../firebaseConfig';
import { FiresotreConverter } from '../../../Home';
import { ScheduleListBackup } from '../ScheduleList/indexBackup';
import * as S from './styles';


export interface listDaysProps  {
  status: boolean,
  weekday: string,
  number: number,
  fullDate: string
}

export interface ArrengedProps {
  id: string,
  reservado: boolean,
  reservadoPor: string,
  selected: boolean
}

export interface Quadras {
  data: ArrengedProps[]
}

const DateSectionBackup = () => {

  const [selectedYear, setSelectedYear] = useState(0)
  const [selectedMonth, setSelectedMonth] = useState(0)
  const [selectedDay, setSelectedDay] = useState(0)
  const [fullDate, setFullDate] = useState('')
  const [listDays, setListDays] = useState<listDaysProps[]>()
  const [openTime, setOpenTime] = useState(false)
  const [timeList, setTimeList] = useState<ArrengedProps[]>()
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
  const [selectedButton, setSelectedButton] = useState(false)
  const [quadra, setQuadra] = useState('')
  const [local, setLocal] = useState('')

  const router = useRouter()
  const quadraString = router.asPath.split('=')[2]
  const localString = router.asPath.split('=')[1]

  useEffect(()=> {
    setQuadra(quadraString)
    setLocal(localString)
  }, [quadraString, localString])



  useEffect(() =>{
    let daysInMonth = new Date(selectedYear, selectedMonth+1, 0).getDate();
    let newListDays = [];
    for(let i = selectedDay; i <= daysInMonth; i++){
      let d = new Date(selectedYear, selectedMonth, i)
      let weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'] ;

      newListDays.push({
        status: false,
        weekday: weekDays[d.getDay()],
        number: i, 
        fullDate: String(i).padStart(2, '0')+'-'+String(selectedMonth).padStart(2, '0')+'-'+selectedYear
      })
    }
    setListDays(newListDays)
  }, [selectedDay, selectedYear, selectedMonth])
  
  useEffect(() => {
    const today = new Date()
    setSelectedYear( today.getFullYear())
    setSelectedMonth( today.getUTCMonth())
    setSelectedDay( today.getDate())
  }, []);


  const handleDateClick = ((fulldate: string)=>{
      fetchData()
        async function fetchData() {
         const dateNow = new Date
         const timeListing = []
         for(let i = 8; i<=21; i++){
           const timeArrenged = String(i).padStart(2, '0')+' as '+String(i+1).padStart(2, '0')
          const docRef = doc(db, local, quadra, fulldate, timeArrenged ).withConverter(FiresotreConverter<ArrengedProps>());
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            const callback = docSnap.data();
            timeListing.push(callback)
          } else {
            //console.log('Livre');
          }
         }
         setTimeList(timeListing)
         setFullDate(fulldate)
       }
      setOpenTime(true)
      setSelectedButton(true)
  })

  const NextMonth = () => {
    if(selectedMonth == 11){
      setSelectedMonth(0)
      setSelectedYear(selectedYear+1)
      setSelectedDay(1)
    } else {
       setSelectedMonth(selectedMonth+1)
       setSelectedDay(1)
    }
    reorganizaDatas()
  }

  const PreviousMonth = () => {
    if(selectedMonth == 0){
      setSelectedYear(selectedYear-1)
      setSelectedMonth(11)
      setSelectedDay(1)
    }else {
      setSelectedMonth(selectedMonth-1)
      setSelectedDay(1)
    }
    reorganizaDatas()
  }

  const reorganizaDatas = () => {
    let daysInMonth = new Date(selectedYear, selectedMonth+1, 0).getDate();
    let newListDays = [];
    for(let i = selectedDay; i <= daysInMonth; i++){
      let d = new Date(selectedYear, selectedMonth, i)
      let weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'] ;

      newListDays.push({
        status: false,
        weekday: weekDays[d.getDay()],
        number: i,
        fullDate: String(i).padStart(2, '0')+'-'+String(selectedMonth).padStart(2, '0')+'-'+selectedYear
      })
    }
    setListDays(newListDays)
  }

return(
  <S.Wrapper>
      <S.MonthSection>
      <S.PreviousArrow onClick={PreviousMonth} width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm-4.828 11.5l4.608 3.763-.679.737-6.101-5 6.112-5 .666.753-4.604 3.747h11.826v1h-11.828z"/></S.PreviousArrow>
        {months[selectedMonth]} {selectedYear}
        <S.NextArrow onClick={NextMonth} width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12 0c-6.623 0-12 5.377-12 12s5.377 12 12 12 12-5.377 12-12-5.377-12-12-12zm0 1c-6.071 0-11 4.929-11 11s4.929 11 11 11 11-4.929 11-11-4.929-11-11-11zm4.828 11.5l-4.608 3.763.679.737 6.101-5-6.112-5-.666.753 4.604 3.747h-11.826v1h11.828z"/></S.NextArrow>
      </S.MonthSection>
     <S.DateList>
       {!!listDays && listDays.map((item)=>{
         return(
           <S.DateButton key={item.number} onClick={() => {handleDateClick(item.fullDate)}}>
             <div>{String(item.number).padStart(2, '0')}</div>
           <div>{item.weekday}</div>
           </S.DateButton>
         )
       })}
     </S.DateList>
     <S.ScheduleList>
     {!!openTime && !!timeList &&   
      <ScheduleListBackup  timeList={timeList} fullDate={fullDate} quadra={quadra} local={local}/>
     }
       </S.ScheduleList>
    
  </S.Wrapper>
)
}
export default DateSectionBackup