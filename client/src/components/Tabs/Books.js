import React, { useState } from 'react';
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
    const [value, setValue] = useState('');
    const [searchBooks, setSearchBooks] = useState([]);
    const [btnDisable, setBtnDisable] = useState(false);


    const handleChange = (value) => {

        setValue(value);

    }

    const handleSearch = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${value}&key=${API_KEY}`)
            const result = await response.json();
            const books = await result.items;
            setLoading(false);
            if(!books) {
                setSearchBooks('No books found');
            } else {
                setSearchBooks(books);
            }
            
            
        } catch(err) {
            console.log(err);
        }
    }


    const handleAddBook = async (item) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const bookObj = {
            username : user.username,
            email : user.email,
            bookTitle : item.volumeInfo.title,
            bookAuthor : !item.volumeInfo.authors ? 'N/A' : item.volumeInfo.authors[0],
            bookDate : !item.volumeInfo.publishedDate ? 'N/A' : item.volumeInfo.publishedDate,
            bookDescription : !item.volumeInfo.subtitle ? 'No description available' : item.volumeInfo.subtitle,
            bookUrl : !item.volumeInfo.imageLinks.thumbnail ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/No_image_available_450_x_600.svg/450px-No_image_available_450_x_600.svg.png' : item.volumeInfo.imageLinks.thumbnail,
            pageCount : !item.volumeInfo.pageCount ? 0 : item.volumeInfo.pageCount
        }

        try {
            setBtnDisable(true);
            const response = await fetch('/books/new', {
                method : "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(bookObj)
            })

            const result = await response.json();
            if(!result.error) {
                setBtnDisable(false);
            } else {
                // Show snackbar if error
                console.log(result)
                setBtnDisable(false);
            }
            
            

        } catch(err) {  
            console.log(err);
        }

        
    }


    return (
        <div style={{ fontFamily: 'sans-serif' }}>
            <TextField
                style={{ backgroundColor: 'white', width: '100%', padding: '10px 20px' }}
                id="input-with-icon-textfield"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchSharp />
                        </InputAdornment>
                    )
                }}
                placeholder={'Search for books'}
                value={value}
                onChange={e => handleChange(e.target.value)}
            />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Button variant="contained" color="primary" style={{ color: 'white', alignSelf: 'center', marginTop: 5 }} onClick={handleSearch}>SEARCH</Button>

            </div>
            <LinearProgress color="primary" style={{ display: isLoading ? 'block' : 'none' }} />
            <div>
                <h4>Retrieved Books</h4>
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
                                image={!item.volumeInfo.imageLinks ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/No_image_available_450_x_600.svg/450px-No_image_available_450_x_600.svg.png' : item.volumeInfo.imageLinks.thumbnail}
                                title="Contemplative Reptile"
                            />
                            
                            <CardContent className={classes.content}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {item.volumeInfo.title}
          </Typography>
          <Typography gutterBottom variant="span" component="span">
                                    Pages : {!item.volumeInfo.pageCount ? 'N/A' : item.volumeInfo.pageCount}
          </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {!item.volumeInfo.subtitle ? 'No description available' : item.volumeInfo.subtitle}
          </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions style={{display : 'flex', alignItem : 'center', justifyContent : 'center'}}>
                            <Button size="large" variant="contained" color="primary" onClick={() => handleAddBook(item)} disabled={btnDisable}>
                                ADD
                            </Button>
                        </CardActions>
                    </Card>
                        )
                    })}
                    
                </Masonry>

            </div>
            

        </div>
    )
}


export default Books;