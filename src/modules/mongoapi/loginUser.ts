import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connection from '@/common/lib/database';
import User from '@/common/models/User';

export default async function loginUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password } = req.body;

  try {
    await connection();
    const user = await User.findOne({ username });
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
      res.status(200).json({
        message: 'Login successful',
        token,
      });
    }
  }
  catch (error) {
    res.status(400).json({ success: false, error })
  }
}