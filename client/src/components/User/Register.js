import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import * as yup from 'yup'
import { Button, Container, Typography } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import Snackbar from '@material-ui/core/Snackbar';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Formik } from 'formik';

export default () => {
    const history = useHistory();


    const SignupSchema = yup.object().shape({
        email: yup.string().email('Invalid email').required('Email cannot be empty'),
        username : yup.string().required('Username cannot be empty').min(5, 'Too short'),
        password: yup.string().min('6', 'Too short').required('Password cannot be empty'),
        repass :yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Cannot be empty'),
        city: yup.string().required('City cannot be empty'),
        state: yup.string().required('State cannot be empty'),
        bio: yup.string()

    });

    return (
        <Container maxWidth="sm" style={{backgroundColor : '#121212'}}>
            <Card style={{ marginTop: 50 }} variant="outlined" style={{backgroundColor : '#121212', color : 'white'}}>

                <CardContent>
                    <Typography variant="h5" component="h5" align="center">
                        Register your account
                </Typography>
                    <Formik
                        validationSchema={SignupSchema}
                        initialValues={{ email: '', username: '', password: '', repass: '', city: '', state: '', bio: '' }}
                        onSubmit={(values, { setSubmitting }) => {
                            console.log(values)
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

                                    <div style={{ marginBottom: 10}}>
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
                                            label="Username"
                                            onChange={handleChange('username')}
                                            value={values.username}
                                            helperText={errors.username}
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
                                    <div style={{ marginBottom: 10 }}>
                                        <TextField
                                            fullWidth
                                            error={false}
                                            label="Re-type Password"
                                            type="password"

                                            onChange={handleChange('repass')}
                                            value={values.repass}
                                            helperText={errors.repass}
                                        />
                                    </div>
                                    <div style={{ marginBottom: 10 }}>
                                        <TextField
                                            fullWidth
                                            error={false}
                                            label="City"
                                            onChange={handleChange('city')}
                                            value={values.city}
                                            helperText={errors.city}
                                        />
                                    </div>
                                    <div style={{ marginBottom: 10 }}>
                                        <TextField
                                            fullWidth
                                            error={false}
                                            label="State"
                                            onChange={handleChange('state')}
                                            value={values.state}
                                            helperText={errors.state}
                                        />
                                    </div>
                                    <div style={{ marginBottom: 10 }}>
                                        <TextField
                                            fullWidth
                                            error={false}
                                            label="Bio (optional)"
                                            onChange={handleChange('bio')}
                                            value={values.bio}
                                            helperText={errors.bio}
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
            </Card>
            
        </Container>
    )
}