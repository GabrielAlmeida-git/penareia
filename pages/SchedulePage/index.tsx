import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import DateSection from '../src/Components/DateSection';
import { Header } from '../src/Components/Header';
import * as S from './styles';

const config = {
  apiKey: "AIzaSyAcmFecmRXUIfVF6vyVkcVANylCRlXKO1A",
  authDomain: "penareia-556b0.firebaseapp.com",
  databaseURL: "https://penareia-556b0-default-rtdb.firebaseio.com",
  projectId: "penareia-556b0",
  storageBucket: "penareia-556b0.appspot.com",
  messagingSenderId: "91475408651",
  appId: "1:91475408651:web:d509ec594fad45f372940e",
  measurementId: "G-PTXZYEY6WB"
};
firebase.initializeApp(config);

const SchedulePage = () => {
  
 return(
   <>
   <Header/>
    <S.Wrapper>
     <DateSection />
     <div>{firebase.auth().currentUser?.displayName}</div>
    </S.Wrapper>
  </>
  )
}

export default SchedulePage