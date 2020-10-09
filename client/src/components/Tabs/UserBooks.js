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
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.REACT_APP_API_KEY;
const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        minHeight : 400
    },
    media: {
        height: 150,
    },

    content : {
        height : 200
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
        setLoading(true);
    }


    useEffect(() => {
        getUserBooks();
    })
    

    


    


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
                                image={item.volumeInfo.imageLinks.thumbnail}
                                
                            />
                            
                            <CardContent className={classes.content}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {item.volumeInfo.title}
          </Typography>
          <Typography gutterBottom variant="span" component="span">
                                    Pages : {item.volumeInfo.pageCount}
          </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {!item.volumeInfo.subtitle ? 'No description available' : item.volumeInfo.subtitle}
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