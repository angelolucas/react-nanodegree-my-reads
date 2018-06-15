import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from '../book-shelf'
import './index.css'

class MyReads extends React.Component {
  handleShelf = (BookId, shelf) => {
    this.props.onChangeShelf(BookId, shelf)
  }
  render() {
    return (
      <div className="my-reads">
        <div className="my-reads-title">
          <h1>MyReads</h1>
        </div>
        <div className="my-reads-content">
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
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default MyReads
