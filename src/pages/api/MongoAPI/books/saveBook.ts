import type { NextApiRequest, NextApiResponse } from 'next';
import Book from '../../../../common/models/Book';
import connection from "../../../../lib/database";
import jwt from "jsonwebtoken";
import verifyToken from '../../../../lib/middleware';

export default async function saveBook(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { body } = req;

    const token = verifyToken(req.headers.token as string);

    if (!token) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    try {
        await connection();
        const data = {
            title: body.title,
            author: body.author,
            genre: body.genre,
            description: body.description,
            image: body.image,
            text: body.text,
            userID: token,
        }
        const book = await Book.create(data);
        res.status(201).json({ success: true, book });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
}