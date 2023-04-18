import { useState, useEffect }  from 'react';
import { parseBookHTML } from '@/common/utils';
import { useGetGutenBook } from '@/common/hooks';
import type { GutenBookType, GutenResultsType, LibraryBookType } from '@/common/types';
import axios from 'axios';

type Props = {
  showBook: boolean,
  className: string,
  bookId: string,
  bookUrl: string,
};

export default function BookModalComponent({ showBook, className, bookId, bookUrl }: Props) {

  // const { bookData, bookError, bookLoading, mutateBooks } = useGetGutenBook(bookId);
  const [bookContent, setBookContent] = useState();

  useEffect(() => {
    // if (bookData) {
    //   console.log('Book Modal got: ', bookData);
    //   parseBookHTML(bookData.formats['text/html']);
    // };
    if (bookId) {
      displayBook(bookId)
      .then((data) => {
        console.log('useeffect', data)
      })
      .catch(error => console.error(error))
    }
  }, [bookId]);

  async function displayBook(bookId: string) {
    try {
      const response = await axios.get(`/api/gutendex/getbook?bookId=${bookId}`);
      const bookData = await response.data;
      console.log('got', bookData);
      return true;

    } catch(error) {
      console.error(error);
      return error;
    }
  }

  return (
    showBook ?
      <div className={className}>
        BOOK MODAL
      </div>
      : <></>
  );
};

// export async function getServerSideProps({ params }) {

//   const response = await axios.get(`https://gutendex.com/books/${params.id}`);
//   const bookData = await response.data;

//   const bookContent = bookData.formats['text/html'];

//   const response2 = await axios.get(bookContent);
//   const htmlString = await response2.data;

//   // My parser
//   const elements = [];
//   let saveElement = false;
//   const htmlArray = htmlString.split('\n');
//   for (let i = 0; i < htmlArray.length; i++) {
//     const item = htmlArray[i];
//     if (item.match(/<body/)) {
//       saveElement = true;
//     }
//     if (saveElement) {
//       elements.push(item)
//     }
//   }
//   const elementsString = elements.join('');

//   return {
//     props: {
//       html: elementsString
//     }
//   }
// };