import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookShelfChanger extends Component {
  // An object book, an array of books and a function to update the shelf are required
  static propTypes = {
    book: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  /* Receive what option has been marked (event) and update the
  book shelf according to this
  */
  changeShelf = (event) => {
    let props = this.props
    let value = event.target.value
    props.updateShelf(props.book, value)
  }

  render() {
    let defaultShelf = 'none'; // default shelf receive 'none' as value
    const { book, books } = this.props

    /* If the option marked is the same it's in*/
    let bookItem;
    for (bookItem of books) {
      if (bookItem.id === book.id) {
        defaultShelf = bookItem.shelf
        
      }
    }

    return (
      <div className="book-shelf-changer">
        <select onChange={this.changeShelf} defaultValue={defaultShelf}> // call changeShelf method on change
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default BookShelfChanger
