import Link from 'next/link';
import { useState } from 'react';
import * as S from './styles';

const SignUpPage = () => {
  const [form, setForm] = useState({});
  const [personName, setPersonName] = useState('')
  
    const handleLogin = (e: any)  => {
      e.preventDefault()
      const {value, name} = e.target
      console.log(e.target.name.value)
      console.log(e.target.password.value)
      setForm({...form, [name]: value})
    }
  
  return(
    <S.Wrapper>
      <S.LoginBox>
          <S.LoginForm onSubmit={handleLogin}>
            <S.FormLabel htmlFor='email'>Email</S.FormLabel>
            <S.FormInput name='name' id='email' type={'text'} autoComplete='email' required/>
            <S.FormLabel htmlFor='password'>Senha</S.FormLabel>
            <S.FormInput name='password' id='password' type={'password'} required/>
            <S.FormButton type='submit'>Registrar</S.FormButton>
            <Link href={'/LoginPage'}>já possui conta? fazer login</Link>
          </S.LoginForm>
          <S.FederatedLoginBox>
            <button>Registrar com Google</button>
            <button>Registrar com Facebook</button>
          </S.FederatedLoginBox>
      </S.LoginBox>
    </S.Wrapper>
  )
  }

export default SignUpPage