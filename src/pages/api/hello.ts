import type { NextApiRequest, NextApiResponse } from 'next'

export default async function hello(req, res) {
  console.log(req.query)
  try {
    res.send('works!')
  } catch (error) {
    console.error('hello', error)
  }
}
