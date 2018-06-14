import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends React.Component {
  state = {
    query: '',
    books: []
  }
  componentDidMount() {
    this.searchInput.focus();
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
              placeholder="Search by title or author"
              ref={(searchInput) => { this.searchInput = searchInput}}
              onChange={this.handlerSearch}
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
