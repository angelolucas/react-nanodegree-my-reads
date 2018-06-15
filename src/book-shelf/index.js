import React from 'react'
import BookSummaryCards from '../BookSummaryCards'
import './index.css'

class BookShelf extends React.Component {
  handleShelf = (BookId, shelf) => {
    this.props.onChangeShelf(BookId, shelf)
  }
  render() {
    const books = this.props.books.filter(book => book.shelf === this.props.shelf);

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <BookSummaryCards
            books={books}
            onChangeShelf={this.handleShelf}
          />
        </div>
      </div>
    )
  }
}

export default BookShelf
