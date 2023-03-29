import type { NextApiRequest, NextApiResponse } from 'next';
<<<<<<<< HEAD:src/modules/mongoapi/saveBook.ts
import Book from '@/models/Book';
import connection from '@/lib/database';
========
import Book from '../../../../models/Book';
import connection from "../../../../lib/database";
>>>>>>>> 6ffa379e21a9d899272f823822275cd1913d3a40:src/pages/api/MongoAPI/books/saveBook.ts
import jwt from "jsonwebtoken";
import verifyToken from '../../../../lib/middleware';

export default async function saveBook(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    interface JwtPayload {
        id: string
    }

<<<<<<<< HEAD:src/modules/mongoapi/saveBook.ts
    const { body } = req;
    const token = req.headers.token as string;
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret) as JwtPayload;

    if (!token || !decoded) {
========
    const token = verifyToken(req.headers.token as string);

    if (!token) {
>>>>>>>> 6ffa379e21a9d899272f823822275cd1913d3a40:src/pages/api/MongoAPI/books/saveBook.ts
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
            userID: token,
        }
        const book = await Book.create(data);
        res.status(201).json({ success: true, book });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
}