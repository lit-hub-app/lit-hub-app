import { useState } from 'react';
import { GoSearch } from "react-icons/go";
import styles from '@/styles/SearchBar.module.scss';
import TextInput from './TextInput';

import { searchBooks } from '../../modules/gutendex';

type SearchBarProps = {
  resultsHandler: Function
}

export default function SearchBarComponent({ resultsHandler }: SearchBarProps) {

  const [searchKeyword, setSearchKeyword] = useState('');

  function updateSearchKeyword(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setSearchKeyword(value);
  };

  function search(event: React.SyntheticEvent) {
    event.preventDefault();
    searchBooks(searchKeyword)
      .then((data) => {
        resultsHandler(data)
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
}