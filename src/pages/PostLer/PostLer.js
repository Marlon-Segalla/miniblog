
import style from './PostLer.module.css'
// Hooks
import { useParams } from 'react-router-dom';
import { useBuscarOneDocument } from '../../hooks/useBuscarOneDocument';
const PostLer = () => {
    const {id} = useParams()
    const {documento : post} = useBuscarOneDocument ("posts",id)
    return ( 
        <div className={style.post_container}>
           {post && (
                <>
                    <h1> Titulo: {post.titulo}  </h1>     
                    <img src={post.imagem} alt={post.titulo}  />
                    <p>{post.body}</p>
                    <h3> Este Post trata de: </h3>     
                    <div className={style.tags}>
                        {post.tagsArray.map ((t) => (
                            <p key={t}> <span>#</span>
                                {t}
                            </p>
                        ))}  
                    </div>
                </>
            )}
        </div> )
}
export default PostLer;
