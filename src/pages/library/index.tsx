import { useState, useEffect } from 'react';
import useSWR from 'swr';
import SearchBar from '@/common/components/SearchBar';
import Card from '@/common/components/Card';

import type { BookType } from '@/common/types';
import { fetcher } from '@/modules/utils';

const IMAGE_NOT_FOUND_URL = 'https://e7.pngegg.com/pngimages/829/733/png-clipart-logo-brand-product-trademark-font-not-found-logo-brand.png';

type ResultsType = {
  count: number,
  next: string | null,
  previous: string | null,
  results: Array<BookType>
};

export default function LibraryPage() {

  const { data, error } = useSWR<ResultsType>('/api/getbooks', fetcher);
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
    <div className='page-container'>
      <h1 className='page-header'>Library</h1>

      <div className='search-panel'>
        <SearchBar resultsHandler={updateBooks} />
        <div className='search-options'>
        </div>
      </div>

      <div className='library-books'>
        {
          books ?
            books.map(((book, i) => {
              return (
                <Card
                  key={book.id}
                  id={book.id}
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
}
