import { initializeApp } from "firebase/app";
import 'firebase/firestore';
import { doc, getDoc, getFirestore, QueryDocumentSnapshot, SnapshotOptions, WithFieldValue } from "firebase/firestore";
import Router from "next/router";
import { useEffect, useState } from "react";
import * as S from './styles';

export type DocumentData = {[field: string]: any};

export interface DateProps {
  horario: string,
  reservado: boolean
}

export interface Locais {
  Locais: Array<string>
}

export const FiresotreConverter = <T extends Record<string, any>> () => ({
  toFirestore({id, ...data}: WithFieldValue<T>): DocumentData {
    return data;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<T>,
    options: SnapshotOptions
  ): T {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      ...data,
    };
  },
});


 const HomePage = () => {
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

  const [quadras, setQuadras] = useState([''])

  


  useEffect(() => {
     async function fetchData() {
      const docRef = doc(db, 'Locais', 'Locais').withConverter(FiresotreConverter<Locais>());
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const callback = docSnap.data();
        setQuadras(callback.Locais)
        console.log(callback.Locais)
      } else {
        console.log('no such document');
      }
    }

     fetchData()
  }, [db])
  

  const callCourts = (item: string) => {
    Router.push('/CourtsPage?='+item)
  }



  return( 
    <S.Wrapper>
      <S.QuadrasSection>
        {!!quadras && quadras.map((item, index) => {
          return(
              <S.QuadraWrapper key={index} onClick={()=> {callCourts(item)}}>
                <S.QuadraTitle>
                {item}
                </S.QuadraTitle>
                <S.LocationBox>
                  teste
                </S.LocationBox>
              </S.QuadraWrapper>
          )
        })}
      </S.QuadrasSection>
    </S.Wrapper>
  )
} 
export default HomePage