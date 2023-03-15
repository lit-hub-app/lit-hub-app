import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

export async function searchBooks(query: string) {
  // const terms: string = `${query}`;
  try {
    const queryString: string = query.replace(' ', '%20');
    const response = await axios.get(`https://gutendex.com//books?search=${queryString}`);
    const books = await response.data;
    return books;
  } catch (error) {
    console.error('api get books', error)
  }
}

export async function getBooks() {
  try {
    const response = await axios.get(`https://gutendex.com//books`);
    const books = await response.data;
    return books;
  } catch (error) {
    console.error('api get books', error)
  }
}