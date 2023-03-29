import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/components/Card.module.scss';


type Props = {
  id: number,
  title: string,
  image: string,
  link: string,
};

export default function CardComponent({ id, title, image, link }: Props) {
  // console.log(id, title, image, link);

  return (
    <div className={styles.card}>

      <div className={styles.cardTitle}>
        <h3>{title}</h3>
      </div>

      <div className={styles.cardImage}>
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
