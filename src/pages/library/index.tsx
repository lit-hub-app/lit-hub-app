import { useState, useEffect } from 'react';
import axios from 'axios';

export default function LibraryPage() {

  const [books, setBooks] = useState<Array<BookInterface>>([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  function updateSearchKeyword(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setSearchKeyword(value);
  };

  function search(event: React.SyntheticEvent) {
    event.preventDefault();

    axios
      .get(`/api/searchBooks`, { params: { term: searchKeyword } })
      .then((response) => {
        console.log('found', response.data)
        const foundBooks: BookInterface[] = [];
        response.data.results.forEach((book) => {
          const newBook: BookInterface = {
            id: book.id,
            title: book.title,
            authors: book.authors ? book.authors : [],
          };
          foundBooks.push(newBook);
        });
        setBooks(foundBooks);
      })
      .catch((error) => (console.log('search books error', error)));

  };

  useEffect(() => {
    axios('api/getBooks')
      .then((response) => {
        const newBooks: BookInterface[] = [];
        response.data.results.forEach((book) => {
          const newBook: BookInterface = {
            id: book.id,
            title: book.title,
            authors: book.authors,
          };
          newBooks.push(newBook);
        });
        setBooks(newBooks);
      })
      .catch((error) => (console.log('api/getBooks', error)));
  }, []);

  interface BookInterface {
    id: number,
    title: string,
    authors: Array<object>,
  };

  return (
    <div>
      <h1>Library</h1>
      <div id='search-bar'>
        <h2>SEARCH</h2>
        <form onSubmit={search}>
          <input name='search-keyword' type='text' value={searchKeyword} onChange={updateSearchKeyword} />
          <button name='submit-button' type='submit'>SEARCH</button>
        </form>
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
