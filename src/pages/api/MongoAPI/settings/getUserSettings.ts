import type { NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../lib/database';
import User from "../../../../models/User";
import verifyToken from "../../../../lib/middleware";

export default async function getUsersSettings(
    req: NextApiRequest,
    res: NextApiResponse
) {
     const token = verifyToken(req.headers.token as string);

     if (!token) {
        res.status(401).json({message: 'Unauthorized'});
     }

     try {
        await connection();

        const user = await User.findById(token);
    } catch (error) {
        res.status(500).json({success: false, error})
    }
}