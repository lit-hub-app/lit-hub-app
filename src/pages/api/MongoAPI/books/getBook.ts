import type { NextApiRequest, NextApiResponse } from 'next';
import connection from '../../../../lib/database';
import Book from '../../../../models/Book';
import verifyToken from '../../../../lib/middleware';

export default async function getBook(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;

    const token = verifyToken(req.headers.token as string);

    if (!token) {
        res.status(500).json({ message: 'Invalid token' });
    }

    try {
        await connection();

        const book = await Book.findById(id);

        if (book) {
            res.status(200).json({ success: true, book })
        } else {
            res.status(404).json({ success: false, message: 'Book not found' });
        }

    } catch (error) {
        res.status(500).json({ success: false, error });
    }
}