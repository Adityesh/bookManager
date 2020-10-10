import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import Masonry from 'react-masonry-css'
import { useDispatch, useSelector } from 'react-redux'
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
        try {
            
            const response = await fetch('http://localhost:5000/books/allbooks');
            const result = await response.json();
            
            if(!result.error) {
                setBooks(result.books);
            } else {
                setBooks([]);
            }
        } catch(err) {
            console.log(err);
        }
    }




    const history = useHistory();
    if(props.logged) {
        return(
            <Container maxWidth="lg" className="home">
                <Masonry
                style={{marginTop : 20}}
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
            </Container>
        )
    } else {
        history.push('/login')
        return null;
        
    }
    
}