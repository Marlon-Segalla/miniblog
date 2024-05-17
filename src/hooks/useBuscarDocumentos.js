import { useState, useEffect } from "react";
// Banco de dados do Firebase
import {db} from "../firebase/config";
// Funções do Firebase para buscar de dados do banco de dados padrão SQ
import { collection,query,orderBy,where,getDocs } from "firebase/firestore";
 
export const useBuscarDocumentos = (docCollection, search = null , uidDashboard = null) => {
    const [documento,setDocumento] = useState(null)
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState (true)

    // controlar memory leak
    const [cancelado,setCancelado] = useState(false)

    // se chegar a docCollection ou search ou uid, ou seja qualquer um que chegar eu posso buscar dados automaticamente.
    // se cancelado não vou mais buscar dados Encero o papel deste hook
    useEffect (() => {     
        async function carregarDados(){
            if (cancelado){
                return;
            }
            setLoading(true);
            // tratar erros da busca dos dados
            try {
                console.log ("Executando a funcao carregarDados.")
                const collectionRef = await collection (db,docCollection);
                // Create a query against the collection.
                let q1;
                if (search){
                    q1 = await query(collectionRef, 
                        where("tagsArray","array-contains",search),
                        orderBy("createdAt","desc"));
                }
                else if (uidDashboard) {
                    q1 = await query(collectionRef, 
                        where("uid","==",uidDashboard),
                        orderBy("createdAt","desc"));
                }else{
                    console.log ("Buscando todos os Posts: ")
                    q1 = await query(collectionRef, orderBy("createdAt","desc"));
                    
                }
                const querySnapshot = await getDocs(q1);
                setDocumento (
                    querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                );
                setLoading (false)
            } catch (error) {
                console.log ("Gerou erro: " + error);
                console.log ("Mensagem do erro: " + error.message);
                setError ("Mensagem do erro: " + error.message);
                setLoading (false)
            }
        }
        carregarDados();
    },[docCollection,search,uidDashboard,cancelado])
    // evitar memory leak
    useEffect (() => {
        return () => setCancelado(true);
    },[]);
    //console.log("Dados retornados Collection: " + documento)
    return {documento, error, loading};  
};