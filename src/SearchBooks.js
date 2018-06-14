import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends React.Component {
  state = {
    query: '',
    books: []
  }
  handlerSearch = (e) => {
    BooksAPI.search(e.target.value).then((books) => {
      this.setState({
        books
      })
    })
  }
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              onChange={this.handlerSearch}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map((book, key) => (
              <li key="key">{book.title}</li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
