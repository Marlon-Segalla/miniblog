// Formato de Uso de CSS para evitar vazar a outas páginas
import style from "./Navbar.module.css"
import { NavLink } from 'react-router-dom';

// Puxar o contexxto aqui dentro
import {useAutenticacao} from "../hooks/useAutenticacao";
import { useAuthValueFac } from "../context/AuthContextFaculdade";

const Navbar = () => {
  const {user} = useAuthValueFac ();
  const {logout} = useAutenticacao();

  return <nav className={style.navbar}>
      <NavLink to="/" className={style.brand}> 
        Mini <span>Blog</span>
      </NavLink>
      <ul className={style.links_list}>
          <li>
            <NavLink to="/" className={ ({isActive}) => (isActive ? style.active : "") } >Home </NavLink>
          </li>
          {!user && (<>
            <li>
              <NavLink to="/login" className={ ({isActive}) => (isActive ? style.active : "") }> Entrar </NavLink>
            </li>
            <li>
              <NavLink to="/register" className={ ({isActive}) => (isActive ? style.active : "") }> Cadastrar </NavLink>
            </li>
          </>)}
          <li>
            <NavLink to="/about" className={ ({isActive}) => (isActive ? style.active : "") }> Sobre </NavLink>
          </li>
          {user && (<>
            <li>
              <NavLink to="/posts/create" className={ ({isActive}) => (isActive ? style.active : "") }> Novo Post </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className={ ({isActive}) => (isActive ? style.active : "") }> Dashboard </NavLink>
            </li>
          </>)}
          {user && (
              <li>
                <button onClick={logout}>
                  Sair
                </button>
              </li>
            )}

      </ul>
  </nav>;
}
export default Navbar