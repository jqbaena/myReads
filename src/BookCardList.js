import React from 'react'
import './App.css'
import BookCard from './BookCard';

const BookCardList = (props) => {

    const { books } = props;
    
    /**
     * @description  checks if book has thumbnail
     * @constructor  
     * @param {} book - book Object
     */
    const checkThumbnailUndefined = (book) => {
        return (typeof book.imageLinks !== 'undefined') ? book.imageLinks.smallThumbnail : 'undefined';
    }

    return (
        <ol className="books-grid">
            {books.map(book => (
                <li key={book.id} >
                    <BookCard
                        bookShelf={book.shelf}
                        thumbnail={checkThumbnailUndefined(book)}
                        bookTitle={book.title}
                        bookAuthors={book.authors}
                        id={book.id}
                        handleChange={props.handleChange}
                    />
                </li>
            ))}
        </ol>
    );

}

export default BookCardList;