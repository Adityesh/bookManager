import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import * as yup from 'yup'
import { Button, Container, Typography, Snackbar, LinearProgress } from '@material-ui/core'
import { Formik } from 'formik';
import {useSelector, useDispatch} from 'react-redux';
import { login, logout } from '../../actions/LogIn';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


export default () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const isDark = useSelector(state => state.isDark);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [openErr, setOpenErr] = useState(false);
    const [err, setErr] = useState('');
    const history = useHistory();
    const SignupSchema = yup.object().shape({
        email: yup.string().required('Email cannot be empty'),
        password: yup.string().required('Password cannot be empty'),
    });

    const handleLogin = async ({email, password}) => {
        try {
            setLoading(true);
            const response = await fetch('/user/login', {
                method : 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    email,
                    password
                })
            })

            const result = await response.json();
            if(result.error) {
                setLoading(false);
                setErr(result.message);
                setOpenErr(true);
                setTimeout(() => {
                    setOpenErr(false);
                }, 2000)
            } else {
                setOpen(true);
                setLoading(false);
                localStorage.setItem('user', JSON.stringify(result.user))
                setTimeout(() => {
                    setOpen(false);
                    dispatch(login());
                    history.push('/home')
                }, 2000)
            }
            
            


        } catch(err) {
            setLoading(false);
                setErr("Error trying to login");
                setOpenErr(true);
                setTimeout(() => {
                    setOpenErr(false);
                }, 2000)
        }

    }
    
    return (
        <Container maxWidth="sm" style={{marginTop : 10}}>
            
            <Card style={{ marginTop: 50 }} variant="outlined">
            <CardContent>
                <Typography variant="h5" component="h5" align="center" >
                        Login to your account
                </Typography>
                    <Formik
                        validationSchema={SignupSchema}
                        initialValues={{ email: '', password: ''}}
                        onSubmit={(values, { setSubmitting }) => {
                            handleLogin(values);
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            resetForm
                        }) => (

                                <form onSubmit={handleSubmit}>

                                    <div style={{ marginBottom: 10 }}>
                                        <TextField
                                            fullWidth
                                            error={false}
                                            label="Email Address"
                                            onChange={handleChange('email')}
                                            value={values.email}
                                            helperText={errors.email}
                                            
                                        />
                                    </div>
                                    <div style={{ marginBottom: 10 }}>
                                        <TextField
                                            fullWidth
                                            error={false}
                                            label="Password"
                                            type="password"
                                            onChange={handleChange('password')}
                                            value={values.password}
                                            helperText={errors.password}
                                        />
                                    </div>
                                    
                                    <div style={{display : 'flex', alignItems : 'center', justifyContent : 'center', marginBottom : 10}}>
                                        <Button variant="contained" color="primary" style={{marginRight : 10}} onClick={resetForm}>RESET</Button>
                                        <Button variant="contained" color="primary" style={{marginRight : 10}} type="submit">LOGIN</Button>
                                    </div>
                                </form>
                                
                            )}

                    </Formik>
                    </CardContent>
                    <LinearProgress color="primary" style={{display : loading ? 'block' : 'none'}}/>

            </Card>
            <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{vertical : 'bottom', horizontal : 'center'}} message="Login success">
            </Snackbar>

            <Snackbar open={openErr} autoHideDuration={6000} message={err}>
            </Snackbar>
            
            </Container>
    )
}