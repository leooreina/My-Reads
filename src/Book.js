import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookShelfChanger from './BookShelfChanger'

function Book(props) {
  const { book, books, updateShelf } = props;
  const title = book.title ? book.title : 'No title available';
  const bookCover =
    book.imageLinks && book.imageLinks.thumbnail
      ? book.imageLinks.thumbnail
      : 'No Image';

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
          className="book-cover"
          style={{
            width: 128,
            height: 192,
            backgroundImage: `url(${bookCover})`
          }}>
          </div>
          <BookShelfChanger book={book} books={books} updateShelf={updateShelf} />
        </div>
        <div className="book-title">{title}</div>
        {book.authors && book.authors.map((author, index) => (
          <div className="book-authors" key={index}>
            {author}
          </div>
        ))}
      </div>
    </li>
  )
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired
}

export default Book
