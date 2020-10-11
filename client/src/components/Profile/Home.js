import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import Masonry from 'react-masonry-css'
import 'react-tabs/style/react-tabs.css';
import { Container, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        minHeight: 400
    },
    media: {
        height: 150,
    },

    content: {
        height: 200
    }
});


const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
};


export default (props) => {
    const [books, setBooks] = useState([]);
    const classes = useStyles();



    useEffect(() => {
        Promise.resolve(getAllBooks());
    }, [])


    useEffect(() => {
        getAllBooks();
    }, [books]);

    const getAllBooks = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        try {

            const response = await fetch('/books/allbooks',  {
                method : 'post',
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    username : user.username,
                    email : user.email
                })
            });
            const result = await response.json();
            if (!result.error) {
                setBooks(result.books);
            } else {
                setBooks([]);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleRequestBook = async (item) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const body = {
            requestEmail : item.email, // User who is requesting
            bookTitle : item.bookTitle,
            userEmail : user.email, // Logged in user
            requestUsername : item.username
        }

        try {
            const response = await fetch('/books/new/request', {
                method : 'post',
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify(body)
            })
            const result = await response.json();
        } catch(err) {
            // Display a snackbar later
            console.log(err);
        }
    }




    const history = useHistory();
    if (props.logged) {
        return (
            <Container maxWidth="lg" className="home">
                <Masonry
                    style={{ marginTop: 20 }}
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid2"
                    columnClassName="my-masonry-grid_column2"
                >

                    {!books.length === 0 ? 'No Books Found' : books.map((item, index) => {

                        return (
                            <Card key={index} className={classes.root}>
                                <CardActionArea>

                                    <CardMedia
                                        className={classes.media}
                                        image={item.bookUrl}

                                    />

                                    <CardContent className={classes.content}>
                                        <Typography>
                                            {item.bookTitle}
                                        </Typography>
                                        <Typography>
                                            Pages : {item.pageCount}
                                        </Typography>
                                        <Typography  color="textSecondary" component="p">
                                            {!item.bookDescription ? 'No description available' : item.bookDescription}
                                        </Typography>
                                        <Typography  color="textSecondary" component="p" style={{ fontWeight: 'bold' }}>
                                            User : {item.username}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions style={{ display: 'flex', alignItem: 'center', justifyContent: 'center' }}>
                                    <Button size="large" variant="contained" color="primary"  onClick={() => handleRequestBook(item)}>
                                        Request from {item.username}
                            </Button>
                                </CardActions>
                            </Card>
                        )
                    })}

                </Masonry>
            </Container>
        )
    } else {
        history.push('/login')
        return null;

    }

}