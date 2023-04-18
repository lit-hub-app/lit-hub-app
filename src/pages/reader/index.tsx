import styles from '@/styles/pages/Reader.module.scss';

type Props = {
  book: string,
};

export default function ReaderPage({ book }: Props) {

  return (
    <div className={styles.readerPage}>
    <div className={styles.readerPageHeader}>
      <h1>Reader</h1>
      <h2>Login or create an account to see your books!</h2>
    </div>
    </div>
  );
}
