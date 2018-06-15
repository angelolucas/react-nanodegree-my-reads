import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from '../BookShelf'
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

export default MyReads
