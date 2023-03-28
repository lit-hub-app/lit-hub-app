import type { NextApiRequest, NextApiResponse } from 'next';
import connection from "../../../../lib/database";
import verifyToken from '../../../../lib/middleware';
import User from '../../../../models/User';

export default async function changePassword(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { password } = req.body;

    const token = verifyToken(req.headers.token as string);

    if (!token) {
        res.status(401).json({ success: false, message: "Invalid token" });
    }

    try {
        await connection();
        
        const user = await User.findById(token);

        // Specifically using save over findOneAndUpdate
        // Due to bcrypt middleware needing to sense the change
        if (user) {
            user.password = password;
            user.save();
            res.status(200).json({ success: true, message: "Password changed successfully", user });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }

    } catch(error) {
        return res.status(500).json({ success: false, error });
    }
}