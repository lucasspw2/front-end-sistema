import { useState } from 'react';
import api from '../../services/api';

import './clientes.css';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiUser } from 'react-icons/fi';
import { toast } from 'react-toastify'

export default function Clientes() {
 

    const[clienteNome, setNomeCliente] = useState('');
    const[cnpj, setCnpj] = useState('');
    const[endereço, setEndereço] = useState('');
 
 

async function handleSubmit(e){
    e.preventDefault();
    if(clienteNome !== '' && cnpj !== '' && endereço !== ''){
        await api.post('novocliente', {
            clientenome: clienteNome,
            cnpj: cnpj,
            endereço: endereço
        });
        toast.info('Empresa Cadastrada com sucesso!')

        setNomeCliente('');
        setCnpj('');
        setEndereço('');
    }else{
    toast.error('preencha todos os campos');
}
}

 
    return (
   <div>
       <Header/>
       <div className="content">
           <Title name="Clientes">
                <FiUser size={25} />
           </Title>


           <div className="container">
               <form className="form-profile clientes" onSubmit={ handleSubmit }>
                 
                   
                  <label>Nome Cliente</label>
                  <input type="text" value={clienteNome} placeholder="razão social" onChange={(e) => setNomeCliente(e.target.value) }/>

                  <label>CNPJ</label>
                  <input type="text" value={cnpj} placeholder="digite o CNPJ" onChange={(e) => setCnpj(e.target.value) }/>

                  <label>Endereço</label>
                  <input type="text" value={endereço} placeholder="Endereço da Empresa" onChange={(e) => setEndereço(e.target.value) }/>

                    <button type="submit">Cadastrar</button>
               </form>
           </div>
       </div>
   </div>
 );
}