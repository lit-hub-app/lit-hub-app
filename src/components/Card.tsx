import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/Card.module.scss';

type CardProps = {
  id: number,
  title: string,
  image: string,
}

export default function CardComponent({ id, title, image }: CardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <h3>{title}</h3>
      </div>
      <div className={styles.cardImage}>
        <Image
          src={image}
          alt='Card image not found!'
          fill
        />
      </div>
    </div>
  )
};
