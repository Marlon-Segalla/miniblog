// useReducer para o load e erro de forma diferente
import { useState, useEffect , useReducer } from "react";
// Banco de dados do Firebase
import {db} from "../firebase/config";
// Funções do Firebase - Collection - Tabelas
import { updateDoc,doc } from "firebase/firestore";

const initialState = {
    loading:null,
    error:null
}
const updateReducer = (state , actionDRM) => {
    switch (actionDRM.type) {
        case "LOADING":
            return {loading:true, error:null};
        case "UPDATED_DOC":
            return {loading:false, error:null};
        case "ERROR":
            return {loading:false, error:actionDRM.payload};
        default: 
            return state;
    }
}
export const useAtualizarPost = (docCollection) =>{
    const [resposta,dispatch] = useReducer (updateReducer , initialState)
    // Evitar memory leak
    const [cancelar,setCancelar] = useState(false)
    const checkCancelEvitarLeak = (action) => {
        if (!cancelar){
            dispatch (action)
        }
    }

    const atualizarDocumento =  async (id,dadosPost) =>{
        checkCancelEvitarLeak ({
            type:"LOADING",
        })
        try {
            console.log ("Atualizando Post")
            const docRef = await doc (db,docCollection,id);
            const ajustarDoc = await updateDoc (docRef,dadosPost);

            // Estamos com o sistema acontendo
            checkCancelEvitarLeak ({
                type:"UPDATED_DOC",
                payload:ajustarDoc
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
    return {atualizarDocumento,resposta};
};