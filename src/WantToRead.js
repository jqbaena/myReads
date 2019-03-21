import React from 'react'
import './App.css'
import BookCardList from './BookCardList';


const WantToRead = (props) => {

    const { books } = props;
    const showingBooks = books.length > 0
        ? <BookCardList books={books.filter(b => (b.shelf === 'wantToRead'))} handleChange={props.handleChange} />
        : <a>Add some books you are currently reading</a>;

    return (
        <div className="list-books-content">
            <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                    {showingBooks}
                </div>
            </div>
        </div>
    );

}

export default WantToRead;