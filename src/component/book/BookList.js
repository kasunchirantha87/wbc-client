import React,{useState} from 'react';
import './book.css';
import { IconButton } from 'rsuite';
import EditIcon from '@rsuite/icons/Edit';
import EditBook from './EditBook';
import PlusIcon from '@rsuite/icons/Plus';
import AddBook from './AddBook';

const BookList = (props) => {
    const { data } = props;
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [bookId,setBookId] = useState('');
    const [bookName,setBookName] = useState('');
    const [author,setAuthor] = useState('');
    const [language,setLanguage] = useState(0);
    const [type,setType] = useState('');
    const [series,setSeries] = useState('');
    const [originalBook,setOriginalBook] = useState('');
    const [originalAuthor,setOriginalAuthor] = useState('');
    const [isAvailable,setIsAvailable] = useState(true);
    const [image,setImage] = useState('');

    const toggleEditModal = (show) => {
        setShowEditModal(show);
     }

    const toggleAddModal = (show) => {
        setShowAddModal(show);
     }

    const handleCellClick = (id,name,author,language,type,series,originalbook,originaauthor,image,isavailable) => {
        setShowEditModal(true);
        setBookId(id);
        setBookName(name);
        setAuthor(author);
        setLanguage(language);
        setType(type);
        setSeries(series);
        setOriginalBook(originalbook);
        setOriginalAuthor(originaauthor);
        setIsAvailable(isavailable);
        setImage(image);
      };
    
    const handleAddClick = () => {
        setShowAddModal(true);
    }
    

    return (
        <div style={{padding:"5px"}}>
            <div style={{float: "right",marginBottom: "5px"}}>
                <IconButton  appearance="primary" icon={<PlusIcon />}
                onClick={() => handleAddClick()}>Add New</IconButton></div>
            <div className="table-container">
                <table className="table">
                <thead>
                    <tr>
                    <th>Action</th>
                    <th>Name</th>
                    <th>Author</th>
                    <th>Language</th>
                    <th>Type</th>
                    <th>Series</th>
                    <th>Original Book</th>
                    <th>Original Author</th>
                    <th>Available</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                    <tr key={index}>
                        <td><IconButton icon={<EditIcon />} circle size="xs" onClick={() => 
                            handleCellClick(item.id,item.name,item.author,
                            item.language,item.type,item.series,item.original_book,item.original_author,item.image,item.isAvailable)} />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.author}</td>
                        <td>{item.language === 0 ? 'Sinhala' : 'English'}</td>
                        <td>{item.type}</td>
                        <td>{item.series}</td>
                        <td>{item.original_book}</td>
                        <td>{item.original_author}</td>
                        <td>{item.isAvailable === true ? "Yes" : "No"}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
                {showEditModal &&  <EditBook
                        show={showEditModal}
                        onToggle={toggleEditModal}
                        updateTable = {props.updateTable}
                        bookid = {bookId}
                        bookname = {bookName}
                        auth = {author}
                        lang = {language}
                        typ = {type}
                        seri = {series}
                        originalbook = {originalBook}
                        originalauthor = {originalAuthor}
                        isavailable = {isAvailable}
                        img = {image}
                    />}
                {showAddModal &&  <AddBook
                        show={showAddModal}
                        onToggle={toggleAddModal}
                        updateTable = {props.updateTable}
                    />}
            </div>
        </div>
      );
};

export default BookList;