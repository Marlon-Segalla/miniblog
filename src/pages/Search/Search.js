// Formato de Uso de CSS para evitar vazar a outas páginas
import style from './Search.module.css'
//hooks - Uso futuro
import { useBuscarDocumentos } from '../../hooks/useBuscarDocumentos';
import { useSearchURL } from '../../hooks/useQueryURL';
import { Link } from 'react-router-dom';
// Componentes
import PostDetalhes from  '../../components/PostDetalhes';
// vamos criar um novo hook para recuperar o valor da URl.
const Search = () => {
    const queryX = useSearchURL()
    // onde q significa: return Navigate ("/search?q=${query}")  do Home.js
    const searchParam = queryX.get ("q")
    const {documento:posts } = useBuscarDocumentos ("posts",searchParam)
    return (
        <div className={style.search_container}> 
            <h2>Página de Pesquisa</h2>
            <div> 
                <p> {searchParam}</p>
                { /* Fragmento <>*/ }
                {posts && posts.length === 0 && (
                    <div className={style.noposts}>
                        <p>Não foram encontrados Posts a partir da sua busca...</p>
                        <Link to="/" className="botao botao-dark" >Voltar</Link>
                    </div>
                )}
                {posts && posts.map ((pt) =>
                    <PostDetalhes key ={pt.id} post={pt} />
                )}
            </div>
        </div>
    );
};
export default Search;