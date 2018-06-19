import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import SearchBooks from '../search-books'
import MyReads from '../my-reads'
import BookDetails from '../book-details'
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
  changeShelf = (bookToUpdate, newShelf) => {
    BooksAPI.get(bookToUpdate.id).then((bookToUpdate) => {
      // Change of shelf in the server
      BooksAPI.update(bookToUpdate, newShelf)

      // Change of shelf in the My Reads
      let newBooksArray = [];

      bookToUpdate.shelf = newShelf

      newBooksArray.push(bookToUpdate)

      this.state.books.forEach((book) => {
        if (book.id !== bookToUpdate.id) {
          newBooksArray.push(book)
        }
      })

      this.setState({books: newBooksArray})
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
        <Route path="/book" component={BookDetails} />
      </div>
    )
  }
}

export default BooksApp
