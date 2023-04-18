import useSWR from 'swr';
import { fetcher } from '@/common/utils';
import { GutenBookType } from '@/common/types';

export default function useGetBooksFromGuten(bookId:string) {

  const { data, error, isLoading, mutate } = useSWR<GutenBookType>(bookId ? `/api/gutendex/getbook?bookId=${bookId}` : null, fetcher);

  return {
    bookData: data,
    bookError: error,
    bookLoading: isLoading,
    mutateBooks: mutate
  };
  
};
