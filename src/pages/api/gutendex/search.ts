import type { NextApiRequest, NextApiResponse } from 'next'

export default async function search(req: NextApiRequest, res: NextApiResponse) {
  const rawQuery = req.query;
  if (typeof req.query.query === 'string') {
    const queryString: string = req.query.query.replace(' ', '%20');
    try {
      const response = await fetch(`https://gutendex.com/books?search=${queryString}`);
      const results = await response.json();
      res.send(results);
    } catch (error) {
      console.error('api/search', error)
    }
  } else {
    res.send('please send query as string');
  }
}
