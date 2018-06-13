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
            <BookShelf shelf="currentlyReading" books={this.state.books} />
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
