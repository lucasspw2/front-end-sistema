import { useState, useContext } from 'react';

import { Link} from 'react-router-dom';
import api from '../../services/api';
import { AuthContext } from '../../contexts/auth';
import { toast } from 'react-toastify';
import logo from '../../assets/logo.png'


export default function SignUp() {
 const [nome, setNome] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');

 const { SignIn } = useContext(AuthContext);
 
 async function handleSubmit(e){
   e.preventDefault();
   try {
    if(nome === '', email === '', password === ''){
      toast.error('preencha todos os campos');
      if(password.length < 8) {
      toast.error('Informe uma senha com 8 caracteres');
    } 
    }else{
      const response = await api.post('/register', {
        nome,
        email,
        password,
      });
        if(response) {
        toast.success('Cadastro realizado com sucesso!');
        SignIn(email, password);
      }
    }
  } catch (e) {
    toast.error('erro ao conectar, verifique usuario e senha');
    
  }
}
    





  return (
    <div className="container-center">
      <div className="login">
        <div className="logo-area">
            <img src={logo} alt="logo sistema"/>
         </div>
              <form onSubmit={ handleSubmit }>
                <h1> Cadastrar </h1>
                <input type="text" placeholder="digite seu nome" value={nome} onChange={ (e) => setNome(e.target.value)}/>
                <input type="text" placeholder="teste@teste"  value={email} onChange={ (e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="*******" value={password} onChange={ (e) => setPassword(e.target.value)}/>
                <button type="submit"> Cadastrar </button>
              </form>
              <Link to="/"> ja possui uma conta? entre</Link>
        </div>
     </div>
 );
}