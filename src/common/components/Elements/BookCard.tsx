import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/components/elements/BookCard.module.scss';

type Props = {
  id: number,
  title: string,
  image: string,
  link: string,
};

export default function BookCardComponent({ id, title, image, link }: Props) {
  return (
    <div className={styles.bookCard}>
      <h3 className={styles.bookCardTitle}>{title}</h3>
      <div className={styles.bookCardImage}>
        <Link href={link}>
          <Image
            src={image}
            alt='Card image not found!'
            fill
            sizes="48w"
          />
        </Link>
      </div>
    </div>
  )
};
