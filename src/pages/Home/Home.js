// Formato de Uso de CSS para evitar vazar a outas páginas
import style from './Home.module.css';

// Hooks necessários
import { useNavigate,Link } from 'react-router-dom';
import { useState } from 'react';
import { useBuscarDocumentos } from '../../hooks/useBuscarDocumentos';
//  Componentes
import PostDetalhes from '../../components/PostDetalhes';

const Home = () => {
  const [query,setQuery] = useState ("")
  //const [posts] = useState ([])
  const {documento:postados, loading} = useBuscarDocumentos("posts");
  const navigate = useNavigate ()
  const handSubmite = (e) =>{
    e.preventDefault()
    if (query){
      // Abrirá nova página
      return navigate (`/search?q=${query}`) 
    }
  };
  return (
    <div className={style.home}>
        <h1>  Veja nossos Posts mais recentes </h1>
        <form onSubmit={handSubmite} className={style.search_form}>
          <input type="text" placeholder='ou busque por tags...' onChange={(e) => setQuery(e.target.value) }/>
          <button className="botao botao-dark"> Pesquisar </button>
        </form>
        <div>
          {loading && <p> Carregando...</p>}
          {postados && postados.map ((p) => (
            <PostDetalhes key={p.id} post={p} />
          ))}
          {postados && postados.length === 0 && (
            <div className= {style.noposts} > 
              <p> Não foram encontrados Posts...</p>
              <Link to="/posts/create" className="botao"> Criar Primeiro Post...</Link>
            </div>
          )}
        </div>
    </div>
  )
}
export default Home