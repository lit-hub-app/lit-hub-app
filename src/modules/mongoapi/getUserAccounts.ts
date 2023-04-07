import type { NextApiRequest, NextApiResponse } from 'next'
import connection from '@/common/lib/database';
import User from '@/common/models/User';

export default async function getUsers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connection();
    const users: Array<object> = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}