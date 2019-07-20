import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchPage extends Component {
  // An array of books and a function to update the shelf are required
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  // form and searched books are empty in the beginning
  state = {
    query: '',
    searchedBooks: []
  };

  // function to update the results according to the event (that is passed by the form)
  updateBooks = (event) => {
    const query = event.target.value
    this.setState({ query })

    // if the form has any value, show the results for that search
    if (query) {
      BooksAPI.search(query.trim(), 20)
      .then(books => {
        books.length > 0
          ? this.setState({ searchedBooks: books })
          : this.setState({ searchedBooks: [] })
      });
    } else { this.setState({ searchedBooks: [] }) } // else, show all books
  }

  render() {
    const { query, searchedBooks } = this.state
    const { books, updateShelf } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className='close-search'> // back to the main page
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={this.updateBooks}/>
          </div>
        </div>
        <div className="search-books-results">
          {searchedBooks.length > 0 && ( // if searchedBooks array is not empty render this below
            <div>
              <ol className="books-grid">
                {searchedBooks.map(book => (
                  <Book
                    book={book}
                    books={books}
                    key={book.id}
                    updateShelf={updateShelf}
                  />
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default SearchPage
