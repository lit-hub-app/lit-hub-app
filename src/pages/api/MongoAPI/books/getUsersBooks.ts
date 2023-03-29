import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import connection from '../../../../lib/database';
import Book from "../../../../models/Book";
import verifyToken from "../../../../lib/middleware";

export default async function getUsersBooks(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const token = verifyToken(req.headers.token as string);

    if (!token) {
        res.status(500).json({ message: 'Invalid token' });
    }

    try {

        await connection();

        const books = await Book.find({ userID: token });

        res.status(200).json({ success: true, books });

    } catch (error) {
        res.status(500).json({success: false, error});
    }
};