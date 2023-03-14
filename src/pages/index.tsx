import { useState, useEffect } from 'react';
import type { NextPage } from "next";
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';

const Home: NextPage = () => {

  function showResults(results: Array<object>) {
    console.log('index got', results);
  }

  return (
    <div className='page-container'>
      <h1 className='page-header'>LIT HUB APP</h1>

      <h2>Search for a book!</h2>
      <SearchBar resultsHandler={showResults} />

      <div className='page-content'>
        <div className='site-cards'>
          <Card id={1} title={'Library'} image={'https://iili.io/6387GR.md.jpg'} />
          <Card id={1} title={'Reader'} image={'https://iili.io/6387GR.md.jpg'} />
          {/* <Card id={1} title={'About'} image={'https://iili.io/6387GR.md.jpg'} /> */}
        </div>
      </div>
    </div >
  );
};

export default Home;