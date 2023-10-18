import React,{useState,useEffect} from 'react';
import Header from '../header/Header';
import axios  from 'axios';
import './Home.css';

const Home = () => {

    const [bookList, setBookList] = useState([]);
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const imagePath = `images/`;

    useEffect(() => {
        axios.get(`${BASE_URL}books`).then((response) => {
            setBookList(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    },[]);

    return(
            <>
                <Header />
                <img></img>
                <div className='row' style={{margin:"0px"}}>
                    {bookList.map((book, index) => (
                        <div key={book.id} style={{padding:'5px'}}>
                            <div className="book-container">
                                <img className="book-image" src={`${imagePath}/${book.id}/${book.image}`} alt="Book Cover" />
                                <div className="book-details">
                                    <h2 className="book-title">{book.name}</h2>
                                    <p className="book-author">{book.author}</p>
                                </div>
                                </div>
                        </div>
                    ))}
                </div>
                
            </>
    );
}

export default Home;