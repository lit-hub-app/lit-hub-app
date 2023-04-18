import Link from 'next/link';
import Image from 'next/image';

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
      <Link href={link}>
        <Image
          src={image}
          alt='Card image not found!'
          priority={true}
          width='300'
          height={'300'}
          // fill
          // sizes="(max-width: 768px) 100%"
        />
      </Link>
    </div>
  )
};
