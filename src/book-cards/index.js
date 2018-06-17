import React from 'react'
import PropTypes from 'prop-types'
import './index.css'

class BookCards extends React.Component {
  handleShelf = (BookId, shelf) => {
    this.props.onChangeShelf(BookId, shelf)
  }
  render() {
    const books = this.props.books

    return (
      <ol className="books-grid">
        {books.map((book, key) => (
          <li key={key}>
            <div className="book">
              <div className="book-top">
                {book.imageLinks ? (
                  <div
                    className="book-cover"
                    style={{backgroundImage: `url(${book.imageLinks.thumbnail})`}}
                    />
                ) : (
                  <div className="book-cover default-cover" />
                )}
                <div className="book-shelf-changer">
                  <select
                    onChange={(e) => this.handleShelf(book.id, e.target.value)}
                    value={book.shelf ? book.shelf : 'none'}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.subtitle}</div>
            </div>
          </li>
        ))}
      </ol>
    )
  }
}

BookCards.propTypes = {
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired
}

export default BookCards
