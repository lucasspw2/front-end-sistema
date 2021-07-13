import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

import logo from '../../assets/logo.png';
import './signin.css';


export default function SignIn() {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');

 const {SignIn, loadingAuth} = useContext(AuthContext);
 
 
  function handleSubmit(e){
  e.preventDefault()
  if(email !== '', password !== ''){
  SignIn(email, password);
  }
}

 
  return (
    <div className="container-center">
        <div className="login">
         <div className="logo-area"> 
            <img src={logo} alt="logo sistema" />
          </div>
          
              
              <form onSubmit={ handleSubmit }>
              <h1>Entrar</h1>
                  <input type="text" placeholder="teste@teste" value={email} onChange={ (e) => setEmail(e.target.value) }/>
                  <input type="password" placeholder=" ********* " value={password} onChange={ (e) => setPassword(e.target.value) }/>
                  <button type="submit">{loadingAuth ? 'Carregando...' : 'Entrar'}</button>
              </form>
              <Link to="/register">não possui uma conta? cadastrar</Link>
           </div> 
         </div>
    
      
   
 );
}