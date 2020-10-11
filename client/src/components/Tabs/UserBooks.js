import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css'
import 'react-tabs/style/react-tabs.css';
import { LinearProgress, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import dotenv from 'dotenv';

dotenv.config();

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

const Books = () => {
    const classes = useStyles();
    const [isLoading, setLoading] = useState(false);
    const [searchBooks, setSearchBooks] = useState([]);



    const getUserBooks = async () => {
        const user = JSON.parse(localStorage.getItem('user'));

        try {
            const response = await fetch('/books/all', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: user.username,
                    email: user.email
                })
            })

            const result = await response.json();
            if (!result.error) {
                setSearchBooks(result.books.reverse());

            } else {
                // Show snackbar and error
                

            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        setLoading(true);
        Promise.resolve(getUserBooks());
        setLoading(false);
    }, [])


    useEffect(() => {
        getUserBooks();
    }, [searchBooks]);








    return (
        <div style={{ fontFamily: 'sans-serif' }}>

            <LinearProgress color="primary" style={{ display: isLoading ? 'block' : 'none' }} />
            <div>
                <h4>Your Books</h4>
                <Divider />
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >

                    {!searchBooks.map ? 'No Books Found' : searchBooks.map((item, index) => {


                        return (
                            <Card key={index} className={classes.root}>
                                <CardActionArea>

                                    <CardMedia
                                        className={classes.media}
                                        image={item.bookUrl}

                                    />

                                    <CardContent className={classes.content}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {item.bookTitle}
                                        </Typography>
                                        <Typography gutterBottom variant="span" component="span">
                                            Pages : {item.pageCount}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {!item.bookDescription ? 'No description available' : item.bookDescription}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>

                            </Card>
                        )
                    })}

                </Masonry>

            </div>


        </div>
    )
}


export default Books;