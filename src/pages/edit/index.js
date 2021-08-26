import {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import api from '../../services/api';
import {FiPlus} from 'react-icons/fi';

import {toast} from 'react-toastify';




import Header from "../../components/Header";
import Title from "../../components/Title";

export default function Edit() {
 

    const { id } = useParams();
    const history = useHistory();
const [cliente, setCliente] = useState([]);
 const [assunto, setAssunto] = useState('');
 const [status, setStatus] = useState('')
 const [complemento, setComplemento] = useState('')
 
 


 useEffect(() =>{

    
  async function getInfoApi(){
        const { data } = await api.get(`/edit/${id}`);
        setCliente(data.Cliente);
        setAssunto(data.assunto);
        setStatus(data.status);
        setComplemento(data.complemento);
    }

    getInfoApi();
    
 }, [id]);

 
 async function handleSubmit(e){
     e.preventDefault();

     
     try {
        const { data } = await api.put(`/edit/${id}` , 
        { 
          cliente_id: cliente.id,
          assunto: assunto,
          status: status,
          complemento: complemento } );
          toast.success('chamado editado com sucesso');
  
       
  
        if (data) {
          toast.success(data.message);
          history.push('/dashboard');
        }
      } catch (e) {
        toast.error(e.response.data.message);
        history.push('/dashboard');
      }
     
    }  
   

//function do Assunto
 function handleSelect(e){
     setAssunto(e.target.value);    
 }


 //function dos radios stats
 function handleOptionChange(e){
    setStatus(e.target.value);
 }
 
 
    return (
   <div>
       <Header/>
   <div className="content">
       <Title name="Novo Chamado">
            <FiPlus size={25} />
       </Title>

       <div className="container">
           <form className="form-profile" onSubmit={ handleSubmit }>
            <label>Cliente</label>
           <select >
                  
                  <option key={cliente.id}>
                  {cliente.clientenome}
                  </option>
               
               
           </select>
           <label>Assunto:</label>
           <select value={assunto} onChange={ handleSelect }>
               <option value="Suporte">Suporte</option>
               <option value="Visita Tecnica">Visita Tecnica</option>
               <option value="Financeiro">Financeiro</option>
           </select>

           <label>Status</label>
           <div className="status">
               <input 
               type="radio"
               name="radio"
               value="Aberto"
               onChange={ handleOptionChange }
               checked={ status === 'Aberto'}
                />
                <span>Em aberto</span>
                
                <input 
               type="radio"
               name="radio"
               value="Progresso"
               onChange={ handleOptionChange }
               checked={ status === 'Progresso'}
                />
                <span>Progresso</span>

                <input 
               type="radio"
               name="radio"
               value="Atendido"
               onChange={ handleOptionChange }
               checked={ status === 'Atendido'}
                />
                <span>Atendido</span>


           </div>

           <label> Complemento </label>

           <textarea 
           type="text"
           placeholder="Descreva seu problema (Opcional)"
           value={complemento}
           onChange={ (e) => setComplemento(e.target.value) }/>
           
           <button type="submit" >Registrar</button>
           </form>
       </div>
   </div>
   </div>
 );
}