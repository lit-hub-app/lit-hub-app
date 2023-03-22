import type { NextApiRequest, NextApiResponse } from 'next'

export default async function search(req: NextApiRequest, res: NextApiResponse) {
  const rawQuery = req.query;
  if (typeof req.query.query === 'string') {
    const queryString: string = req.query.query.replace(' ', '%20');
    try {
      const response = await fetch(`https://gutendex.com/books?search=${queryString}`);
      const books = await response.json();
      res.send(books);
    } catch (error) {
      console.error('api get books', error)
    }
  } else {
    res.send('please send query as string');
  }

}
