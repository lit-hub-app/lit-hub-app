import { useState, useEffect } from 'react';

import { SearchBar } from '@/common/components/inputs';
import { LibraryBook, BookModal } from '@/common/components/elements';

import { useGetGutenBooks } from '@/common/hooks';
import type { GutenBookType, GutenResultsType, LibraryBookType } from '@/common/types';

import styles from '@/styles/pages/Library.module.scss';

const IMAGE_NOT_FOUND_URL = 'https://e7.pngegg.com/pngimages/829/733/png-clipart-logo-brand-product-trademark-font-not-found-logo-brand.png';

export default function LibraryPage() {

  const { booksData, booksError, booksLoading, mutateBooks } = useGetGutenBooks();
  const [books, setBooks] = useState<Array<GutenBookType>>();

  const [showBook, setShowBook] = useState<boolean>(false);
  const [currentBook, setCurrentBook] = useState<string>('');
  const [bookUrl, setBookUrl] = useState<string>('');

  useEffect(() => {
    if(booksData) {
      const results = booksData.results;
      const _books = [];
      for (let i in results) {
        const { id, title, formats} = results[i];
        const _book = {
          id: id,
          title: title.split(/(:|;|—)/, 1), // for some reason '—' is not '-'
          cover: formats['image/jpeg']
        };
        _books.push(_book);
      }
      setBooks(_books);
    }
  }, [booksData]);

  function updateBooks(results: GutenResultsType) {
    const books: Array<GutenBookType> = results.results;
    mutateBooks(booksData);
  };

  function openBook(event: React.MouseEvent<HTMLButtonElement>) {
    const { value } = event.currentTarget;
    console.log('open book', value);
    setShowBook(true);
    setCurrentBook(value);
  };

  if (booksError) return <div>Failed to fetch books.</div>

  return (
    <div className={styles.libraryPage}>

      <div className={styles.libraryPageHeader}>
        <h1>Library</h1>
        <h2>Search for any book from Project Gutenberg!</h2>
      </div>

      <SearchBar
        className={styles.librarySearchBar}
        endpoint={'/api/gutendex/search'}
        resultsHandler={updateBooks}
      />

      <div className={styles.libraryBooks}>
        {
          booksLoading ?
          <h2>Getting books...</h2>
          : <></>
        }
        {
          books ?
            books.map(((book) => {
              return (
                <LibraryBook
                  key={book.id}
                  bookId={book.id}
                  className={styles.libraryBook}
                  title={book.title}
                  image={book.cover ? book.cover : IMAGE_NOT_FOUND_URL}
                  clickHandler={openBook}
                />
              )
            }))
            : null
        }
        <BookModal 
          showBook={showBook}
          className={styles.bookModal}
          bookId={currentBook}
          bookUrl={}
        />
      </div>

    </div>
  );
};
