import React, { useState } from 'react';
import Masonry from 'react-masonry-css'
import 'react-tabs/style/react-tabs.css';
import { TextField, InputAdornment, LinearProgress, Divider, Button, Snackbar } from '@material-ui/core';
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
        maxWidth: 400,
        minHeight: 400
    },
    media: {
        height: 300,
    },

    content: {
        height: 150
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
    const [open, setOpen] = useState(false);
    const [openErr, setOpenErr] = useState(false);
    const [err, setErr] = useState('');


    const handleChange = (value) => {

        setValue(value);

    }

    const handleSearch = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${value}&key=${API_KEY}`)
            const result = await response.json();
            const books = await result.items;
            if(result.error) {
                setLoading(false);
                setErr(result.message);
                setOpenErr(true);
                setTimeout(() => {
                    setOpenErr(false);
                }, 2000)
            } else {
                if(!books) {
                    setSearchBooks('No books found');
                    setLoading(false);

                } else {
                    setSearchBooks(books);
                    setLoading(false);

                }

            }
            
            
            
        } catch(err) {
            
            setLoading(false);
                setErr(err);
                setOpenErr(true);
                setTimeout(() => {
                    setOpenErr(false);
                }, 2000)
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
                <Button variant="contained" color="primary" style={{ color: 'white', alignSelf: 'center', marginTop: 5, marginBottom : 5 }} onClick={handleSearch}>SEARCH</Button>

            </div>
            <LinearProgress color="primary" style={{ display: isLoading ? 'block' : 'none' }} />
            <div>
                <Typography variant="h5" gutterBottom style={{margin : '5px 0'}}>
                            Search Results
                </Typography>
                <Divider />
                <Masonry
                style={{marginTop : 10, marginRight : 10}}
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
            <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{vertical : 'bottom', horizontal : 'center'}} message="Login success">
            </Snackbar>

            <Snackbar open={openErr} autoHideDuration={6000} message={err}>
            </Snackbar>

        </div>
    )
}


export default Books;