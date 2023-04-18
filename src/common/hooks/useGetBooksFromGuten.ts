import useSWR from 'swr';
import { fetcher } from '@/common/utils';
import { GutenResultsType } from '@/common/types';

export default function useGetBooksFromGuten() {

  const { data, error, isLoading, mutate } = useSWR<GutenResultsType>('/api/gutendex/getbooks', fetcher);

  return {
    booksData: data,
    booksError: error,
    booksLoading: isLoading,
    mutateBooks: mutate
  };
  
};
