import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import * as yup from 'yup'
import { Button, Container, Typography } from '@material-ui/core'
import { Formik } from 'formik';
import {useSelector, useDispatch} from 'react-redux';
import { login, logout } from '../../actions/LogIn';


export default () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const isDark = useSelector(state => state.isDark);
    const history = useHistory();
    const SignupSchema = yup.object().shape({
        email: yup.string().required('Email cannot be empty'),
        password: yup.string().required('Password cannot be empty'),
    });

    
    
    return (
        <Container maxWidth="sm" style={{marginTop : 10}}>
            

                <div style={{padding : '0 20px'}} >
                <Typography variant="h5" component="h5" align="center" style={{color : isDark ? 'white' : 'black'}}>
                        Login to your account
                </Typography>
                    <Formik
                        validationSchema={SignupSchema}
                        initialValues={{ email: '', password: ''}}
                        onSubmit={(values, { setSubmitting }) => {
                            dispatch(login());
                            history.push('/home')
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
                </div>
            
            
            </Container>
    )
}