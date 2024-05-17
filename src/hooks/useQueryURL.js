import { useLocation } from "react-router-dom";
import { useMemo } from "react";

// Cache do valor para performance da aplicação. 
// esta função só será executada quando search mudar, por isto o uso de [search]
export function useSearchURL (){
    const {search} = useLocation();
    return useMemo (() => new URLSearchParams(search),[search])
}

