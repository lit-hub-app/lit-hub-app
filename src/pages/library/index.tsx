import { useState, useEffect } from 'react';
import useSWR from 'swr';

import { SearchBar } from '@/common/components/inputs';
import { Card } from '@/common/components/elements';

import type { BookType } from '@/common/types';
import { fetcher } from '@/modules/utils';
import styles from '@/styles/pages/Library.module.scss';

const IMAGE_NOT_FOUND_URL = 'https://e7.pngegg.com/pngimages/829/733/png-clipart-logo-brand-product-trademark-font-not-found-logo-brand.png';

type ResultsType = {
  count: number,
  next: string | null,
  previous: string | null,
  results: Array<BookType>
};

export default function LibraryPage() {

  const { data, error } = useSWR<ResultsType>('/api/gutendex/getbooks', fetcher);
  const [books, setBooks] = useState<Array<BookType>>();

  useEffect(() => {
    if (data) {
      setBooks(data.results)
    }
  }, [data]);

  function updateBooks(results: ResultsType) {
    const books: Array<BookType> = results.results;
    setBooks(books);
  };

  return (
    <div className={styles.libraryPage}>

      <div id="page-header">
        <h1>Library</h1>
        <h2>Search for any book from Project Gutenberg!</h2>
      </div>

      <SearchBar className={styles.librarySearchBar} endpoint={'/api/gutendex/search'} resultsHandler={updateBooks} />

      <div className={styles.libraryBooks}>
        {
          books ?
            books.map(((book, i) => {
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
