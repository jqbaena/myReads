import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookCardList from './BookCardList'
import { Link } from 'react-router-dom'


class Search extends React.Component {

    state = {
        query: '',
        books: [],
    }

    /**
     * @description ensures the component updated
     * @constructor
     * @param  {props} prevProps - old component props
     */
    componentDidUpdate(prevProps) {
        if (this.props.books !== prevProps.books) {
            this.updateShelf(this.state.books, this.props.books);
        }
    }

    /**
     * @description updates the query state value depending on searchbar value
     * @constructor
     * @param  {string} query - searchbar value
     */
    updateQuery = (query) => {
        this.setState(() => ({
            query: query.trim()
        }));
        if (query !== '') {
            this.searchQuery(query);
        }
    }

     /**
     * @description makes the search depending on query state value
     * @constructor
     * @param  {string} query - searchbar value
     */
    searchQuery = (query) => {
        BooksAPI.search(query, 20)
            .then(((books) => {
                if (books) {
                    this.updateShelf(books, this.props.books)
                }
            }), (this.setState(() => ({ books: [] }))))
    }

     /**
     * @description updates the shelf of the search books depending on user 
     * @constructor
     * @param  {string} searchBooks - array of books from the searchbar
     * @param  {string} myBooks - array of books from user
     */
    updateShelf = (searchBooks, myBooks) => {
        const containID = (book, id) => {
            return book.id === id
        }

        if (searchBooks.error !== 'empty query') {
            myBooks.forEach(book => {
                const index = searchBooks.findIndex(b => containID(b, book.id));
                if (index > -1) {
                    searchBooks[index] = book;
                }
            });

            this.setState(() => ({
                books: searchBooks,
            }))
        }
    }

    /**
     * @description makes the search depending on query state value
     * @constructor
     * @param  {string} query - searchbar value
     */
    includeQuery = (book, query) => {
        return book.title.toLowerCase().includes(query.toLowerCase());
    }

    render() {
        const { query, books } = this.state;

        const showingBooks = (query === '' || books.error === 'empty query' || books.length === 0)
            ? 'empty search'
            : books.filter((b) => this.includeQuery(b, query))

        const searchResult = (showingBooks !== 'empty search')
            ? <BookCardList books={showingBooks} handleChange={this.props.handleChange} />
            : <a>No results</a>

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search"> Close </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                            placeholder="Search by title or author"
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    {searchResult}
                </div>
            </div>
        );
    }
}

export default Search;