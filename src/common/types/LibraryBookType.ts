import PersonType from './PersonType';

type LibraryBookType = {
  id: string,
  cover: string,
  title: string,
  authors: PersonType[],
  languages: string[],
  subjects: string[],
};

export default LibraryBookType;
