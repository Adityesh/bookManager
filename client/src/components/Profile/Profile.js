import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import Masonry from 'react-masonry-css'
import { useDispatch, useSelector } from 'react-redux'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Container, TextField, InputAdornment, LinearProgress, Divider } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { SearchSharp } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Books from '../Tabs/Books';




export default (props) => {
    const isDark = useSelector(state => state.isDark);
    const dispatch = useDispatch();
    const history = useHistory();
    

    



    if (props.logged) {
        return (
            <>
                <Container maxWidth="lg" className={'MuiContainer-root MuiContainer-maxWidthMd ' + isDark ? 'bg-dark' : 'bg-light'} style={{ backgroundColor: isDark ? '#121212' : 'white', color: isDark ? 'white' : 'black', marginTop: 10, fontFamily: 'sans-serif' }}>
                    <Tabs>
                        <TabList>
                            <Tab><Button color="primary" style={{ color: isDark ? '#3f51b5' : 'black' }}>
                                Search for Books
</Button></Tab>
<Tab><Button color="primary" style={{ color: isDark ? '#3f51b5' : 'black' }}>
                                Your Books
</Button></Tab>
                            <Tab><Button color="primary" style={{ color: isDark ? '#3f51b5' : 'black' }}>
                                Requested
</Button></Tab>
                            <Tab><Button color="primary" style={{ color: isDark ? '#3f51b5' : 'black' }}>
                                Trade Requests
</Button></Tab>
                            <Tab><Button color="primary" style={{ color: isDark ? '#3f51b5' : 'black' }}>
                                Incoming Trade Requests
</Button></Tab>
                        </TabList>

                        <TabPanel>
                            <Books />
                        </TabPanel>
                        <TabPanel>
                            <h2>Your Books content 2</h2>
                        </TabPanel>
                        <TabPanel>
                            <h2>Any content 2</h2>
                        </TabPanel>
                        <TabPanel>
                            <h2>Any content 3</h2>
                        </TabPanel>
                        <TabPanel>
                            <h2>Any content 4</h2>
                        </TabPanel>
                    </Tabs>
                </Container>


            </>

        )
    } else {
        history.push('/login')
        return null;

    }

}