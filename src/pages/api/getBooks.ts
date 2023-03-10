import type { NextApiRequest, NextApiResponse } from 'next'
// %20 - white space url code

// Example search url
// http://gutendex.com/books/?search=dickens%20great


export default async function getBooks(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { body } = req;
  console.log('api req', body)
  try {
    const response = await fetch('https://gutendex.com//books');
    const books = await response.json();
    console.log('got', books.count)
    res.status(200).json(books);
    // return;
  } catch (error) {
    console.error('api get books', error)
  }
}