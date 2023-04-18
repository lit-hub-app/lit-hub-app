import type { NextApiRequest, NextApiResponse } from 'next'

export default async function search(req: NextApiRequest, res: NextApiResponse) {

  // const rawQuery = req.query;
  const { bookId } = req.query;
  console.log('guten getBook', bookId)
  try {
    const response = await fetch(`https://gutendex.com/books/${bookId}`);
    const book = await response.json();
    res.send(book);
  } catch (error) {
    console.error('api/search', error)
  }
}
