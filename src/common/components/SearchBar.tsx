import { useCallback, useRef, useState } from 'react';
import axios from 'axios';
import { GoSearch } from "react-icons/go";
import styles from '@/styles/components/SearchBar.module.scss';
import TextInput from './TextInput';

type Props = {
  resultsHandler: Function
};

export default function SearchBarComponent({ resultsHandler }: Props) {

  const [searchKeyword, setSearchKeyword] = useState('');

  const searchRef = useRef(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(false);
  const [results, setResults] = useState([]);

  function updateSearchKeyword(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setSearchKeyword(value);
  };

  function search(event: React.SyntheticEvent) {
    event.preventDefault();
    axios(`/api/search?query=${searchKeyword}`)
      .then((response) => {
        resultsHandler(response.data);
      })
      .catch((error) => (console.log('search error', error)));

  };

  return (
    <div className={styles.searchBar}>
      <form onSubmit={search}>
        <TextInput name={'search-bar'} value={searchKeyword} changeHandler={updateSearchKeyword} />
        <button name='submit-button' type='submit'>
          <GoSearch size={20} />
        </button>
      </form>
    </div>
  )
};
