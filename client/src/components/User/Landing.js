import React from 'react';
import { Paper, Container, Typography, Button, Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
};

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));
  

export default () => {
    const classes = useStyles();
    const history = useHistory();
    return(
        <Container fixed maxWidth="xl" style={{padding : '200px 50px'}}>
            <Typography variant="h1" component="h2" style={{margin : '10px 0'}}>Book Manager</Typography>
            <Typography variant="h5" component="h2" style={{margin : '10px 0'}}>Sharing Books has never been this easy.</Typography>
            <Button
            style={{margin : '10px 0'}}
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<DoubleArrowIcon/>}
        onClick={() => history.push('/register')}
      >
        Join Now
      </Button>

            
        </Container>


    )
}