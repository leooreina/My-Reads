import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookGrid extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  render() {
    const { books, updateShelf } = this.props

    return (
      <ol className="books-grid">
        {books.map(book => (
          <Book key={book.id} book={book} books={books} updateShelf={updateShelf}/>
        ))}
      </ol>
    )
  }
}

export default BookGrid
