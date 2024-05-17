// Formato de Uso de CSS para evitar vazar a outas páginas
import style from './Login.module.css'
import { useAutenticacao } from '../../hooks/useAutenticacao';
import { useState,useEffect } from 'react';
const Login = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")
  
  // Importando variaveis do nosso hook.
  // Atenção, vamos precisar pasar o usuário ao createUsuario do Hook
  const {login,error:authError,loading} = useAutenticacao ()

  const handleSubmitDouglas = async (e) =>{
    e.preventDefault()
    setError ("")
    const userDRM = {
      email,password
    }
    const resUseAutenticacao = await login (userDRM)
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
    <div className={style.login}>
        <h1> Entrar </h1>
        <p> Faça o login para usar o sistema</p>
        <form onSubmit={handleSubmitDouglas}>
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
        
          {!loading && <button className='botao'>
            Entrar
          </button>}
          {loading && <button className='botao' disabled>
            Aguarde ...
          </button>}
          {error && <p className='error' > {error} </p>}
        </form>
    </div>
  )
}
export default Login