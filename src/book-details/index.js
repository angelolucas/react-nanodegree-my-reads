import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
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
  handleShelf = (bookToUpdate, newShelf) => {
    this.props.onChangeShelf(bookToUpdate, newShelf)

    bookToUpdate.shelf = newShelf;

    this.setState({book: bookToUpdate})
  }
  render() {
    const book = this.state.book

    return(
      <div className="book-details">
        <Link to="/" className="book-details__go-back">Back</Link>
        {this.state.book && (
          <main className="book-details__content">
            <div className="book-details__top">
              <h1 className="book-details__title">{book.title}</h1>
              <div className={"book-details__shelf " + (book.shelf === "none" ? "book-details__shelf--add" : "book-details__shelf--change")}>
                <select
                  onChange={(e) => this.handleShelf(book, e.target.value)}
                  value={book.shelf ? book.shelf : 'none'}>
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <h2 className="book-details__subtitle">{book.subtitle}</h2>
            <ul className="book-details__info">
              <li>{book.authors}</li>
              <li>{book.publishedDate}</li>
              <li>{book.categories}</li>
              <li>{book.pageCount} pages</li>
              <li>{book.publisher}</li>
            </ul>
            {book.imageLinks && (
              <img className="book-details__cover" src={book.imageLinks.thumbnail} alt="Book cover" />
            )}
            <p className="book-details__description">{book.description}</p>
            <a className="book-details__link" href={book.infoLink} target="_blank">See on Google Books</a>
          </main>
        )}
      </div>
    )
  }
}
BookDetail.propTypes = {
  onChangeShelf: PropTypes.func.isRequired
}

export default BookDetail
