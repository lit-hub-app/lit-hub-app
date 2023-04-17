import { NextApiRequest, NextApiResponse } from "next";
import connection from "@/lib/database";
import verifyToken from "@/lib/middleware";
import Book ,{ BookDocument } from "@/models/Book";
import  indexedDB from "@/lib/indexDB";

export default async function syncLibraryToOffline(
    req: NextApiRequest, 
    res: NextApiResponse
) {
    try{

        const token = verifyToken(req.headers.token as string);
        if (!token) {
          return res.status(401).json({ message: 'Unauthorized' });
        }

        await connection();

        const books: BookDocument[] = await Book.find({ userID: token });
        if (!books) {
            res.status(404).json({ success: false, message: 'No books found' });
        }

        const localBooks = await indexedDB.library.bulkAdd(books);
        console.log(localBooks);

        res.status(200).json({ success: true, localBooks });
    } catch (error) {
        res.status(500).json({success: false, error});
    }
}