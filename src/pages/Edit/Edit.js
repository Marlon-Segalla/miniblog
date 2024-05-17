// Formato de Uso de CSS para evitar vazar a outas páginas
import style from './Edit.module.css';

// 01 - vamos importar o useState() para manipular nossos estados. Ligação do que é digitado na tela com o programa react.
import { useEffect, useState } from 'react';
// 02 - Para redirecionar após criarmos o Post
import { useParams } from 'react-router-dom';
// 03 - UseAuthValue - para pegar o usuário e conseguir atrelar ele ao Post para criarmos o Dashboard.
import {useAuthValueFac} from "../../context/AuthContextFaculdade";

//Firestore Database - 

import { useNavigate } from 'react-router-dom';
import {useBuscarOneDocument} from '../../hooks/useBuscarOneDocument'
import { useAtualizarPost } from '../../hooks/useAlterarPost';

const Edit = () => {
    // obter id da URL
  const {id} = useParams ()
  const {documento: post} = useBuscarOneDocument ("posts",id)

    // 04 - Uso do useState() 
  const [titulo,setTitulo] = useState("");
  const [imagem,setImagem] = useState("");
  const [corpo,setCorpo] = useState("");
   // Composto por um array por isto []
  const [tagPost,setTagPost] = useState([]);

  useEffect (() => {
    if (post){
        setTitulo (post.titulo);
        setCorpo (post.corpo);
        setImagem (post.imagem);
        const textTags = post.tagsArray.join(", ");
       setTagPost (textTags);
    }
},[post]) 

  let [erroLocal,setErroLocal] = useState("");

  // Firestore Database -  
  const {atualizarDocumento,resposta} = useAtualizarPost("posts")
  const {user} = useAuthValueFac()
  const navigate = useNavigate();

  // 05 - Criar função para submeter o formulário.
  const handleSubmit = (e) => {
    e.preventDefault();
    // Firestore Database - Limpar erros
    erroLocal ="";
    // Firestore Database - validar URL da imagem
    try {
      console.log("URL:" , imagem)
      new URL(imagem);
    } catch (error) {
      setErroLocal("A imagem precisa ser uma URL.");
      erroLocal = "A imagem precisa ser uma URL."
      console.log("Gerou Erro:")
    }
     // Caso alguma validação esteja com erro não dará continuidade a inclusão.
     console.log("Antes IF erroLocal:" + erroLocal)
     if (erroLocal) {
       console.log("Entrou no if do return:")
       erroLocal = "";
       console.log("Depois Limpar erroLocal:" + erroLocal)
       return;
     }
     console.log("Depois IF erroLocal:" + erroLocal)
    // Firestore Database - Criar arrays de tags
    const tagsArray = tagPost.split(",").map ( (t) => t.trim().toLowerCase());
    console.log("tagsArray: " + tagsArray)

    // Firestore Database - checar se todos os valores
    if (!titulo || !imagem || !tagPost || !corpo){
      erroLocal = "Preencha todos os campos.";
    }

    const dadosAlteracao = {
      titulo,
      imagem,
      corpo,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName 
    }
    atualizarDocumento(id,dadosAlteracao);

    // Firestore Database - Redirect home page.
    console.log("Redirecionando0");
    navigate ("/dashboard")
  }

  return (
    <div className={style.edit_post}>
        {post && (
            <>
                <h1>  Editando  Post: {post.titulo} </h1>
                <p> Altere os dados do Post como desejar.</p>
                <form onSubmit={handleSubmit} >
                <label>
                    <span>Título: </span>
                    <input type="text" name="title" 
                    required placeholder='Pense em um bom título' 
                    onChange={ (e) => setTitulo (e.target.value) } 
                    value={titulo}/>
                    </label>
                    <label>
                    <span>URL Imagem: </span>
                    <input type="text" name="image" 
                        required placeholder='Insira uma imagem que representa seu post.' 
                        onChange={ (e) => setImagem (e.target.value) } 
                        value={imagem}/>
                    </label>
                    <p className={style.preview_titulo}> Preview da Imagem atual:</p>
                    <img className={style.image_preview} 
                        src={post.imagem}
                        alt={post.titulo}
                    />
                    <label>
                    <span>Conteúdo </span>
                    <textarea  name="body"  
                        required placeholder='Insira o conteúdo do post.'
                        onChange={ (e) => setCorpo (e.target.value) } 
                        value={corpo}/>
                    </label>
                    <label>
                    <span>Tags do Post: </span>
                    <input type="text" name="tags" 
                        required placeholder='Insira as tags separada por vírgulas.' 
                        onChange={ (e) => setTagPost (e.target.value) } 
                        value={tagPost}/>
                    </label>
                    {!resposta.loading && <button className='botao'>
                    Editar
                    </button>}
                    {resposta.loading && <button className='botao' disabled>
                    Aguarde ...
                    </button>}
                    {resposta.error && <p className='error' > {resposta.error} </p>}  
                    {erroLocal && <p className='error' > {erroLocal} </p>}  
                </form>

            </>

        )}
    </div>
  )
}
export default Edit