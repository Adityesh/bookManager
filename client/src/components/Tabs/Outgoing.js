import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { LinearProgress } from '@material-ui/core';
import TimerIcon from '@material-ui/icons/Timer';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { green, blue } from '@material-ui/core/colors';


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);



const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export default () => {
    const [isLoading, setLoading] = useState(false);
    const [searchBooks, setSearchBooks] = useState([]);

    useEffect(() => {
        setLoading(true);
        Promise.resolve(getOutgoingRequests());
        setLoading(false);
    }, [])


    useEffect(() => {
        getOutgoingRequests();
    }, [searchBooks]);


    const getOutgoingRequests = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        try {
            const response = await fetch('/books/all/outgoing', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: user.username,
                    email: user.email
                })
            });

            const result = await response.json();
            console.log(result);
            if (!result.error) {
                setSearchBooks(result.requests.reverse());

            } else {
                // Show snackbar and error


            }
        } catch (err) {
            console.log(err);
        }
    }



    const classes = useStyles();
    return (
        <div>
            <LinearProgress color="primary" style={{ display: isLoading ? 'block' : 'none' }} />

            <TableContainer component={Paper}>
                <Table stickyHeader className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>To</StyledTableCell>
                            <StyledTableCell ></StyledTableCell>
                            <StyledTableCell >Book Title</StyledTableCell>
                            <StyledTableCell >Book Author</StyledTableCell>
                            <StyledTableCell >Publish Date</StyledTableCell>
                            <StyledTableCell >Page Count</StyledTableCell>
                            <StyledTableCell >Status</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchBooks.length > 0 ? searchBooks.map((book, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell component="th" scope="row">
                                    {book.username}
                                </StyledTableCell>
                                <StyledTableCell align="left"><img sizes='' src={book.bookUrl} height={60} width={30} /></StyledTableCell>
                                <StyledTableCell align="left">{book.bookTitle}</StyledTableCell>

                                <StyledTableCell align="left">{book.bookAuthor}</StyledTableCell>
                                <StyledTableCell align="left">{book.bookDate}</StyledTableCell>
                                <StyledTableCell align="left">{book.pageCount}</StyledTableCell>
                                <StyledTableCell align="left">
                                    <div style={{display : 'flex', alignItems : 'center', justifyContent : 'space-around'}}>
                                    
                                    {(() => {
                                        if (book.status === 'Pending') {
                                            return (
                                                <TimerIcon style={{ color: blue[500], fontSize : 30 }}/>
                                            )
                                        } else if (book.status === 'Accepted') {
                                            return (
                                                <CheckCircleIcon fontSize={'small'} style={{ color: green[500],  fontSize : 30 }}/>
                                            )
                                        } else {
                                            return (
                                                <CancelIcon fontSize={'small'} color="secondary" style={{fontSize : 30 }}/>
                                            )
                                        }
                                    })()}
                                    {book.status}
                                    </div>
                                </StyledTableCell>
                            </StyledTableRow>
                        )) : null}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}