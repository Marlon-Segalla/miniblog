import style from './PostDetalhes.module.css';
import { Link } from 'react-router-dom';
const PostDetalhes = ({post}) => {
    return (
        <div className={style.post_detail} > 
            {/*Atributos foram definidos em CreatePost.js */ }
            <img src={post.imagem} alt={post.titulo}  />
            <h2>{post.titulo}</h2>
            <p className={style.createdBy}>{post.createdBy}</p>
            <div className={style.tags}>
                {/* tagsArray, vei do método inserirDocumento do CreatePost.js*/}
                {post.tagsArray.map ((tag) => (
                    <p key={tag}><span>#</span>{tag} </p>
                ))}
            </div>
            {/* Use da crase por usarmos template Strings */}
            <Link to={`/posts/${post.id}`} className='botao botao-outline'> Ler</Link>
        </div>
    )
}
export default PostDetalhes;