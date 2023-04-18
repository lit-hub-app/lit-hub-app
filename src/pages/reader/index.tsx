import type { BookType, PersonType } from '@/common/types';

type Props = {
  book: string,
}

export default function ReaderPage({ book }: Props) {

  console.log('Reader', book)

  return (
    <div className='page-container'>
      <h1 className='page-header'>Reader</h1>
      <h2>Go to the library and find a book!</h2>
    </div>
  );
}
