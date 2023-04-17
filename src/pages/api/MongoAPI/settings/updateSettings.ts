import type { NextApiRequest, NextApiResponse } from "next";
import connection from '../../../../lib/database';
import Settings from "../../../../models/Settings";
import verifyToken from "../../../../lib/middleware";

export default async function updateSettings(
    req: NextApiRequest,
    res: NextApiResponse
    
    ) {
        try {
        
        const token = verifyToken(req.headers.token as string);
        if (!token) {
            res.status(401).json({message: 'Unauthorized'});
        }

        await connection();
        
        const { body } = req;
        const settings = await Settings.findOneAndUpdate(body);
        
        if (settings) {
            res.status(200).json({success: true, settings });
        } else {
            res.status(404).json({ success: false, message: 'Settings not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error });
    }
}