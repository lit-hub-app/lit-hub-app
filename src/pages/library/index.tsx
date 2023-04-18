import { useState, useEffect } from 'react';

import { SearchBar } from '@/common/components/inputs';
import { Card } from '@/common/components/elements';

import { useGetBooksFromGuten } from '@/common/hooks';
import type { GutenBookType, GutenResultsType, LibraryBookType } from '@/common/types';

import styles from '@/styles/pages/Library.module.scss';

const IMAGE_NOT_FOUND_URL = 'https://e7.pngegg.com/pngimages/829/733/png-clipart-logo-brand-product-trademark-font-not-found-logo-brand.png';

export default function LibraryPage() {

  const { booksData, booksError, booksLoading, mutateBooks } = useGetBooksFromGuten();
  const [books, setBooks] = useState<Array<GutenBookType>>();

  // const { data, error } = useSWR<GutenResultsType>('/api/gutendex/getbooks', fetcher);
  // console.log('library', booksData)

  useEffect(() => {
    if(booksData) {
      const results = booksData.results;
      const _books = [];
      for (let i in results) {
        const { id, title, formats} = results[i];
        // console.log(title.split(/(:|;)/, 1), title, formats)
        const _book = {
          id: id,
          title: title.split(/(:|;|—)/, 1), // for some reason '—' is not '-'
          cover: formats['image/jpeg']
        }
        console.log(_book)
        _books.push(_book)
      }
      setBooks(_books)
    }
  }, [booksData]);
  function updateBooks(results: GutenResultsType) {
    const books: Array<GutenBookType> = results.results;
    mutateBooks(booksData);
  };

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
          books ?
            books.map(((book) => {
              return (
                <Card
                  key={book.id}
                  className={styles.libraryBook}
                  title={book.title}
                  image={book.cover ? book.cover : IMAGE_NOT_FOUND_URL}
                  link={`/reader/${book.id}`}
                />
              )
            }))
            : null
        }
      </div>

    </div>
  );
};
