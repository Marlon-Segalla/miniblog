import {db} from "../firebase/config";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from "firebase/auth"
import { useState,useEffect } from "react"


export const useAutenticacao = () =>{
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(null)
    // cleanup - evitar leak de memória
    const [cancelarAposdarCerto,setCancelarAposdarCerto] = useState (false)
    // Obter autenticação do Firebase. usar funções de autenticação quando necessário
    const auth = getAuth()
    // função para checar o estado
    function validarIfIsCancelled (){
        if (cancelarAposdarCerto){
            return;
        }
    }
    // Nosso Register
    const createUsuario = async (data) => {
        // async por seguir a um banco de dados externo e demorar mais tempo para voltar que um 
        // JSON server por ex. Garante o cleanUp ao criar o usuário
        validarIfIsCancelled()
        // Se der tudo certo e não for cancelado colocamos true no loading
        setLoading(true)
        setError ("");
        try{
            // Amparado pelas funções do Firebase
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )
            await updateProfile(user, {displayName: data.displayName}) 
            setLoading (false)
            console.log ("Usuário cadastrado com sucesso: " , data.email)
            return user
        }catch(catError){
            console.log (catError.message)
            console.log (typeof catError.message)
            let erroAPI
            // Se houver o termo Password na mensagem
            if (catError.message.includes ("Password")){
                erroAPI = "A senha esta fora do padrão do Firebase. Deve conter 6 caracteres."
            }else {
                if (catError.message.includes ("email-already")){
                    // Usuário já existe
                    erroAPI = "E-,mail já cadastrado."
                }
                else{
                    erroAPI = "Ocorreu um erro, tente mais tarde."
                }
            }
            setError (erroAPI)
            setLoading (false)
        }
    };

    // Criar a função useEffect para colocar a variável cancelarAposdarCerto como true ao sair desta página
    // Será executado uma única vez por esta sintaxe ,[])
    // Vai garantir que não tenhamos memory leak
    useEffect ( () => {
        return () => setCancelarAposdarCerto (true);
    },[])

    // Nosso logout. Colocar após a definição das variáveis auth e da função de memory leak.
    const logout = async () => {
        // Para evitar memory leak
        validarIfIsCancelled();
        //logout com função do Firebase
        signOut (auth);
    }
    // Login - entrada do sistema
    const login = async (data) => {
        // Para evitar memory leak
        validarIfIsCancelled();
        setError (false)
        setLoading (true)
        try {
            await signInWithEmailAndPassword (auth,data.email,data.password)
            setLoading (false)
            console.log ("Usuário logado com sucesso: " , data.email)
        } catch (catError) {
            let erroAPI
            // Se houver o termo Password na mensagem
            if (catError.message.includes ("user-not-found")){
                erroAPI = "usuário não cadastrado."
            }else {
                if (catError.message.includes ("wrong-password")){
                    // Usuário já existe
                    erroAPI = "Senha incorreta."
                }
                else{
                    erroAPI = "Ocorreu um erro no login, tente mais tarde."
                }
            }
            setError (erroAPI)
            setLoading (false)
        }
    }   
    return {
        auth,createUsuario,error,loading,logout,login,
    }
};
