import type { NextApiRequest, NextApiResponse } from 'next'

export default async function getBooks(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(`https://gutendex.com/books`);
    const books = await response.json();
    res.send(books)
  } catch (error) {
    console.error('api get books', error)
  }
}
