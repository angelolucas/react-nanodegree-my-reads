import React from 'react'
import PropTypes from 'prop-types'
import BookCards from '../book-cards'
import './index.css'

class BookShelf extends React.Component {
  handleShelf = (bookToUpdate, newShelf) => {
    this.props.onChangeShelf(bookToUpdate, newShelf)
  }
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf__title">{this.props.title}</h2>
        <BookCards
          books={this.props.books}
          onChangeShelf={this.handleShelf}
        />
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
