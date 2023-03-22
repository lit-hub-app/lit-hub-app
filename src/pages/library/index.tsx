import { useCallback, useRef, useState } from 'react';
import useSWR from 'swr';
import SearchBar from '@/common/components/SearchBar';
import Card from '@/common/components/Card';

import type { BookType } from '@/common/types';
// import { getBooks } from '@/modules/gutendex';
import { fetcher } from '@/modules/utils';

type ResultsType = {
  count: number,
  next: string | null,
  previous: string | null,
  results: Array<BookType>
};

export default function LibraryPage() {

  const { data, error } = useSWR<ResultsType>('/api/getbooks', fetcher);
  const [books, setBooks] = useState<Array<BookType>>();

  console.log(books)


  function updateBooks(results: ResultsType) {
    console.log('index got', results.results);
    const books: Array<BookType> = results.results;
    console.log(books[0])
    setBooks(books);
  };

  return (
    <div className='page-container'>
      <h1 className='page-header'>Library</h1>

      <div className='search-panel'>
        {/* <SearchBar resultsHandler={updateBooks} /> */}
        <div className='search-options'>
        </div>
      </div>

      <div className='library-books'>
        {
          data ?
            data.results.map(((book, i) => {
              return (
                <Card
                  key={book.id}
                  id={book.id}
                  title={book.title}
                  image={book.formats['image/jpeg'] ? book.formats['image/jpeg'] : ''}
                  link={''}
                />
              )
            }))
            : null
        }
      </div>

    </div>
  );
}


