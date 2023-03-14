import axios from 'axios';
import TextInput from './TextInput';
import { useState } from 'react';
import styles from '@/styles/SearchBar.module.scss';

type SearchBarProps = {
  // resultsHandler: React.ChangeEventHandler<HTMLInputElement>,
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

    axios
      .get(`/api/searchBooks`, { params: { term: searchKeyword } })
      .then((response) => {
        console.log('searchbar found', response.data)
        resultsHandler(response.data);
      })
      .catch((error) => (console.log('search books error', error)));

  };

  return (
    <div className={styles.searchBar}>
      {/* Search Bar */}
      <form onSubmit={search}>
        <TextInput name={'search-bar'} value={searchKeyword} changeHandler={updateSearchKeyword} />
        <button name='submit-button' type='submit'>SEARCH</button>
      </form>
    </div>
  )
}