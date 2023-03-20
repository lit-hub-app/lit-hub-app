import type { NextApiRequest, NextApiResponse } from 'next'
import connection from '../../../lib/database';
import User from '../../../models/User';

export default async function createUser(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { body } = req;
    console.log(body);
    if (body.password !== body.passwordConfirm) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }
    
    try {
    await connection();
    
    const user = await User.create(body);

    res.json({success: true, user});
    }
    catch (error) {
        res.status(400).json({success: false, error});
    }
}