import { useState ,createContext } from 'react';
import {useHistory} from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify'


export const AuthContext = createContext({});

function AuthProvider({children}){
    const history = useHistory();
    const [usuario, setUsuario] = useState(()=>{
        const user = localStorage.getItem('SistemaUser');
        const token = localStorage.getItem('SistemaToken');

        if(token && user){
            
            return {token, user: JSON.parse(user)}
        }
    
        return {}
    })

    

    
    async function SignIn(email, password){
        
        try{
           
            if (password.length < 6) {
                toast.info('informe uma senha valida');
                console.log(password);
            
            }else{
                const { data } = await api.post('/login', {
                    email,
                    password,
                  });
        
                  const { user, token } = data;
        
                  localStorage.setItem('SistemaToken', token);
                  localStorage.setItem('SistemaUser', JSON.stringify(user));
          
                  setUsuario({ user , token });
                  
                  if(!data){
                      history.replace('/')
                  }

                  toast.success('Bem vindo!')
            }
        }
        catch(e){
                toast.error(
                  'Usuario ou senha incorreto'
                );
                
              }

            }
        

        
    function signOut(){
        localStorage.removeItem('SistemaToken');
        localStorage.removeItem('SistemaUser');
      
        setUsuario({})
            
          }

    
    return(
        <AuthContext.Provider value={{ user: usuario.user, SignIn, signOut,  setUsuario }}>
            {children}
        </AuthContext.Provider >
    )
}


export default AuthProvider;