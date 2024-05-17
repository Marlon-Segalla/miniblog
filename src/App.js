import './App.css';
// Navigate usaremos para redirecionar os usuário logado para uma página e não logados para outra.
import { BrowserRouter, Routes,Route,Navigate } from 'react-router-dom';
import Home from "./pages/Home/Home.js";
import About from "./pages/About/About.js";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from "./pages/Login/Login.js" 
import Register from "./pages/Register/Register.js" 
import { AuthProviderFac } from './context/AuthContextFaculdade';
// Mapeia se a autenticacao do usuario foi feita com sucesso.
import { onAuthStateChanged } from 'firebase/auth';
// hooks
import { useState,useEffect} from 'react';
import { useAutenticacao } from './hooks/useAutenticacao';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';
import Search from './pages/Search/Search';
import Edit from './pages/Edit/Edit';
import PostLer from './pages/PostLer/PostLer';
function App() {
  // Lógica sobre como nos vamos monitorar o estado do usuário
  // Aqui englobamos  todos os componentes e páginas
  const [user,setUser] = useState(undefined)
  // vamos recuperar o usuário logado do nosso hook
  const {auth} = useAutenticacao()

  // Vai ser executada toda vez que houver mudança em termos da autenticação.
  useEffect (() => {
    onAuthStateChanged (auth, (user) => {
      setUser(user)
    })
  },[auth])

  // atribuimos ao estado de loading do usuário o valor de usuário comparado com undefined, se for 
  // undefined significa que esta carregando de alguma nmaneira.
  // conseguiremos fazer um inner return com <p> para que não exiba nada até o usuário ser carregado por completo.
  const loadingUser = user === undefined
  if (loadingUser){
    return <p> Carregando...</p>
  }
  return (
    <div className="App">
      <h1> Miniblog React </h1>
      <AuthProviderFac value={{user}}> 
        <BrowserRouter>
        <Navbar />
          <div className='container'>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/about' element={<About/>} />
                <Route path='/search' element={<Search/>} />
                <Route path='/posts/:id' element={<PostLer/>} />

                <Route path='/login' element={ !user ?  <Login/> : <Navigate to="/" />} />
                <Route path='/register' element={ !user ?  <Register/> : <Navigate to="/" />} />
                <Route path='/posts/edit/:id' element={ user ?  <Edit/> : <Navigate to="/login" />} />
                <Route path='/posts/create' element={ user ?  <CreatePost/> : <Navigate to="/login" />} />
                <Route path='/dashboard' element={ user ?  <Dashboard/> : <Navigate to="/login" />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProviderFac>
    </div>
  );
}
export default App;
