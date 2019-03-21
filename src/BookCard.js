import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'


const BookCard = props => {

    const { id, thumbnail, bookTitle, bookAuthors, bookShelf } = props;
    const authors = typeof bookAuthors !== 'undefined'
        ? bookAuthors.join(', ')
        : 'unknown';
    const shelf = typeof bookShelf === 'undefined' ? 'none' : bookShelf;
    
    
    /**
     * @description search the book and update shelf
     * @constructor
     * @param {string} id - unique id of the book
     * @param {string} eventTargetValue - selected value of the book
     */
    const handleChange = (id, e) => {
        BooksAPI.get(id)
            .then((book) => {
                BooksAPI.update(book, e.toString())
                    .then(() => {
                        props.handleChange();
                    })
            })
    }

    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}></div>
                <div className="book-shelf-changer">
                    <select value={shelf} onChange={(event) => handleChange(id, event.target.value)}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{bookTitle}</div>
            <div className="book-authors">{authors}</div>
        </div>
    );

}

export default BookCard;