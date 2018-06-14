import React from 'react'
import BookSummaryCards from './BookSummaryCards'

class BookShelf extends React.Component {
  handleShelf = (BookId, e) => {
    this.props.onChangeShelf(BookId, e);
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
