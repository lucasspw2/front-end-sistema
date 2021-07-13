import {useContext, useState } from 'react';
import api from '../../services/api';
import './profile.css';
import Header from '../../components/Header';
import Titulo from '../../components/Title';
import { AuthContext } from '../../contexts/auth'; 
import { FiSettings, FiUpload } from 'react-icons/fi'
import avatar from '../../assets/avatar.png';
import { getToken } from '../../services/auth';
import { toast } from 'react-toastify';

export default function Profile() {
 
 const { user , signOut , setUsuario } = useContext(AuthContext);


 const [nome, setNome] = useState(user && user.nome);
 const [email, setEmail] = useState(user && user.email);
 const [fotoAvatar, setFotoAvatar] = useState(user && user.fotourl);
 const [imageAvatar, setImageAvatar] = useState(null);
 
 
 function handleFile(e){
  e.preventDefault();
  
   if(e.target.files[0]){
     const image = e.target.files[0];
    setImageAvatar(image);
    setFotoAvatar(URL.createObjectURL(e.target.files[0]));
   }
 
}


 
async function handleSubmit(e){
  e.preventDefault();
  const formData = new FormData()
  if(imageAvatar && nome !== ''){
    formData.set('foto', imageAvatar);
    formData.append('nome', nome);
  
    const response = await api.put('userfoto', formData);
    console.log(response.data);
    localStorage.setItem('SistemaUser', JSON.stringify(response.data));
    setUsuario({...getToken, user: response.data });
    toast.success('cadastro editado com sucesso');

  }
  
  if(!imageAvatar && nome !== ''){
    const response = await api.put('usernome', {
      nome: nome
    });
    
    localStorage.setItem('SistemaUser', JSON.stringify(response.data));
    setUsuario({...getToken, user: response.data });
    toast.success('cadastro editado com sucesso');
 
  }
}
 
 return (
   <div>
       <Header/>
       
       
       <div className="content">
         <Titulo name="Meu perfil">
            <FiSettings size={25}/>
         </Titulo>
      
  

      <div className="container">
        <form className="form-profile"  encType="multipart/form-data" onSubmit={handleSubmit}>
          <label className="label-avatar">
                <span>
                  <FiUpload color="#FFF" size={25}/>
                </span>
                
                <input type="file" accept="image/*" onChange={ handleFile }/> <br/>
                { fotoAvatar == null ? 
                  <img src={avatar} alt="avatar logo" height="250" /> 
                  :
                  <img src={fotoAvatar} alt="avatar logo" height="250" /> 
                  }
           </label>  

          <label>Nome</label>
          <input type="text" value={nome}  onChange={ (e) => setNome(e.target.value)} />

          <label>Email</label>
          <input type="text" disabled value={email} onChange={ (e) => setEmail(e.target.value)} />
          <button type="submit" >Salvar</button>        
        
        </form>

      </div>
      <div className="container">
      </div>
                  <button className="logout-btn"  onClick={ () => signOut() }>Sair</button>
       </div>
   </div>
 );
}