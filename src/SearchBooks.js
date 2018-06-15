import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookSummaryCards from './BookSummaryCards';

class SearchBooks extends React.Component {
  state = {
    books: [],
    status: false
  }
  componentDidMount() {
    this.searchInput.focus();
  }
  handlerSearch = (e) => {
    if (e.target.value.length > 0) {
      BooksAPI.search(e.target.value).then((books) => {
        if (books.error === "empty query") {
          this.setState({
            status: 'noResult'
          })
        } else {
          this.setState({
            books,
            status: 'result'
          })
        }
      })
    } else {
      this.setState({
        status: ''
      })
    }
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
          { this.state.status === "result" &&
            <BookSummaryCards books={this.state.books} />
          }
          { this.state.status === "noResult" &&
            <div>
              <h2>No Results</h2>
              <p><strong>Suggestions:</strong> Android, Art, Artificial Intelligence, Astronomy, Austen, Baseball, Basketball, Bhagat, Biography, Brief, Business, Camus, Cervantes, Christie, Classics, Comics, Cook, Cricket, Cycling, Desai, Design, Development, Digital Marketing, Drama, Drawing, Dumas, Education, Everything, Fantasy, Film, Finance, First, Fitness, Football, Future, Games, Gandhi, Homer, Horror, Hugo, Ibsen, Journey, Kafka, King, Lahiri, Larsson, Learn, Literary Fiction, Make, Manage, Marquez, Money, Mystery, Negotiate, Painting, Philosophy, Photography, Poetry, Production, Programming, React, Redux, River, Robotics, Rowling, Satire, Science Fiction, Shakespeare, Singh, Swimming, Tale, Thrun, Time, Tolstoy, Travel, Ultimate, Virtual Reality, Web Development, iOS</p>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default SearchBooks
