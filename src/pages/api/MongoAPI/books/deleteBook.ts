import type { NextApiRequest, NextApiResponse } from 'next'
import connection from '../../../../lib/database';
import Book from '../../../../models/Book';
import jwt from "jsonwebtoken";

export default async function deleteBook(
    req: NextApiRequest,
    res: NextApiResponse
) {
    interface JwtPayload {
        id: string;
    }

    const { bookID } = req.query;
    console.log(bookID);

    const token = req.headers.token as string;
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret) as JwtPayload;

    if (!token || !decoded) {
        res.status(500).json({ success: false, message: 'Invalid token' });
    }

    try {
        await connection();

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