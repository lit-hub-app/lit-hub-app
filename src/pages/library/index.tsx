import { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from '@/styles/Library.module.scss';
import SearchBar from '../../common/components/SearchBar';

export default function LibraryPage() {

  const [books, setBooks] = useState<Array<BookInterface>>([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
  }, []);

  type BookInterface = {
    id: number,
    title: string,
    authors: Array<object>,
  };

  function updateBooks(results: Array<object>) {
    console.log('index got', results.results);
    const books: Array<object> = results.results;
    const newBooks: BookInterface[] = [];
    for (let i = 0; i < books.length; i++) {
      const newBook: BookInterface = {
        id: books[i].id,
        title: books[i].title,
        authors: books[i].authors,
      }
      newBooks.push(newBook);
    }
    setBooks(newBooks);
  }

  return (
    <div className='page-container'>
      <h1 className='page-header'>Library</h1>

      <div className='search-panel'>
        <SearchBar resultsHandler={updateBooks} />
        <div className='search-options'>
        </div>
      </div>

      <div id='library-books-container'>
        {
          books.map((book) => {
            return (
              <div key={book.id} className='library-book-div'>
                <h2>{book.title}</h2>
                {/* <h4>{book.authors ? book.authors[0] : ' '}</h4> */}
              </div>
            )
          })
        }
      </div>

    </div>
  );
}
