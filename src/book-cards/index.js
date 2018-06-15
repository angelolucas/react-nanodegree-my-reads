import React from 'react'
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
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 192,
                    backgroundImage: `url(${book.imageLinks.thumbnail})`
                }} />
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

export default BookCards
