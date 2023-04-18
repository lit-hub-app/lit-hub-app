import PersonType from './PersonType';

type GutenBookType = {
  id: number,
  title: string,
  authors: Array<PersonType>,
  subjects: Array<string>,
  translators: Array<PersonType>,
  bookshelves: Array<string>,
  languages: Array<string>,
  copyright: boolean | null,
  media_type: string,
  formats: {
    'application/epub+zip'?: string,
    'application/octet-stream'?: string,
    'application/rdf+xml'?: string,
    'application/x-mobipocket-ebook'?: string,
    'image/jpeg'?: string,
    'text/html'?: string,
    'text/plain'?: string,
    'charset=us-ascii'?: string,
  },
  download_count: number
};

export default GutenBookType;
