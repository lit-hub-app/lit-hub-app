import type { NextPage } from "next";
import Card from '@/common/components/Elements/Card';

const LIBRARY_IMAGE_URL = 'https://media.istockphoto.com/id/1085770318/photo/wooden-brown-books-shelves-with-a-lamp.jpg?s=612x612&w=0&k=20&c=lmEO_bnmL8uv2u-1OrSfDQ1lVkxGROJ3HzO-JjDu9c0=';
const E_READER_IMAGE_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Ereader.jpg/220px-Ereader.jpg';

const Home: NextPage = () => {

  return (
    <div className='page-container'>
      <h1 className='page-header'>Guten Reader</h1>
      <div className='page-content'>
        <div className='homepage-cards'>
          <Card id={1} title={'Library'} image={LIBRARY_IMAGE_URL} link={'/library'} />
          <Card id={1} title={'Reader'} image={E_READER_IMAGE_URL} link={'/reader'} />
        </div>
      </div>
    </div >
  );
};

export default Home;