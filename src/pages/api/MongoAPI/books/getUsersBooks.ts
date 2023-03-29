import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
<<<<<<<< HEAD:src/modules/mongoapi/getUsersBooks.ts
import connection from '@/lib/database';
import Book from "@/models/Book";
========
import connection from '../../../../lib/database';
import Book from "../../../../models/Book";
import verifyToken from "../../../../lib/middleware";
>>>>>>>> 6ffa379e21a9d899272f823822275cd1913d3a40:src/pages/api/MongoAPI/books/getUsersBooks.ts

export default async function getUsersBooks(
    req: NextApiRequest,
    res: NextApiResponse
) {
<<<<<<<< HEAD:src/modules/mongoapi/getUsersBooks.ts
    interface JwtPayload {
        id: string
    }
    const token = req.headers.token as string;
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret) as JwtPayload;

    if (!token || !decoded) {
========
    const token = verifyToken(req.headers.token as string);

    if (!token) {
>>>>>>>> 6ffa379e21a9d899272f823822275cd1913d3a40:src/pages/api/MongoAPI/books/getUsersBooks.ts
        res.status(500).json({ message: 'Invalid token' });
    }

    try {
        await connection();
<<<<<<<< HEAD:src/modules/mongoapi/getUsersBooks.ts
        const books = await Book.find({ userID: decoded.id });
========

        const books = await Book.find({ userID: token });

>>>>>>>> 6ffa379e21a9d899272f823822275cd1913d3a40:src/pages/api/MongoAPI/books/getUsersBooks.ts
        res.status(200).json({ success: true, books });
    } catch (error) {
        res.status(500).json({ success: false, error });
    }
};