import { useState, useEffect } from 'react';

export default function LibraryPage() {

  const [books, setBooks] = useState<Array<BookInterface>>([]);

  useEffect(() => {
    console.log('use effect invoked')
    void fetch('api/getBooks')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data)
        const newBooks: BookInterface[] = [];
        data.results.forEach((book) => {
          const newBook: BookInterface = {
            id: book.id,
            title: book.title,
            authors: book.authors,
          };
          newBooks.push(newBook);
        });
        console.log(newBooks)
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
      <div id='library-books-container'>
        {
          books.map((book) => {
            return (
              <div key={book.id} className='library-book-div'>
                <h2>{book.title}</h2>
                <h4>{book.authors[0].name}</h4>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}