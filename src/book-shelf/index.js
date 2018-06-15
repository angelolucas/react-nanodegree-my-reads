import React from 'react'
import PropTypes from 'prop-types'
import BookCards from '../book-cards'
import './index.css'

class BookShelf extends React.Component {
  handleShelf = (BookId, shelf) => {
    this.props.onChangeShelf(BookId, shelf)
  }
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <BookCards
            books={this.props.books}
            onChangeShelf={this.handleShelf}
          />
        </div>
      </div>
    )
  }
}

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired
}

export default BookShelf
