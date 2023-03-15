import { useState, useEffect } from 'react';
import SearchBar from '../../common/components/SearchBar';
import { getBooks } from '../../modules/gutendex';
import BookCard from '../../common/components/BookCard';

export default function LibraryPage() {

  const [books, setBooks] = useState<Array<BookType>>([]);

  useEffect(() => {
    getBooks()
      .then((data) => {
        updateBooks(data)
      })
      .catch((error) => (console.log(error)));
  }, []);

  type BookInterface = {
    id: number,
    title: string,
    authors: Array<object>,
    cover_photo: string,
  };

  type BookType = {
    id: number,
    title: string,
    subjects: Array<string>,
    authors: Array<PersonType>,
    translators: Array<PersonType>,
    bookshelves: Array<string>,
    languages: Array<string>,
    copyright: boolean | null,
    media_type: string,
    formats: FormatType,
    download_count: number
  };

  type PersonType = {
    birth_year: number | null,
    death_year: number | null,
    name: string
  };

  type FormatType = {
    MimeType: string
  };

  type MimeType = 'application/epub+zip' | '';

  type ResultsType = {
    count: number,
    next: string | null,
    previous: string | null,
    results: Array<BookType>
  };

  function updateBooks(results: ResultsType) {
    console.log('index got', results.results);
    const books: Array<BookType> = results.results;

    // const newBooks: BookInterface[] = [];

    // for (let i = 0; i < books.length; i++) {
    //   const newBook: BookType = {
    //     id: books[i].id,
    //     title: books[i].title,
    //     subjects:
    //       authors: books[i].authors,
    //     translators: books[i].translators,
    //     bookshelves: books[i].bookshelves,
    //     languages: books[i].languages,
    //     copyright: books[i].copyright,
    //     media_type: books[i].media_type,
    //     formats: books[i].formats,
    //     download_count: books[i].download_count,
    //   }
    //   newBooks.push(newBook);
    // }

    console.log(books[0])
    setBooks(books);
  };

  return (
    <div className='page-container'>
      <h1 className='page-header'>Library</h1>

      <div className='search-panel'>
        <SearchBar resultsHandler={updateBooks} />
        <div className='search-options'>
        </div>
      </div>

      <div id='library-books'>
        {
          books.map((book) => {
            return (
              // <div key={book.id} className='library-book-div'>
              //   <h2>{book.title}</h2>
              //   <h3>{book.authors[0].name}</h3>
              //   {/* <h4>{book.authors ? book.authors[0] : ' '}</h4> */}
              // </div>
              <BookCard key={book.id} id={book.id} title={book.title} image={book.formats['image/jpeg']} />
            )
          })
        }
      </div>



    </div>
  );
}
