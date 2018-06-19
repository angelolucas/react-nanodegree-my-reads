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
      // Change of shelf in the server
      BooksAPI.update(book, shelf)

      // Change of shelf in the UI
      let updateBooks = [];

      this.state.books.map((book) => {
        if (book.id === bookId)
        book.shelf = shelf

        updateBooks.push(book)
      })

      this.setState({books: updateBooks})
    })
  }
  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBooks books={this.state.books} onChangeShelf={this.changeShelf} />
        )} />
        {this.state.ready && (
          <Route path="/" render={() => (
            <MyReads books={this.state.books} onChangeShelf={this.changeShelf} />
          )} />
        )}
      </div>
    )
  }
}

export default BooksApp
