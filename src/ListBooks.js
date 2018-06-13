import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'

class ListBooks extends React.Component {
  state = {
    ready: false,
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books,
        ready: true
      })
    })
  }
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {this.state.ready === true && (
            <div>
              <BookShelf title="Currently Reading" shelf="currentlyReading" books={this.state.books} />
              <BookShelf title="Want to Read" shelf="wantToRead" books={this.state.books} />
              <BookShelf title="Read" shelf="read" books={this.state.books} />
            </div>
          )}
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
