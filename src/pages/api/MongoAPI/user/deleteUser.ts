import type { NextApiRequest, NextApiResponse } from 'next'
import connection from '../../../../lib/database';
import User from '../../../../models/User';
import jwt from "jsonwebtoken";

export default async function deleteUser(
    req: NextApiRequest,
    res: NextApiResponse
) {

    interface JwtPayload {
        id: string
    }

    const token = req.headers.token as string;
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret) as JwtPayload;

    if (!token || !decoded) {
        res.status(500).json({ message: 'Invalid token' });
    }

    try {
        await connection();

        const user = await User.findByIdAndDelete(decoded.id);

        console.log(user)

        if (user) {
            res.status(200).json({ success: true,  message: 'User deleted' });
        }


    } catch (error) {
        res.status(500).json({success: false, error});
    }
}