import { useState, useEffect } from 'react';
import type { NextPage } from "next";

const Home: NextPage = () => {

  // useEffect(() => {
  //   console.log('use effect invoked')
  //   void fetch('api/getBooks')
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data)
  //     })
  //     .catch((error) => (console.log('api/getBooks', error)));
  // }, []);

  return (
    <div>
      <h1>LIT HUB</h1>
    </div>
  );
};

export default Home;