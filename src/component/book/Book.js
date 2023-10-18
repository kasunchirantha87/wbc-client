import React,{useState,useEffect} from 'react';
import Header from '../header/Header';
import BookList from './BookList';
import axios  from 'axios';

const Book = () => {
    
    const [bookList, setBookList] = useState([]);
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        getBookList();
    },[]);

    const getBookList = () => {
    axios.get(`${BASE_URL}books`).then((response) => {
        setBookList(response.data);
    })
    .catch(error => {
        console.log(error);
    });
    }

    const updateTable = () => {
        getBookList();
      }

    return(
        <>
                <Header />
                <BookList data={bookList} updateTable = {updateTable}/>
        </>
    );
}

export default Book;