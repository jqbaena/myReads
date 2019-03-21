import React from 'react'
import './App.css'
import {Link} from 'react-router-dom'

const SearchLinkButton = () => {
    return <Link to='/search' className="open-search">Add a book</ Link>;
}

export default SearchLinkButton;