import type { NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../lib/database';
import Settings from "../../../../models/Settings";
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

        const settings = await Settings.findOne({ userID: token });

        if (settings) {
            res.status(200).json({ 'success': true, settings });
        } else {
            res.status(404).json({ 'success': false, message: 'Settings not found' });
        }

    } catch (error) {
        res.status(500).json({success: false, error})
    }
}