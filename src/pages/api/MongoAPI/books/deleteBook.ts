import type { NextApiRequest, NextApiResponse } from 'next'
import connection from '../../../../lib/database';
import verifyToken from '../../../../lib/middleware';
import Book from '../../../../models/Book';

export default async function deleteBook(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const token = verifyToken(req.headers.token as string);

        if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
        }
        
        await connection();

        const { bookID } = req.query;
        const book = await Book.findByIdAndDelete(bookID);

        if (book) {
            res.status(200).json({success: true, book});
        } else {
            res.status(204).json({success: false, message: 'Book not found'});
        }

    } catch(error) {
        res.status(500).json({ success: false, error });
    }
}