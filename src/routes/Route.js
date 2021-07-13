import { useContext } from 'react'; 

import {Route, Redirect} from 'react-router-dom';
import { AuthContext } from '../contexts/auth';





export default function RouteWrapper({
    component: Component,
    isPrivate,
    ...rest
}){

    const { user  } = useContext(AuthContext);

    
    const signed = user;
    


    if(signed && !isPrivate){
        return(
            <Redirect to="/dashboard" />
        )
    }

    if(!signed && isPrivate){
        return(
            <Redirect to="/" />
        )
    }
    
    
    return(
        <Route {...rest}
            render={ props => (
                <Component {...props} />
            )}
        
        />
    )
}

