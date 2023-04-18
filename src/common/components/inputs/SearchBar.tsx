import { useCallback, useRef, useState } from 'react';
import axios from 'axios';
import { GoSearch } from "react-icons/go";
import { TextInput } from '@/common/components/inputs';

type Props = {
  className: string,
  endpoint: string,
  resultsHandler: Function
};

export default function SearchBarComponent({ className, endpoint, resultsHandler }: Props) {

  const [searchKeyword, setSearchKeyword] = useState('');

  // const searchRef = useRef(null);
  // const [query, setQuery] = useState('');
  // const [active, setActive] = useState(false);
  // const [results, setResults] = useState([]);

  function updateSearchKeyword(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setSearchKeyword(value);
  };

  function search(event: React.SyntheticEvent) {
    event.preventDefault();
    axios(`${endpoint}?query=${searchKeyword}`)
      .then((response) => {
        resultsHandler(response.data);
      })
      .catch((error) => (console.error('search error', error)));
  };

  return (
    <form className={className} onSubmit={search}>
      <TextInput name={'search'} value={searchKeyword} changeHandler={updateSearchKeyword} />
      <button type='submit'>
        <GoSearch />
      </button>
    </form>
  )
};
