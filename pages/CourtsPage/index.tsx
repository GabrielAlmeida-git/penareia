import { initializeApp } from 'firebase/app'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FiresotreConverter } from '../Home'
import { Header } from '../src/Components/Header'
import * as S from './styles'


export interface Quadras {
  Quadras: Array<string>
}

const CourtsPage = () => {
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
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app)

  const [quadra, setQuadra] = useState<String>()
  const [numQuadras, setNumQuadras] = useState([''])
  
  const router = useRouter()
  const quadraString = router.asPath.split('=')[1]

  useEffect(()=>{
    setQuadra(quadraString)
  }, [quadraString])

  useEffect(()=> {
    async function fetchData() {
      console.log(quadra)
      const docRef = doc(db, ''+quadra, ''+quadra).withConverter(FiresotreConverter<Quadras>());
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const callback = docSnap.data();
        setNumQuadras(callback.Quadras)
        console.log(callback.Quadras)
      } else {
        console.log('no such document');
      }
    }

     fetchData()
  }, [db, quadra])

  const handleClick = (item: string) => {
    Router.push('/SchedulePage?='+quadra+'='+item)
  }


return(
  <S.ExtraDiv>
  <Header/>
  <S.Wrapper>
  {!!numQuadras && numQuadras.map((item, index) => {
          return(
              <S.QuadraWrapper key={index} onClick={()=> {handleClick(item)}}>
                <S.QuadraTitle>
                {item}
                </S.QuadraTitle>
                <S.LocationBox>
                  teste
                </S.LocationBox>
              </S.QuadraWrapper>
          )
        })}
  </S.Wrapper>
  </S.ExtraDiv>
)
}

export default CourtsPage