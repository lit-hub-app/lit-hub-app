import Link from 'next/link';
import Image from 'next/image';
// import styles from '@/styles/components/elements/Card.module.scss';

type Props = {
  className: string,
  title: string,
  image: string,
  link: string,
};

export default function CardComponent({ className, title, image, link }: Props) {
  return (
    <div className={className}>
      <h3>{title}</h3>
      <div>
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
