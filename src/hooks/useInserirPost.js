// useReducer para o load e erro de forma diferente
import { useState, useEffect , useReducer } from "react";
// Banco de dados do Firebase
import {db} from "../firebase/config";
// Funções do Firebase - Collection - Tabelas
// addDoc - faz a inclusão no banco
import { collection,addDoc,Timestamp } from "firebase/firestore";

const initialState = {
    loading:null,
    error:null
}
const inserirReducer = (state , actionDRM) => {
    switch (actionDRM.type) {
        case "LOADING":
            return {loading:true, error:null};
        case "INSERTED_DOC":
            return {loading:false, error:null};
        case "ERROR":
            return {loading:false, error:actionDRM.payload};
        default: 
            return state;
    }
}
export const useInserirPost = (docCollection) =>{
    const [resposta,dispatch] = useReducer (inserirReducer , initialState)
    // Evitar memory leak
    const [cancelar,setCancelar] = useState(false)
    const checkCancelEvitarLeak = (action) => {
        if (!cancelar){
            dispatch (action)
        }
    }

    const inserirDocumento =  async (documento) =>{
        checkCancelEvitarLeak ({
            type:"LOADING",
        })
        try {
            //console.log ("AQUI")
            console.log (documento)
            const novoDocumento = {...documento , createdAt:Timestamp.now()}
            console.log ("Antes inclusao Tabela: ",docCollection);
            console.log (novoDocumento)
            const insertedDocumento = await addDoc(
                collection(db,docCollection),
                novoDocumento,
            )
            //console.log ("Após inclusao  dentro")

            // Estamos com o sistema acontendo
            checkCancelEvitarLeak ({
                type:"INSERTED_DOC",
                payload:inserirDocumento
            })
        } catch (error) {
           // console.log ("Gerou erro")
           // console.log (error)
            checkCancelEvitarLeak ({
                type:"ERROR",
                payload:error.message,
            })
        }
    };
    useEffect (() => {
        return () => setCancelar(true);
    },[]);
    return {inserirDocumento,resposta};
};