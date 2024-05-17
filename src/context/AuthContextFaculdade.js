import { useContext,createContext } from "react";

// vamos criar o contexto
const AuthContextFaculdade = createContext();

// nosso provedor de contexto
export function AuthProviderFac ({children,value}){
    return <AuthContextFaculdade.Provider value={value}>{children}</AuthContextFaculdade.Provider>
}

export function useAuthValueFac(){
    return useContext(AuthContextFaculdade);
}