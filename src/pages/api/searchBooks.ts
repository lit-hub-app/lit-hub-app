import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

// Example search url
// %20 - white space url code
// http://gutendex.com/books/?search=dickens%20great

export default async function saerchBooks(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const terms: string = `${req.query.term}`;
  try {
    const queryString = terms.replace(' ', '%20');
    const response = await axios.get(`https://gutendex.com//books?search=${queryString}`);
    const books = await response.data;
    res.status(200).json(books);
  } catch (error) {
    console.error('api get books', error)
  }
}