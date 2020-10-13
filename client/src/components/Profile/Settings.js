import React, {useState} from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import 'react-tabs/style/react-tabs.css';
import {logout} from '../../actions/LogIn';
import { Container, Divider, LinearProgress, TextField } from '@material-ui/core';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { Button, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import EmailIcon from '@material-ui/icons/Email';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import FaceIcon from '@material-ui/icons/Face';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center'
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
        height: theme.spacing(8),
        width: theme.spacing(8),
        fontSize: 40
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));


export default (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isDark = useSelector(state => state.isDark);
    const history = useHistory();
    const [bio, setBio] = useState('');
    const [bioError, setBioError] = useState(false);
    const [errBio, setErrBio] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [old, setOld] = useState('');
    const [newPass, setNewPass] = useState('');
    const [isLoading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    const handleUpdateBio = async () => {
        if(bio.length === 0) {
            setBioError(true);
            setErrBio('Field cannot be empty');
        } else {
            try {
                const response = await fetch('/user/bio/update', {
                    method : 'post',
                    headers : {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        username : user.username,
                        email : user.email,
                        updatedBio : bio
                    })
                });

                const result = await response.json();
                if(result.error) {
                    setBioError(true);
                    setErrBio(result.message);
                } else {
                    // Log out the user on success
                    localStorage.clear()
                    dispatch(logout());
                }
            } catch(err) {
                setBioError(true);
                setErrBio("Error trying to update the bio");
            }
        }
    }

    const handleBioChange = (value) => {
        if(value.length === 0) {
            setBioError(true);
            setErrBio('Field cannot be empty')
        } else {
            
            setErrBio('');
            setBioError(false);
        }
        setBio(value);
    }

    const handlePasswordChange = async () => {
        setLoading(true);
        try {
            const response = await fetch('/user/password/update', {
                method : 'post',
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    username : user.username,
                    email : user.email,
                    oldPass : old,
                    newPass : newPass
                })
            });

            const result = await response.json();
            console.log(result);
            setLoading(false);
            if(!result.error) {
                //Log out the user on success
                localStorage.clear();
                dispatch(logout());
            } else {
                setPasswordErr(result.message);
            }
        } catch(err) {
            setLoading(false);
            setPasswordErr(err);
        }
    }



    if (props.logged) {
        return (
            <>
                <Container maxWidth="sm" >
                    <Card className={classes.root} raised>
                        <CardContent>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', margin: '10px 0' }}>
                                <Avatar className={classes.orange}>{user.username[0].toUpperCase()}</Avatar>
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'column', textAlign: 'left' }}>
                                    <Typography className={classes.pos} color="textSecondary">
                                        <PersonOutlineIcon /><strong>{user.username}</strong>
                                    </Typography>

                                    <Typography className={classes.pos} color="textSecondary">
                                        <EmailIcon /><strong>{user.email}</strong>
                                    </Typography>

                                    <Typography className={classes.pos} color="textSecondary">
                                        <PersonPinCircleIcon /><strong>{user.city}, {user.state}</strong>
                                    </Typography>

                                    <Typography className={classes.pos} color="textSecondary">
                                        <FaceIcon /><strong>{user.bio}</strong>
                                    </Typography>
                                </div>

                            </div>
                            <Divider />

                            <div style={{marginTop : 10}}>
                            
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>Update Bio</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TextField id="outlined-basic" label="Bio" variant="outlined" multiline style={{display : 'block'}} error={bioError} helperText={errBio} value={bio} onChange={(e) => handleBioChange(e.target.value)}/>
                                    <br/>
                                    <Button variant="contained" color="secondary" style={{marginLeft : 10}} onClick={() => handleUpdateBio()}>Update</Button>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>Change Password</Typography>
                                </AccordionSummary>
                                <div style={{display : 'flex', alignItems : 'center', justifyContent : 'center', flexDirection : 'column'}}>
                                    <span style={{color : 'red', display : 'block', fontFamily : 'sans-serif', padding : '10px 0'}}>{passwordErr}</span>
                                    <LinearProgress  color='secondary' style={{display : isLoading ? 'block' : 'none'}}/>
                                    <div style={{padding : '10px 0', display : 'flex', alignItems : 'flex-start', justifyContent : 'center', flexDirection : 'column'}}>
                                    <TextField style={{width : '100%', margin : '10px 10px'}}  label="Old password" variant="outlined" type="password" value={old} onChange={(e) => setOld(e.target.value)}/>
                                    <TextField style={{width : '100%', margin : '10px 10px'}} label="New password" variant="outlined" type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)}/>
                                    </div>
                                    <Button variant="contained" color="secondary" style={{padding : '10px 20px', textAlign : 'center', marginBottom : 5}} onClick={() => handlePasswordChange()}>Change</Button>
                                </div>
                            </Accordion>
                            
                            </div>
                        </CardContent>

                    </Card>
                </Container>





            </>

        )
    } else {
        localStorage.clear();
        history.push('/')
        return null;

    }

}