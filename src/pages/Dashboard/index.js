import {  useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi'
import Header from '../../components/Header';
import Title from '../../components/Title';
import './dashboard.css'
import api from '../../services/api';
import Modal from '../../components/Modal';

export default function Dashboard() {
 

  const [chamados, setChamados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [detalhes, setDetalhes] = useState([]);

 
 useEffect(() =>{
  
  async function loadApi(){
    const {data} = await api.get('todoschamados');
    setChamados(data);
     
  }
  loadApi();


 }, [])
  
 function toggleButton(iten){
   setShowModal(!showModal);
   setDetalhes(iten); 

 }

  return (
    <div>
        <Header/> 
        <div className="content">
          <Title name="Atendimentos">
            <FiMessageSquare size={25}/> 
          </Title>
        
        {chamados.length === 0 ? (<div className="container dashboard">
          <span>Nenhum chamado registrado...</span>
          <Link to="/new" className="new">
          <FiPlus size={25} color="#FFF"/>
          Novo chamado
          </Link>
        </div> ) : (
         <>
          <Link to="/new" className="new">
          <FiPlus size={25} color="#FFF"/>
          Novo chamado
          </Link>
          

          <table>
            <thead>
              <tr>
                <th scope="col">Cliente</th>
                <th scope="col">Assunto</th>
                <th scope="col">Status</th>
                <th scope="col">Cadastrado em</th>
                <th scope="col">#</th>
              </tr>
            </thead>
          <tbody>
              {chamados.map((iten) => (
                <tr key={iten.id}>
                <td data-label="Cliente">{iten.Cliente.clientenome}</td>
                 <td data-label="Assunto">{iten.assunto}</td>
                 <td data-label="Status">
                   <span className="badge" style={{backgroundColor: iten.status === 'Aberto' ?  '#5cb85c'
                   : '#999'}} >{iten.status}</span>
                 </td>
                 <td data-label="Cadastrado">{iten.createdAt}</td>
                 <td data-label="#">
                   <button className="action" style={{backgroundColor: '#3583f6'}} onClick={ () => toggleButton(iten) }>
                     <FiSearch color="#FFF" size={25} />
                   </button>    
                   <Link className="action" style={{ backgroundColor: '#f6a935'}} to={`/edit/${iten.id}`}>
                   <FiEdit2 color="#FFF" size={25} />
                   </Link>
                 </td>
               </tr>

                
              )
              )}
              
            </tbody>
          </table>
                
          </>

        )}
        
        </div>

        { showModal && (
          <Modal conteudo={detalhes} 
          close={toggleButton}/>
          
        )}
     </div>
 );
}