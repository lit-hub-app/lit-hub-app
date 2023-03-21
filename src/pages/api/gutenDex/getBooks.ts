import type { NextApiRequest, NextApiResponse } from 'next'

export default async function getBooks(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { body } = req;
  try {
    const response = await fetch('https://gutendex.com/books');
    const books = await response.json();
    res.status(200).json(books);
  } catch (error) {
    console.error('api get books', error)
  }
}