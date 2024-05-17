// Formato de Uso de CSS para evitar vazar a outas páginas

import { useAutenticacao } from '../../hooks/useAutenticacao';
import style from './Register.module.css';
import { useState,useEffect } from 'react';
const Register = () => {
  const [displayName,setdisplayName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [confirmPassword,setconfirmPassword] = useState("")
  const [error,setError] = useState("")
  
  // Importando variaveis do nosso hook.
  // Atenção, vamos precisar pasar o usuário ao createUsuario do Hook
  const {createUsuario,error:authError,loading} = useAutenticacao ()

  const handleSubmitDouglas = async (e) =>{
    e.preventDefault()
    setError ("")
    const userDRM = {
      displayName,email,password
    }
    if (password !== confirmPassword){
      setError("Redigite a senha. Senha precisam ser iguais.")
      return
    }
    const resUseAutenticacao = await createUsuario (userDRM)
    console.log("Conteudo de userDRM: ",userDRM)
    console.log("Conteudo de resUseAutenticacao: " , resUseAutenticacao)
    
  };
  // Criar um userEffect para mapear se o setErro mudar. Havendo mudança dispara esta função
  useEffect(() => {
    // Vamos checar se ele mudou para algum valor e não para vazio. Se vazio não entra no if.
    if (authError){
      // vamos substituir o erro a ser apresentado para o usuário o recebido do useAutenticacao.js
      setError (authError)
    }
  },[authError])

  return (
    <div className={style.register}>
        <h1>  Cadastre-se para postar </h1>
        <p> Crie seu usuário e compartilhe suas histórias</p>
        <form onSubmit={handleSubmitDouglas}>
          <label>
            <span>Nome:</span>
            <input type='text' name='displayName' required placeholder='Nome do usuário'
            value={displayName}
            onChange={(e) => setdisplayName (e.target.value)}
            />
          </label>
          <label>
            <span>E-mail:</span>
            <input type='email' name='email' required placeholder='E-mail do usuário'
             value={email}
             onChange={(e) => setEmail(e.target.value)}
            
            />
          </label>
          <label>
            <span>Senha:</span>
            <input type='password' name='password' required placeholder='Senha do usuário'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            <span>Confirmação de senha:</span>
            <input type='password' name='confirmPassword' required placeholder='Confirme senha do usuário'
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
            />
          </label>
          {!loading && <button className='botao'>
            Cadastrar
          </button>}
          {loading && <button className='botao' disabled>
            Aguarde ...
          </button>}
          {error && <p className='error' > {error} </p>}
        </form>
    </div>
  )
}
export default Register