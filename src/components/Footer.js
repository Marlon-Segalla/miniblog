// Formato de Uso de CSS para evitar vazar a outas páginas
import style from './Footer.module.css';
const Footer = () => {
  return ( <footer className={style.footer}>
    <h3> Escreva sobre o que tem interesse.</h3>
    <p> Mini Blog &copy; 2024</p>

  </footer>);
};
export default Footer