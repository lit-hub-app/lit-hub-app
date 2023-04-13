import type { NextPage } from "next";
import { Card } from '@/common/components/elements';
import styles from '@/styles/pages/Home.module.scss';

const LIBRARY_IMAGE_URL = 'https://media.istockphoto.com/id/1085770318/photo/wooden-brown-books-shelves-with-a-lamp.jpg?s=612x612&w=0&k=20&c=lmEO_bnmL8uv2u-1OrSfDQ1lVkxGROJ3HzO-JjDu9c0=';
const E_READER_IMAGE_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Ereader.jpg/220px-Ereader.jpg';

const Home: NextPage = () => {

  return (
    <div className={styles.homePage}>
      <div id="page-header">
        <h1>GUTEN READER</h1>
        <h2> Welcome reader!</h2>
      </div>
      <div id={styles.homePageCards}>
        <Card className={styles.homePageCard} title={'Library'} image={LIBRARY_IMAGE_URL} link={'/library'} />
        <Card className={styles.homePageCard} title={'Reader'} image={E_READER_IMAGE_URL} link={'/reader'} />
      </div>
    </div>
  );
};

export default Home;