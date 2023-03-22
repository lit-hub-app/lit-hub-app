import type { NextApiRequest, NextApiResponse } from 'next'
import connection from '../../lib/database';
import User from '../../models/User';

export default async function getUsers(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await connection();

        const users: Array<object> = await User.find();

        res.status(200).json(users);
    } catch (error) {
        console.log("Get users error", error);
    }
}