import type { NextApiRequest, NextApiResponse } from 'next';
import Book from '../../../models/Book';
import connection from '../../../lib/database';
import jwt from "jsonwebtoken";

export default async function saveBook(
    req: NextApiRequest,
    res: NextApiResponse,
) { 
    const { username } = req.query;
    const { body } = req;
    console.log(body)


    try {
        await connection();

        const book = Book.create(body)

        res.status(201).json({success: true, book});
        
    }
    catch (error) {
        res.status(400).json({success: false, error});
    }
}