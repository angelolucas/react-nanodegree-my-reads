import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from '../book-shelf'
import './index.css'

class MyReads extends React.Component {
  handleShelf = (bookToUpdate, newShelf) => {
    this.props.onChangeShelf(bookToUpdate, newShelf)
  }
  render() {
    return (
      <div className="my-reads">
        <div className="my-reads__top">
          <h1 className="my-reads__title">MyReads</h1>
          <Link className="my-reads__search" to="/search">Add a book</Link>
        </div>
        <div className="my-reads__content">
          <BookShelf
            title="Currently Reading"
            onChangeShelf={this.handleShelf}
            books={this.props.books.filter(book => book.shelf === 'currentlyReading')}
          />
          <BookShelf
            title="Want to Read"
            onChangeShelf={this.handleShelf}
            books={this.props.books.filter(book => book.shelf === 'wantToRead')}
          />
          <BookShelf
            title="Read"
            onChangeShelf={this.handleShelf}
            books={this.props.books.filter(book => book.shelf === 'read')}
          />
        </div>
      </div>
    )
  }
}

MyReads.propTypes = {
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired
}

export default MyReads
