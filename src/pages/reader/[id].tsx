import { GetServerSideProps } from 'next';
import axios from 'axios';
import parse from 'html-react-parser';
import useSWR from 'swr';
import type { BookType } from '@/common/types';
const fetcher = (url: string) => fetch(url).then((res) => res.json())

type Props = {
  html: [],
};

export default function Book({ html }: Props) {
  // console.log('Book', html)

  // const { data, error } = useSWR(`/api/getbook?id=${id}`, fetcher)
  // console.log('Book', data);

  return (
    <div className='page-container'>
      <h1 className='page-header'>Reader</h1>
      <div className='page-content'>
        <div className='reader-content'>
          {
            parse(html)
          }
        </div>
      </div>
    </div>
  );
};

type Data = {
  id: string
};

export async function getServerSideProps({ params }) {

  const response = await axios.get(`https://gutendex.com/books/${params.id}`);
  const bookData = await response.data;

  const bookContent = bookData.formats['text/html'];

  const response2 = await axios.get(bookContent);
  const htmlString = await response2.data;

  // My parser
  const elements = [];
  let saveElement = false;
  const htmlArray = htmlString.split('\n');
  for (let i = 0; i < htmlArray.length; i++) {
    const item = htmlArray[i];
    if (item.match(/<body/)) {
      saveElement = true;
    }
    if (saveElement) {
      elements.push(item)
    }
  }
  const elementsString = elements.join('');

  return {
    props: {
      html: elementsString
    }
  }
};