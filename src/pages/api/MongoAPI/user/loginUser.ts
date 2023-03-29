import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connection from "../../../../lib/database";
import User from '../../../../models/User';

export default async function loginUser(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
        
        const { email, password } = req.body;
        
        try {
            await connection();

            const user = await User.findOne({ email });
            console.log(user)
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
                console.log(token);
                res.status(200).json({success: true, token });
            } else {
                res.status(401).json({ success: false, message: 'Invalid credentials' });
            }

        } catch (error) {
        res.status(500).json({ success: false, error })
    }
}