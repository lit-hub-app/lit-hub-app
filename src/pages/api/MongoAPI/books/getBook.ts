import type { NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../lib/database';
import Book from '../../../../models/Book';
import jwt from "jsonwebtoken";

export default async function getBook(
    req: NextApiRequest,
    res: NextApiResponse
) {
    interface JwtPayload {
        id: string;
    }

    const { id } = req.query;

    const token = req.headers.token as string;
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret) as JwtPayload;


    if (!token || !decoded) {
        res.status(500).json({ message: "Invalid token" });
    }

    try {
        await connection();

        const book = await Book.findById(id);

        if (book) {
            res.status(200).json({ success: true, book })
        } else {
            res.status(404).json({ success: false, message: "Book not found" });
        }

    } catch (error) {
        res.status(500).json({ success: false, error });
    }
}