import type { NextApiRequest, NextApiResponse } from 'next'

export default async function search(req: NextApiRequest, res: NextApiResponse) {

  // const rawQuery = req.query;
  const { id } = req.query;
  console.log(id)
  try {
    const response = await fetch(`https://gutendex.com/books/${id}`);
    const book = await response.json();
    res.send(book);
  } catch (error) {
    console.error('api/search', error)
  }
}
