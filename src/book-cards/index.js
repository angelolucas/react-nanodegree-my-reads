import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './index.css'

class BookCards extends React.Component {
  handleShelf = (bookToUpdate, newShelf) => {
    this.props.onChangeShelf(bookToUpdate, newShelf)
  }
  render() {
    const books = this.props.books

    return (
      <ol className="list-books">
        {books.map((book, key) => (
          <li key={key}>
            <div className="book-card">
              <div className="book-card__top">
                {book.imageLinks ? (
                  <div
                    className="book-card__cover"
                    style={{backgroundImage: `url(${book.imageLinks.thumbnail})`}}
                    />
                ) : (
                  <div className="book-card__cover book-card__cover--default" />
                )}
                <div className="book-card__shelf">
                  <select
                    onChange={(e) => this.handleShelf(book, e.target.value)}
                    value={book.shelf ? book.shelf : 'none'}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-card__title">{book.title}</div>
              <div className="book-card__authors">{book.subtitle}</div>
              <Link className="book-card__detail" to={"/book/" + book.id}>Book details</Link>
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
