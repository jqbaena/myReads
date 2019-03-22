import React from 'react'
import './App.css'
import BookCardList from './BookCardList';

const CurrentlyReading = (props) => {

    const { books } = props
    const showingBooks = books.length > 0
        ? <BookCardList
            books={books.filter((b) => (b.shelf === 'currentlyReading'))}
            handleChange={props.handleChange}
        />
        : <a>Add some books you are currently reading</a>

    return (
        <div className="list-books-content">
            <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                    {showingBooks}
                </div>
            </div>
        </div>
    );

}

export default CurrentlyReading;
