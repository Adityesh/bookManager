import React from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import 'react-tabs/style/react-tabs.css';
import { Container, Divider, Avatar } from '@material-ui/core';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
}));


export default (props) => {
    const classes = useStyles();
    const isDark = useSelector(state => state.isDark);
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('user'));
    if (props.logged) {
        return (
            <>
                
                        
                    
                    
                
            </>

        )
    } else {
        history.push('/')
        return null;

    }

}