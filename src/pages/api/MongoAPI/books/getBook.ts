import type { NextApiRequest, NextApiResponse } from 'next';
import connection from '../../../../lib/database';
import Book from '../../../../models/Book';
import verifyToken from '../../../../lib/middleware';

export default async function getBook(
    req: NextApiRequest,
    res: NextApiResponse
) {
    
    try {
        await connection();
        
        const token = verifyToken(req.headers.token as string);
        
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        
        const { id } = req.query;
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