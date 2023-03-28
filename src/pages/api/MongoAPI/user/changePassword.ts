import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from "jsonwebtoken";
import connection from "../../../../lib/database";
import User from '../../../../models/User';

export default async function changePassword(
    req: NextApiRequest,
    res: NextApiResponse
) {
    interface JwtPayload {
        id: string;
    }

    const { password } = req.body;

    const token = req.headers.token as string;
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret) as JwtPayload;

    if (!token ||!decoded) {
        res.status(401).json({ success: false, message: "Invalid token" });
    }


    try {
        await connection();
        
        const user = await User.findById(decoded.id);

        // Specifically using save over findOneAndUpdate
        // Due to bcrypt middleware needing to sense the change
        if (user) {
            user.password = password;
            user.save();
            res.status(200).json({ success: true, message: "Password changed successfully" });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }

    } catch(error) {
        return res.status(500).json({ success: false, error });
    }
}