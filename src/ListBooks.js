import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class ListBooks extends React.Component {
  handleShelf = (BookId, e) => {
    this.props.onChangeShelf(BookId, e);
  }
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf
            title="Currently Reading"
            shelf="currentlyReading"
            books={this.props.books}
            onChangeShelf={this.handleShelf}
          />
          <BookShelf
            title="Want to Read"
            shelf="wantToRead"
            books={this.props.books}
            onChangeShelf={this.handleShelf}
          />
          <BookShelf
            title="Read"
            shelf="read"
            books={this.props.books}
            onChangeShelf={this.handleShelf}
          />
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
