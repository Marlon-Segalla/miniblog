// useReducer para o load e erro de forma diferente
import { useState, useEffect , useReducer } from "react";
// Banco de dados do Firebase
import {db} from "../firebase/config";
// Funções do Firebase - Collection - Tabelas
// addDoc - faz a inclusão no banco
import { doc,deleteDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const initialState = {
    loading:null,
    error:null
}
const deleteReducer = (state , actionDRM) => {
    switch (actionDRM.type) {
        case "LOADING":
            return {loading:true, error:null};
        case "DELETED_DOC":
            return {loading:false, error:null};
        case "ERROR":
            return {loading:false, error:actionDRM.payload};
        default: 
            return state;
    }
}

export const useDeletarPost  = (docCollection) =>{
    const navigate = useNavigate();
    const [resposta,dispatch] = useReducer (deleteReducer , initialState)
    // Evitar memory leak
    const [cancelar,setCancelar] = useState(false)
    const checkCancelEvitarLeak = (action) => {
        if (!cancelar){
            dispatch (action)
        }
    }

    const deleteDocumento =  async (id) =>{
        checkCancelEvitarLeak ({
            type:"LOADING",
        })
        try {
            console.log ("removendo Post")
            const remPost = await deleteDoc (doc (db,docCollection,id))
            // Estamos com o sistema acontendo
            checkCancelEvitarLeak ({
                type:"DELETED_DOC",
                payload:remPost,
            });
             // Firestore Database - Redirect home page.
            console.log("Redirecionando, para atualizar o item");
            navigate ("/")
 
        } catch (error) {
           // console.log ("Gerou erro")
           // console.log (error)
            checkCancelEvitarLeak ({
                type:"ERROR",
                payload:error.message,
            });
        }
    };
    useEffect (() => {
        return () => setCancelar(true);
    },[]);
    return {deleteDocumento,resposta};
};