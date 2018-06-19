import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import './index.css'

class BookDetail extends React.Component {
  state = {
    book: ''
  }
  selector = {
    body: document.querySelector('body')
  }
  componentDidMount = () => {
    const bookId = document.location.pathname.split("/book/").pop()

    BooksAPI.get(bookId).then((book) => {
      this.setState({ book })
    })

    this.selector.body.classList.add('hide-my-reads')
  }
  componentWillUnmount() {
    this.selector.body.classList.remove('hide-my-reads')
  }
  render() {
    const book = this.state.book

    return(
      <div className="book-details">
        <div className="book-details__top">
          <Link to="/" className="book-details__go-back">Back</Link>
          <h1 className="book-details__title">{book.title}</h1>
        </div>
        <main className="book-details__content">
          <h2>{book.subtitle}</h2>
          <p>{book.authors}</p>
          <p>{book.publishedDate}</p>
          <p>{book.categories}</p>
          <p>{book.pageCount} pages</p>
          <p>{book.publisher}</p>
          {book.imageLinks && (
            <img className="book-details__cover" src={book.imageLinks.thumbnail} alt="Book cover" />
          )}
          <p>{book.description}</p>
          <a href={book.infoLink} target="_blank">see more</a>
        </main>
      </div>
    )
  }
}

export default BookDetail
