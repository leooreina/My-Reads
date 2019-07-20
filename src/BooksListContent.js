import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookGrid from './BookGrid'

function BooksListContent(props) {
  const { books, updateShelf } = props;
  const booksGrid = [
    {
      status: 'currentlyReading',
      title: 'Currently Reading'
    },
    {
      status: 'wantToRead',
      title: 'Want To Read'
    },
    {
      status: 'read',
      title: 'Read'
    }
  ]

  return (
    <div className="list-books-content">
      {booksGrid.map((shelf, index) => {
        const booksShelf = books.filter(book => book.shelf === shelf.status); // filter the shelf by book status
        return (
          <div className="bookshelf" key={index}>
            <h2 className="bookshelf-title">{shelf.title}</h2>
            <div className="bookshelf-books">
              <BookGrid books={booksShelf} updateShelf={updateShelf} />
            </div>
          </div>
        )}
      )}
    </div>
  )
}

// An array of books and a function to update the shelf are required
BooksListContent.propTypes = {
  books: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired
}

export default BooksListContent
