import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from '../BooksAPI'
import BookCards from '../book-cards';
import './index.css'

class SearchBooks extends React.Component {
  state = {
    query: '',
    books: [],
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
  handleShelf = (BookId, shelf) => {
    this.props.onChangeShelf(BookId, shelf)
  }
  handleSearch = (query) => {
    this.setState({ query })

    BooksAPI.search(query).then((books) => {
      if (books) {
        this.selector.body.classList.add('hide-my-reads')

        if (!books.error) {
          window.scrollTo(0, 0);

          this.setState({
            books,
            status: 'result'
          })
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
              onChange={(e) => this.handleSearch(e.target.value)}
              value={this.state.query}
            />
          </div>
        </div>
        { this.state.status === "result" &&
          <div className="search-books-results">
            <BookCards
              books={this.state.books}
              onChangeShelf={this.handleShelf}
            />
          </div>
        }
        { this.state.status === "noResult" &&
          <div className="search-books-results">
            <h2>No Results</h2>
            <p><strong>Suggestions:</strong> Android, Art, Artificial Intelligence, Astronomy, Austen, Baseball, Basketball, Bhagat, Biography, Brief, Business, Camus, Cervantes, Christie, Classics, Comics, Cook, Cricket, Cycling, Desai, Design, Development, Digital Marketing, Drama, Drawing, Dumas, Education, Everything, Fantasy, Film, Finance, First, Fitness, Football, Future, Games, Gandhi, Homer, Horror, Hugo, Ibsen, Journey, Kafka, King, Lahiri, Larsson, Learn, Literary Fiction, Make, Manage, Marquez, Money, Mystery, Negotiate, Painting, Philosophy, Photography, Poetry, Production, Programming, React, Redux, River, Robotics, Rowling, Satire, Science Fiction, Shakespeare, Singh, Swimming, Tale, Thrun, Time, Tolstoy, Travel, Ultimate, Virtual Reality, Web Development, iOS</p>
          </div>
        }
      </div>
    )
  }
}

SearchBooks.propTypes = {
  onChangeShelf: PropTypes.func.isRequired
}

export default SearchBooks
