import './header.css';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import { FiHome, FiUser, FiSettings } from 'react-icons/fi';

import avatar from '../../assets/avatar.png';



export default function Header() {
 
 const { user } = useContext(AuthContext);
 
 
  return (
   <div className="sidebar">
       <div>
          { user.fotourl != null ? <img src={user.fotourl} alt="avatar Sistema"/>
          :
          <img src={avatar} alt="avatar sistema" /> 
           }
          </div>

       <Link to="/dashboard">
       <FiHome color="#FFF" size={24} />Chamados</Link>

       <Link to="/clientes">
       <FiUser color="#FFF" size={24} />Clientes</Link>
       
       <Link to="/profile">
       <FiSettings color="#FFF" size={24} />Configurações</Link>

   </div>
 );
}