import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import MyReads from './my-reads'
import './App.css'

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
        {this.state.ready === true && (
          <Route exact path="/" render={() => (
            <MyReads books={this.state.books} onChangeShelf={this.changeShelf} />
          )} />
        )}
      </div>
    )
  }
}

export default BooksApp
