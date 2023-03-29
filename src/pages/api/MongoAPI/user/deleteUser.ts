import type { NextApiRequest, NextApiResponse } from 'next'
import connection from '../../../../lib/database';
import verifyToken from '../../../../lib/middleware';
import User from '../../../../models/User';

export default async function deleteUser(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const token = verifyToken(req.headers.token as string);

    if (!token) {
        res.status(500).json({ message: 'Invalid token' });
    }

    try {
        await connection();

        const user = await User.findByIdAndDelete(token);

        if (user) {
            res.status(200).json({ success: true,  message: 'User deleted' });
        } else {
            res.status(204).json({success: true,  message: 'User not found' });
        }


    } catch (error) {
        res.status(500).json({success: false, error});
    }
}