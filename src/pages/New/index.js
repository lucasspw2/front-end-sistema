import {useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import api from '../../services/api';
import {FiPlus} from 'react-icons/fi';
import './new.css';
import {toast} from 'react-toastify';




import Header from "../../components/Header";
import Title from "../../components/Title";

export default function New() {
 
const history = useHistory();
 const [assunto, setAssunto] = useState('Suporte');
 const [status, setStatus] = useState('Aberto')
 const [complemento, setComplemento] = useState('')
 
 const [data, setData] = useState([]);
 const [clienteid, setClienteId] = useState('');
 


 useEffect(() =>{

    async function getApi(){
        const { data } = await api.get('todosclientes');
        setData(data);
        
    }

    getApi();
    

 }, []);


 
 async function handleSubmit(e){
     e.preventDefault();
    await api.post('novochamado', {
        
        cliente_id: clienteid,
        assunto,
        status,
        complemento
    });
    toast.success('chamado criado com sucesso');
    history.replace('/dashboard');

    

     
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
           <select onChange={ (e) => { setClienteId(e.target.value)}}>
               <option>escolha um cliente</option>
               {data.map((item) => (
                  
                  <option key={item.id} value={item.id}>
                  {item.clientenome}
                  </option> 
               ))}
               
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