import Image from 'next/image';

type Props = {
  bookId: number,
  className: string,
  title: string,
  image: string,
  clickHandler: React.MouseEventHandler<HTMLButtonElement>;
};

export default function LibraryBookComponent({ bookId, className, title, image, clickHandler }: Props) {
  return (
    <div className={className}>
      
      {/* <h3>{title}</h3> */}

      <button
        // id={bookId}
        // name={bookId}
        value={bookId}
        onClick={clickHandler}
      >
        <Image
          src={image}
          alt='Card image not found!'
          priority={true}
          width='300'
          height={'300'}
        />
      </button>

    </div>
  )
};
