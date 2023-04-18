import { useState, useEffect } from 'react';
import useSWR from 'swr';

import { SearchBar } from '@/common/components/inputs';
import { Card } from '@/common/components/elements';

import { useGetBooksFromGuten } from '@/common/hooks';
import type { GutenBookType, GutenResultsType, LibraryBookType } from '@/common/types';
// import { fetcher } from '@/common/utils';

import styles from '@/styles/pages/Library.module.scss';

const IMAGE_NOT_FOUND_URL = 'https://e7.pngegg.com/pngimages/829/733/png-clipart-logo-brand-product-trademark-font-not-found-logo-brand.png';

export default function LibraryPage() {

  const { booksData, booksError, booksLoading, mutateBooks } = useGetBooksFromGuten();
  const [books, setBooks] = useState<Array<GutenBookType>>();

  // const { data, error } = useSWR<GutenResultsType>('/api/gutendex/getbooks', fetcher);
  // console.log('library', booksData)

  useEffect(() => {
    if(booksData) {
      // const results = booksData.results;
      // for (let i in results) {
        // const { id, title, authors, formats, subjects} = results[i];
      // }
      setBooks(booksData.results)
    }
  }, [booksData]);

  function updateBooks(results: GutenResultsType) {
    const books: Array<GutenBookType> = results.results;
    mutateBooks(booksData);
  };

  return (
    <div className={styles.libraryPage}>

      <div id="page-header">
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
              console.log(book.id)
              return (
                <Card
                  key={book.id}
                  className={styles.libraryBook}
                  title={book.title}
                  image={book.formats['image/jpeg'] ? book.formats['image/jpeg'] : IMAGE_NOT_FOUND_URL}
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
