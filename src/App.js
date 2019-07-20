import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import BooksListContent from './BooksListContent'
import SearchPage from './SearchPage'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }

  // Take all books from BooksAPI
  componentDidMount() {
    BooksAPI.getAll()
    .then(books =>
      this.setState({ books })
    )
  }

  /*
  A function that takes two arguments:
  - the moving book
  - for what shelf it's going to

  Then, it's called the update API method to concat
  the book to the new shelf
  */
  updateShelf = (movingBook, shelf) => {
    BooksAPI.update(movingBook, shelf).then(response => {
      movingBook.shelf = shelf
      this.setState(pastState => ({
        books: pastState.books
          .filter(book => book.id !== movingBook.id)
          .concat(movingBook)
      }))
    })
  }


  render() {
    const { books } = this.state

    return (
      <div className="app">
        <Route // If it's in the search page, render the page below
          path='/search'
          render={() => (
          <SearchPage
            books = {books} // This takes the books
            updateShelf={this.updateShelf} // This takes the updateShelf method
          />
        )}/>

        <Route // If it's in the My Reads page, render the page below
          exact
          path='/'
          render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <BooksListContent // Here are the three shelfs (currently Reading, Want to Read and Read)
              books = {books} // This takes the books
              updateShelf = {this.updateShelf} // This takes the updateShelf method
            />
            <Link className='open-search' to='/search'> /* Link to the search page in the bottom of My Reads page */
              Add Book
            </Link>
          </div>
          )}
        />
      </div>
    )
  }
}

export default BooksApp
