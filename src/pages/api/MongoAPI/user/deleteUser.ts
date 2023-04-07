import type { NextApiRequest, NextApiResponse } from 'next'
import connection from '../../../../lib/database';
import verifyToken from '../../../../lib/middleware';
import User from '../../../../models/User';
import Book from '../../../../common/models/Book';
import Settings from '../../../../common/models/Settings';

export default async function deleteUser(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const token = verifyToken(req.headers.token as string);

    if (!token) {
        res.status(401).json({ message: 'Invalid token' });
    }

    try {
        await connection();

        const user = await User.findByIdAndDelete(token);
        const books = await Book.deleteMany({ userID: token })
        const settings = await Settings.findOneAndDelete({ userID: token });

        if (user && books && settings) {
            res.status(200).json({ success: true, message: 'User deleted' });
        } else {
            res.status(204).json({ success: true, message: 'User not found' });
        }


    } catch (error) {
        res.status(500).json({ success: false, error });
    }
};