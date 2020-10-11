import React from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Container} from '@material-ui/core';
import { Button } from '@material-ui/core';
import Books from '../Tabs/Books';
import UserBooks from '../Tabs/UserBooks';
import Incoming from '../Tabs/Incoming';
import Outgoing from '../Tabs/Outgoing';
import Borrowed from '../Tabs/Borrowed';



export default (props) => {
    const isDark = useSelector(state => state.isDark);
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
                                Borrowed Books
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
                        <TabPanel forceRender>
                            <UserBooks />
                        </TabPanel>
                        <TabPanel forceRender>
                            <Borrowed />
                        </TabPanel>

                        <TabPanel>
                            <Outgoing />
                        </TabPanel>
                        <TabPanel>
                            <Incoming />
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