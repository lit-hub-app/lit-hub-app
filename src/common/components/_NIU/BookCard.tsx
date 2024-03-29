import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/components/BookCard.module.scss';

type Props = {
  id: number,
  title: string,
  image: string,
}

export default function CardComponent({ id, title, image }: Props) {
  return (
    <div className={styles.bookCard}>
      <h3>{title}</h3>
      {/* <div className={styles.bookCardTitle}>
      </div> */}
      <div className={styles.bookCardImage}>
        <Image
          src={image}
          alt='Card image not found!'
          fill
          sizes='(max-width: 20rem)'
        />
      </div>
    </div>
  )
};
