import React, {useEffect} from 'react';
import { useHistory } from 'react-router-dom'

export default (props) => {
    useEffect(() => {
        (async() => {
            try {
                const response = await fetch('/user/getBooks');
                console.log(await response.json());
            } catch(err) {
                console.log(err);
            }
        })()
    })
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