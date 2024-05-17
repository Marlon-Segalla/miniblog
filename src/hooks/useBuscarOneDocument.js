import { useState, useEffect } from "react";
// Banco de dados do Firebase
import {db} from "../firebase/config";
// Funções do Firebase para buscar de dados do banco de dados padrão SQ
import { doc,getDoc } from "firebase/firestore";

export const useBuscarOneDocument = (docCollection , id) => {
    const [documento,setDocumento] = useState(null)
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState (true)

    // controlar memory leak
    const [cancelado,setCancelado] = useState(false)

    // se chegar a docCollection ou search ou uid, ou seja qualquer um que chegar eu posso buscar dados automaticamente.
    // se cancelado não vou mais buscar dados Encero o papel deste hook
    useEffect (() => {     
        async function carregarOneDocument(){
            if (cancelado){
                return;
            }
            setLoading(true);
            try {   
                console.log ("Buscando DOC: " , id)
                const docRef = await doc (db,docCollection,id)
                const docSnap = await getDoc(docRef)
                setDocumento(docSnap.data())

                setLoading (false)
            } catch (error) {
                console.log ("Gerou erro: " + error);
                setError (error.message)
                setLoading (true)
            }
        }
        carregarOneDocument();
    },[docCollection,id,cancelado])
    // evitar memory leak
    useEffect (() => { 
        return () => setCancelado(true);
    },[]);
    //console.log("Dados retornados Collection: " + documento)
    return {documento, error, loading};  
};