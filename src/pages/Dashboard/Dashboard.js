import style from './Dashboard.module.css';

import { Link } from 'react-router-dom';
//hooks
import {useAuthValueFac} from "../../context/AuthContextFaculdade"
import{useBuscarDocumentos} from "../../hooks/useBuscarDocumentos"
import {useDeletarPost} from '../../hooks/useDeletarPost';

const Dashboard = () => {


  const {user} = useAuthValueFac()
  const uidDashboard = user.uid
  // Post do usuário x hook
  const {documento:posts, loading} = useBuscarDocumentos("posts",null,uidDashboard)
 
  const {deleteDocumento} = useDeletarPost("posts");
 
  if (loading){
    return <p> Carregando...</p>;
    
  }
  //console.log ("LOG: "+ posts.length)
  //console.log ("LOG: "+ user.uid)
  return (
    <div className={style.dashboard}>
        <h2>  Dashboard </h2>
        <p>Gerencie seus Posts.</p>
        {posts && posts.length === 0  ? (
            <div className={style.noposts}>
              <p> Não foram encontrados post. </p>  
              <Link to="/posts/create" className="botao"> Criar Primeiro Post</Link>
            </div>
        ) : 
        ( 
          <> 
            <div className={style.post_header}>
              <span> título </span>  
              <span> Ações </span>  
            </div>
            {posts &&posts.length > 0 && posts.map ((p) => 
               <div key={p.id} className={style.post_row}> 
                  <p>{p.titulo} </p>
                  <div>
                    <Link to={`/posts/${p.id}`} className="botao botao-outline"> Ver</Link>
                    <Link to={`/posts/edit/${p.id}`} className="botao botao-outline"> Editar</Link>
                    <button onClick={() => deleteDocumento (p.id)} className="botao botao-danger" >
                      Excluir
                    </button>
                  </div>
               </div>
            )}
          </>
        )}
    </div>
  )
}
export default Dashboard