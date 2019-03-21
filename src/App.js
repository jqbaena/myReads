import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Read from './Read.js';
import CurrentlyReading from './CurrentlyReading';
import WantToRead from './WantToRead';
import SearchLinkButton from './SearchLinkButton';
import Search from './Search';
import { Route } from 'react-router-dom'


class BooksApp extends React.Component {

    state = {
        books: [],
    };

    /**
     * @description makes sure you load books when component did mount
     */
    componentDidMount() {
        BooksAPI.getAll()
            .then((books) => {
                this.setState(() => ({
                    books,
                }))
            })
    };

    /**
     * @description calls the API to get all the books updated
     * @constructor
     * @param {string} id - unique id of the book
     * @param {string} eventTargetValue - selected value of the book
     */
    handleChange = () => {
        BooksAPI.getAll()
            .then((books) => {
                this.setState(() => ({
                    books,
                }))
            })
    };

    render() {
        
        return (
            <div>
                <Route exact path='/' render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <CurrentlyReading
                            books={this.state.books}
                            handleChange={this.handleChange}
                        />
                        <Read
                            books={this.state.books}
                            handleChange={this.handleChange}
                        />
                        <WantToRead
                            books={this.state.books}
                            handleChange={this.handleChange} />
                        <SearchLinkButton />
                    </div>)}
                />
                <Route exact path='/search' render={() => (
                    <Search
                        books={this.state.books}
                        handleChange={this.handleChange}
                    />)}
                />
            </div>
        )
    }
}

export default BooksApp;
