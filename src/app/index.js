import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import SearchBooks from '../search-books'
import MyReads from '../my-reads'
import './index.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    ready: false
  }
  componentDidMount() {
    this.getBooks()
  }
  getBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books,
        ready: true
      })
    })
  }
  changeShelf = (bookId, shelf) => {
    BooksAPI.get(bookId).then((book) => {
      BooksAPI.update(book, shelf)
      this.getBooks()
    })
  }
  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBooks onChangeShelf={this.changeShelf} />
        )} />
        {this.state.ready && (
          <Route exact path="/" render={() => (
            <MyReads books={this.state.books} onChangeShelf={this.changeShelf} />
          )} />
        )}
      </div>
    )
  }
}

export default BooksApp
