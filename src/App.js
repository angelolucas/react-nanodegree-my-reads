import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
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
  changeShelf = (bookId, e) => {
    const shelf = e.target.value

    BooksAPI.get(bookId).then((book) => {
      BooksAPI.update(book, shelf)
      this.getBooks()
    })
  }
  render() {
    return (
      <div className="app">
        <Route path="/search" component={SearchBooks} />
        {this.state.ready === true && (
          <Route exact path="/" render={() => (
            <ListBooks books={this.state.books} onChangeShelf={this.changeShelf} />
          )} />
        )}
      </div>
    )
  }
}

export default BooksApp
