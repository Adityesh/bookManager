import React from 'react';
import { useHistory } from 'react-router-dom'

export default (props) => {
    const history = useHistory();
    if(props.logged) {
        return(
            <div>
                Home Component
            </div>
        )
    } else {
        history.push('/login')
        return null;
        
    }
    
}