import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from '../BooksAPI'
import BookCards from '../book-cards';
import './index.css'

class SearchBooks extends React.Component {
  state = {
    searchedBooks: [],
    query: '',
    status: false
  }
  selector = {
    body: document.querySelector('body')
  }
  componentDidMount() {
    this.searchInput.focus()
  }
  componentWillUnmount() {
    this.selector.body.classList.remove('hide-my-reads')
  }
  handleShelf = (bookToUpdate, newShelf) => {
    // Change of shelf in the Searched Books
    this.state.searchedBooks.forEach((searchedBook) => {
      if (bookToUpdate.id === searchedBook.id)
        searchedBook.shelf = newShelf
    })

    // Change of shelf in the server and setState
    this.props.onChangeShelf(bookToUpdate, newShelf)
  }
  handleSearch = (query) => {
    this.setState({ query })

    BooksAPI.search(query).then((searchedBooks) => {
      if (searchedBooks) {
        this.selector.body.classList.add('hide-my-reads')

        if (!searchedBooks.error) {
          this.checkShelfOnSearch(searchedBooks);

          this.setState({
            searchedBooks,
            status: 'result'
          })

          window.scrollTo(0, 0);
        } else {
          this.setState({
            status: 'noResult'
          })
        }
      } else {
        this.selector.body.classList.remove('hide-my-reads');

        this.setState({
          status: 'emptyQuery'
        })
      }
    })
  }
  checkShelfOnSearch = (searchedBooks) => {
    const books = this.props.books

    for (let searchedBook of searchedBooks) {
      for (let book of books) {
        if (book.id === searchedBook.id) {
          searchedBook.shelf = book.shelf
        }
      }
    }

    return searchedBooks
  }
  render() {
    return (
      <div className="search-books">
        <div className="search-books__top">
          <Link to="/" className="search-books__go-back">Close</Link>
          <div className="search-books__input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              ref={(searchInput) => { this.searchInput = searchInput}}
              onChange={(e) => this.handleSearch(e.target.value)}
              value={this.state.query}
            />
          </div>
        </div>
        { this.state.status === "result" &&
          <div className="search-books__results">
            <BookCards
              books={this.state.searchedBooks}
              onChangeShelf={this.handleShelf}
            />
          </div>
        }
        { this.state.status === "noResult" &&
          <div className="search-books__results">
            <h2 className="search-books__title">No Results</h2>
            <p><strong>Suggestions:</strong> Android, Art, Artificial Intelligence, Astronomy, Austen, Baseball, Basketball, Bhagat, Biography, Brief, Business, Camus, Cervantes, Christie, Classics, Comics, Cook, Cricket, Cycling, Desai, Design, Development, Digital Marketing, Drama, Drawing, Dumas, Education, Everything, Fantasy, Film, Finance, First, Fitness, Football, Future, Games, Gandhi, Homer, Horror, Hugo, Ibsen, Journey, Kafka, King, Lahiri, Larsson, Learn, Literary Fiction, Make, Manage, Marquez, Money, Mystery, Negotiate, Painting, Philosophy, Photography, Poetry, Production, Programming, React, Redux, River, Robotics, Rowling, Satire, Science Fiction, Shakespeare, Singh, Swimming, Tale, Thrun, Time, Tolstoy, Travel, Ultimate, Virtual Reality, Web Development, iOS</p>
          </div>
        }
      </div>
    )
  }
}

SearchBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired
}

export default SearchBooks
