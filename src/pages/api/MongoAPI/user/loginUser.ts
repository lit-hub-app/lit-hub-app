import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connection from "../../../../lib/database";
import User from '../../../../models/User';

export default async function loginUser(
    req: NextApiRequest, 
    res: NextApiResponse
    ) {
        const { username, password } = req.body;

        try {
            await connection();

            const user = await User.findOne({ username });
            
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);

                res.status(200).json({
                    message: 'Login successful',
                    token,
                });
            }

        }
        catch (error) {
            res.status(500).json({success: false, error})
        }
    }