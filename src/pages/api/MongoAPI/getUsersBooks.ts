import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import connection from '../../../lib/database';
import Book from "../../../models/Book";

export default async function getUsersBooks(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const token = req.headers.token as string;
    const secret = process.env.JWT_SECRET as string;

    const decoded = jwt.verify(token, secret);

    if (!token || !decoded) {
        res.status(500).json({ message: 'Invalid token' });
    }

    try {

        await connection();

        const books = await Book.find({ userID: decoded.id });

        res.status(200).json({ success: true, books });

    } catch (error) {
        res.status(500).json({success: false, error});
    }
};