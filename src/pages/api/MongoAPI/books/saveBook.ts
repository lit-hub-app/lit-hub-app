import type { NextApiRequest, NextApiResponse } from 'next';
import Book from '../../../models/Book';
import connection from "../../../lib/database";
import jwt from "jsonwebtoken";

export default async function saveBook(
    req: NextApiRequest,
    res: NextApiResponse,
) { 
    interface JwtPayload {
        id: string
    }
    
    const { body } = req;

    const token = req.headers.token as string;
    const secret = process.env.JWT_SECRET as string;

    const decoded = jwt.verify(token, secret) as JwtPayload;

    if (!token || !decoded) {
        res.status(500).json({ message: 'Invalid token' });
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
            userID: decoded.id,
        }

        const book = await Book.create(data);

        res.status(201).json({ success: true, book });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
}